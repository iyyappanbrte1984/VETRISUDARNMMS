import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { 
  getAllRecords, 
  saveSingleRecord, 
  batchImportRecords, 
  deleteRecord 
} from './server/storage.js';
import { SCHOOLS, SchoolRecord, StudentMark, TEST_SCHEDULE } from './src/types.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const HOST = '0.0.0.0';

const TESTS = TEST_SCHEDULE.map((t, idx) => ({
  id: t.id,
  name: `வாரம் ${idx + 1} தேர்வு`,
  date: t.formattedDate,
  totalMarks: 100
}));

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '10mb' }));

  // Request logger
  app.use((req, _res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // ---------------------------------------------------------
  // REST API ENDPOINTS FOR TEACHERS WEEKLY TEST MARKS
  // ---------------------------------------------------------

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ 
      status: 'ok', 
      service: 'Vetri Sudar NMMS Marks Entry API',
      timestamp: new Date().toISOString()
    });
  });

  // Get Schools list
  app.get('/api/schools', (_req: Request, res: Response) => {
    res.json({ success: true, count: SCHOOLS.length, schools: SCHOOLS });
  });

  // Get Tests list
  app.get('/api/tests', (_req: Request, res: Response) => {
    res.json({ success: true, tests: TESTS });
  });

  // Get all test records
  app.get('/api/records', (req: Request, res: Response) => {
    const schoolId = req.query.schoolId as string | undefined;
    const testId = req.query.testId as string | undefined;

    let records = getAllRecords();

    if (schoolId) {
      records = records.filter(r => r.schoolId === schoolId);
    }
    if (testId) {
      records = records.filter(r => r.testId === testId);
    }

    res.json({
      success: true,
      count: records.length,
      records
    });
  });

  // Get specific school record
  app.get('/api/records/:schoolId/:testId', (req: Request, res: Response) => {
    const { schoolId, testId } = req.params;
    const records = getAllRecords();
    const record = records.find(r => r.schoolId === schoolId && r.testId === testId);

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: `No marks entry found for school ${schoolId} in test ${testId}` 
      });
    }

    res.json({ success: true, record });
  });

  // Helper validation for StudentMark
  const validateStudentMark = (rankName: string, mark: StudentMark): string | null => {
    if (!mark.studentName || !mark.studentName.trim()) {
      return `${rankName} மாணவர் பெயரை உள்ளிடவும்!`;
    }
    if (mark.mat < 0 || mark.mat > 50) {
      return `${rankName} MAT மதிப்பெண் 0 முதல் 50 வரை மட்டுமே இருக்க வேண்டும்!`;
    }
    if (mark.satMath < 0 || mark.satMath > 10) {
      return `${rankName} SAT கணித மதிப்பெண் 0 முதல் 10 வரை மட்டுமே இருக்க வேண்டும்!`;
    }
    if (mark.satScience < 0 || mark.satScience > 20) {
      return `${rankName} SAT அறிவியல் மதிப்பெண் 0 முதல் 20 வரை மட்டுமே இருக்க வேண்டும்!`;
    }
    if (mark.satSocial < 0 || mark.satSocial > 20) {
      return `${rankName} SAT சமூக அறிவியல் மதிப்பெண் 0 முதல் 20 வரை மட்டுமே இருக்க வேண்டும்!`;
    }
    return null;
  };

  // Create or Update Weekly Test Marks Entry
  app.post('/api/records', (req: Request, res: Response) => {
    try {
      const { schoolId, testId, rank_1, rank_2, rank_3 } = req.body as Partial<SchoolRecord>;

      if (!schoolId || !testId) {
        return res.status(400).json({ 
          success: false, 
          message: 'schoolId and testId are required fields!' 
        });
      }

      // Check valid school
      const schoolExists = SCHOOLS.some(s => s.id === schoolId);
      if (!schoolExists) {
        return res.status(400).json({ 
          success: false, 
          message: `Invalid schoolId: ${schoolId}` 
        });
      }

      if (!rank_1 || !rank_2 || !rank_3) {
        return res.status(400).json({ 
          success: false, 
          message: 'Top 3 ranks (rank_1, rank_2, rank_3) are required for weekly mark entry!' 
        });
      }

      // Validate student marks
      const err1 = validateStudentMark('முதலிடம் (Rank 1)', rank_1);
      if (err1) return res.status(400).json({ success: false, message: err1 });

      const err2 = validateStudentMark('இரண்டாமிடம் (Rank 2)', rank_2);
      if (err2) return res.status(400).json({ success: false, message: err2 });

      const err3 = validateStudentMark('மூன்றாமிடம் (Rank 3)', rank_3);
      if (err3) return res.status(400).json({ success: false, message: err3 });

      // Calculate totals
      const calcTotal = (m: StudentMark) => Number(m.mat) + Number(m.satMath) + Number(m.satScience) + Number(m.satSocial);

      rank_1.total = calcTotal(rank_1);
      rank_2.total = calcTotal(rank_2);
      rank_3.total = calcTotal(rank_3);

      // Validate rank order hierarchy
      if (rank_2.total > rank_1.total) {
        return res.status(400).json({ 
          success: false, 
          message: 'இரண்டாமிடம் பெற்றவரின் மொத்த மதிப்பெண் முதலிடம் பெற்றவரை விட அதிகமாக இருக்கக் கூடாது!' 
        });
      }
      if (rank_3.total > rank_2.total) {
        return res.status(400).json({ 
          success: false, 
          message: 'மூன்றாமிடம் பெற்றவரின் மொத்த மதிப்பெண் இரண்டாமிடம் பெற்றவரை விட அதிகமாக இருக்கக் கூடாது!' 
        });
      }

      const updatedRecord: SchoolRecord = {
        id: `${schoolId}_${testId}`,
        schoolId,
        testId,
        rank_1,
        rank_2,
        rank_3,
        lastUpdated: new Date().toISOString()
      };

      const allRecords = saveSingleRecord(updatedRecord);

      res.status(200).json({
        success: true,
        message: 'வாராந்திரத் தேர்வு மதிப்பெண்கள் வெற்றிகரமாக சேமிக்கப்பட்டன!',
        record: updatedRecord,
        totalRecords: allRecords.length
      });
    } catch (err) {
      console.error('[API Error] Save Record failed:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  // Batch import records API
  app.post('/api/records/batch', (req: Request, res: Response) => {
    try {
      const { records } = req.body;
      if (!Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Valid array of school records is required' 
        });
      }

      const updatedRecords = batchImportRecords(records);
      res.json({
        success: true,
        message: `${records.length} records imported successfully`,
        totalRecords: updatedRecords.length,
        records: updatedRecords
      });
    } catch (err) {
      console.error('[API Error] Batch import failed:', err);
      res.status(500).json({ success: false, message: 'Batch import failed' });
    }
  });

  // Delete a test mark record
  app.delete('/api/records/:schoolId/:testId', (req: Request, res: Response) => {
    const { schoolId, testId } = req.params;
    const remaining = deleteRecord(schoolId, testId);
    res.json({
      success: true,
      message: `Record for school ${schoolId} test ${testId} deleted`,
      totalRecords: remaining.length
    });
  });

  // Block Analytics Overview endpoint
  app.get('/api/stats', (_req: Request, res: Response) => {
    const records = getAllRecords();
    
    // Total students logged
    let totalStudents = 0;
    let totalScoreSum = 0;
    let topScore = 0;
    let topStudent = '';
    let topSchool = '';

    records.forEach(r => {
      [r.rank_1, r.rank_2, r.rank_3].forEach(st => {
        if (st && st.total > 0) {
          totalStudents++;
          totalScoreSum += st.total;
          if (st.total > topScore) {
            topScore = st.total;
            topStudent = st.studentName;
            const sch = SCHOOLS.find(s => s.id === r.schoolId);
            topSchool = sch ? sch.name : r.schoolId;
          }
        }
      });
    });

    const averageMark = totalStudents > 0 ? parseFloat((totalScoreSum / totalStudents).toFixed(1)) : 0;

    res.json({
      success: true,
      stats: {
        totalSchools: SCHOOLS.length,
        totalEntries: records.length,
        totalStudentsRecorded: totalStudents,
        blockAverageMark: averageMark,
        highestMarkRecorded: topScore,
        topStudentName: topStudent,
        topSchoolName: topSchool
      }
    });
  });

  // ---------------------------------------------------------
  // VITE / STATIC SERVING MIDDLEWARE
  // ---------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Server] Teacher Weekly Test Marks API running on http://${HOST}:${PORT}`);
  });
}

startServer();
