
import { ScheduleItem, AttendanceRecord, Notification, UserRole } from '../types';
import { MOCK_SCHEDULE, MOCK_ATTENDANCE, MOCK_NOTIFICATIONS } from '../constants';

/**
 * DATABASE SERVICE (Simulated MySQL Engine)
 * In a production environment, these methods would use:
 * fetch('/api/query', { method: 'POST', body: JSON.stringify({ query: 'SELECT...' }) })
 */

const DB_KEY = 'edudash_sql_emulator';

// Initial Database State
const INITIAL_DB = {
  users: [
    { id: 'ST-2025-001', password: 'password', role: 'student', name: 'Alex Rivers' },
    { id: 'FAC-8291-ALPHA', password: 'password', role: 'teacher', name: 'Dr. Sarah Vance' }
  ],
  attendance: MOCK_ATTENDANCE,
  schedule: MOCK_SCHEDULE,
  notifications: MOCK_NOTIFICATIONS
};

class DatabaseService {
  private data: typeof INITIAL_DB;

  constructor() {
    const saved = localStorage.getItem(DB_KEY);
    this.data = saved ? JSON.parse(saved) : INITIAL_DB;
    if (!saved) this.sync();
  }

  private sync() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.data));
  }

  // SIMULATED: SELECT * FROM users WHERE id = ? AND password = ?
  async verifyUser(id: string, pass: string) {
    // Artificial latency to simulate DB connection
    await new Promise(r => setTimeout(r, 800));
    const user = this.data.users.find(u => u.id === id && u.password === pass);
    return user || null;
  }

  // SIMULATED: SELECT * FROM attendance
  async getAttendance(): Promise<AttendanceRecord[]> {
    return [...this.data.attendance];
  }

  // SIMULATED: INSERT INTO attendance (date, status) VALUES (?, ?)
  async saveAttendance(records: AttendanceRecord[]) {
    await new Promise(r => setTimeout(r, 500));
    // Merge or replace logic
    const newAttendance = [...this.data.attendance];
    records.forEach(newRec => {
      const idx = newAttendance.findIndex(r => r.date === newRec.date);
      if (idx > -1) newAttendance[idx] = newRec;
      else newAttendance.push(newRec);
    });
    this.data.attendance = newAttendance;
    this.sync();
    return { success: true };
  }

  // SIMULATED: SELECT * FROM schedule WHERE day = ?
  async getScheduleByDay(day: string): Promise<ScheduleItem[]> {
    return this.data.schedule[day] || [];
  }

  // SIMULATED: SELECT * FROM notifications ORDER BY timestamp DESC
  async getNotifications(): Promise<Notification[]> {
    return [...this.data.notifications];
  }
}

export const db = new DatabaseService();
