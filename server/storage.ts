import fs from 'fs';
import path from 'path';
import { REAL_RECORDS } from '../src/data/realRecords.js';
import { SchoolRecord, SCHOOLS } from '../src/types.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'records-store.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Load records from disk or initialize with REAL_RECORDS
export function getAllRecords(): SchoolRecord[] {
  ensureDataDir();
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) {
        // Merge any new seed records (e.g. test_6) that may not be in the file yet
        const existingIds = new Set(data.map((r: SchoolRecord) => r.id));
        let changed = false;
        REAL_RECORDS.forEach(realRec => {
          if (!existingIds.has(realRec.id)) {
            data.push(realRec);
            changed = true;
          }
        });
        if (changed) {
          saveAllRecords(data);
        }
        return data;
      }
    } catch (err) {
      console.error('[Backend] Error reading database file, using default seed:', err);
    }
  }
  // Initialize file with REAL_RECORDS if file doesn't exist
  saveAllRecords(REAL_RECORDS);
  return REAL_RECORDS;
}

// Persist records array to disk
export function saveAllRecords(records: SchoolRecord[]): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(DB_FILE, JSON.stringify(records, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Backend] Error writing database file:', err);
    return false;
  }
}

// Save or update a single school test record
export function saveSingleRecord(updatedRecord: SchoolRecord): SchoolRecord[] {
  const records = getAllRecords();
  const index = records.findIndex(r => r.id === updatedRecord.id);
  
  if (index >= 0) {
    records[index] = {
      ...updatedRecord,
      lastUpdated: new Date().toISOString()
    };
  } else {
    records.push({
      ...updatedRecord,
      lastUpdated: new Date().toISOString()
    });
  }

  saveAllRecords(records);
  return records;
}

// Batch import records
export function batchImportRecords(newRecords: SchoolRecord[]): SchoolRecord[] {
  const records = getAllRecords();
  const recordMap = new Map<string, SchoolRecord>();

  // Load existing
  records.forEach(r => recordMap.set(r.id, r));

  // Merge new
  newRecords.forEach(r => {
    recordMap.set(r.id, {
      ...r,
      lastUpdated: r.lastUpdated || new Date().toISOString()
    });
  });

  const merged = Array.from(recordMap.values());
  saveAllRecords(merged);
  return merged;
}

// Delete or reset a specific record
export function deleteRecord(schoolId: string, testId: string): SchoolRecord[] {
  const records = getAllRecords();
  const idToFind = `${schoolId}_${testId}`;
  const filtered = records.filter(r => r.id !== idToFind);
  saveAllRecords(filtered);
  return filtered;
}
