export type UserRole = 'student' | 'teacher' | 'hod' | 'pto';

export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  type: 'Full-time' | 'Internship' | 'Contract';
}

interface BaseUser {
  id: number;
  email: string;
  password: string; // In a real app, this would be a hash
  role: UserRole;
}

export interface Student extends BaseUser {
  role: 'student';
  name: string;
  department: string;
}

export interface AdminUser extends BaseUser {
  role: 'teacher' | 'hod' | 'pto';
  name: string;
}

export type User = Student | AdminUser;

export interface Application {
  id: number;
  jobId: number;
  studentId: number;
  resume: File | null;
  coverLetter?: string;
}