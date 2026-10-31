export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface StudentAttendanceItem {
    studentId: string;
    studentName?: string;
    status: AttendanceStatus;
    notes?: string;
}

export interface AttendanceModel {
    id: string;
    classId: string;
    date: string;
    records: StudentAttendanceItem[];
    takenAt: string;
    notes?: string;
}

