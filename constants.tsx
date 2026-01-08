
import { ScheduleItem, AttendanceRecord, CalendarEvent, Notification, CourseMaterial } from './types';

export const MOCK_SCHEDULE: Record<string, ScheduleItem[]> = {
  'Monday': [
    { id: '1', subject: 'Advanced Mathematics', time: '09:00 AM - 10:00 AM', room: 'B-201', faculty: 'Dr. Smith' },
    { id: '2', subject: 'Data Structures', time: '10:15 AM - 11:15 AM', room: 'Lab 4', faculty: 'Prof. Garcia' },
    { id: '3', subject: 'Software Engineering', time: '11:30 AM - 12:30 PM', room: 'C-102', faculty: 'Dr. Lee' },
  ],
  'Tuesday': [
    { id: '4', subject: 'Operating Systems', time: '09:00 AM - 10:30 AM', room: 'A-305', faculty: 'Prof. Miller' },
    { id: '5', subject: 'Physics Lab', time: '11:00 AM - 01:00 PM', room: 'Physics Lab 1', faculty: 'Dr. Wilson' },
  ],
  'Wednesday': [
    { id: '6', subject: 'Database Systems', time: '09:00 AM - 10:00 AM', room: 'C-202', faculty: 'Dr. Chen' },
    { id: '7', subject: 'Machine Learning', time: '10:30 AM - 12:00 PM', room: 'B-101', faculty: 'Prof. Gupta' },
  ],
  'Thursday': [
    { id: '8', subject: 'Algorithm Design', time: '11:00 AM - 12:30 PM', room: 'A-102', faculty: 'Dr. Patel' },
    { id: '9', subject: 'Tech Ethics', time: '02:00 PM - 03:00 PM', room: 'Hall 1', faculty: 'Prof. Adams' },
  ],
  'Friday': [
    { id: '10', subject: 'Cloud Computing', time: '09:00 AM - 11:00 AM', room: 'Lab 2', faculty: 'Dr. Robinson' },
    { id: '11', subject: 'Capstone Project', time: '11:30 AM - 01:00 PM', room: 'Project Hub', faculty: 'Prof. Clark' },
  ],
};

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { date: '2024-05-01', status: 'present' },
  { date: '2024-05-02', status: 'present' },
  { date: '2024-05-03', status: 'absent' },
  { date: '2024-05-06', status: 'present' },
  { date: '2024-05-07', status: 'present' },
  { date: '2024-05-08', status: 'present' },
  { date: '2024-05-09', status: 'absent' },
  { date: '2024-05-10', status: 'present' },
  { date: '2024-05-13', status: 'present' },
  { date: '2024-05-14', status: 'absent' },
  { date: '2024-05-15', status: 'present' },
];

export const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Tech Symposium', date: '2024-05-20', type: 'event' },
  { id: 'e2', title: 'Mid-term Exams', date: '2024-05-25', type: 'exam' },
  { id: 'e3', title: 'Final Project Submission', date: '2024-06-15', type: 'academic' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Low Attendance Alert', message: 'Your attendance in Physics is below 75%. Please attend more classes.', type: 'attendance', timestamp: '2 hours ago' },
  { id: 'n2', title: 'Exam Seating', message: 'Room B-201, Seat 45 for Mathematics Exam.', type: 'exam', timestamp: '1 day ago' },
  { id: 'n3', title: 'Cultural Fest', message: 'Join the annual fest this Friday!', type: 'event', timestamp: '2 days ago' },
];

export const SYLLABUS: CourseMaterial[] = [
  { title: 'Data Structures & Algorithms', category: 'CS301', description: 'Linked lists, trees, graphs, and dynamic programming.' },
  { title: 'Web Development', category: 'CS305', description: 'React, Node.js, and modern CSS frameworks.' },
  { title: 'Computer Networks', category: 'CS308', description: 'TCP/IP, HTTP, and networking protocols.' },
];
