import { SchoolRecord, SCHOOLS } from '../types';

export const apiService = {
  // Fetch all records from backend Express server
  async getRecords(): Promise<SchoolRecord[]> {
    try {
      const response = await fetch('/api/records');
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.records)) {
        // Also cache locally for offline access
        localStorage.setItem('vetrisudar_records', JSON.stringify(data.records));
        return data.records;
      }
      throw new Error('Invalid server response format');
    } catch (err) {
      console.warn('[API Client] Could not fetch from backend, loading local cache:', err);
      const local = localStorage.getItem('vetrisudar_records');
      if (local) {
        try { return JSON.parse(local); } catch (e) {}
      }
      return [];
    }
  },

  // Save/Update single school weekly mark entry
  async saveRecord(record: SchoolRecord): Promise<{ success: boolean; message: string; record?: SchoolRecord }> {
    try {
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to save record to server');
      }

      return {
        success: true,
        message: data.message || 'மதிப்பெண்கள் சேமிக்கப்பட்டன',
        record: data.record
      };
    } catch (err: any) {
      console.warn('[API Client] Server endpoint unavailable or returned error, saving locally:', err);
      return {
        success: false,
        message: err.message || 'பிணையப் பிழை! உள்ளூர் சேமிப்பகத்தில் சேமிக்க விரும்புகிறீர்களா?'
      };
    }
  },

  // Import batch JSON records
  async batchImport(records: SchoolRecord[]): Promise<boolean> {
    try {
      const response = await fetch('/api/records/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ records })
      });
      const data = await response.json();
      return response.ok && data.success;
    } catch (err) {
      console.warn('[API Client] Batch import to backend failed:', err);
      return false;
    }
  },

  // Fetch block stats from backend
  async getStats(): Promise<any> {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        return data.stats;
      }
    } catch (err) {
      console.warn('[API Client] Stats endpoint failed:', err);
    }
    return null;
  }
};
