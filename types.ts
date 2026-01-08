
export type UserRole = 'student' | 'teacher';

export interface ScheduleItem {
  id: string;
  subject: string;
  time: string;
  room: string;
  faculty: string;
}

export interface AttendanceRecord {
  date: string; // ISO format
  status: 'present' | 'absent';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'academic' | 'exam' | 'event';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'attendance' | 'event' | 'exam';
  timestamp: string;
}

export interface CourseMaterial {
  title: string;
  category: string;
  description: string;
}