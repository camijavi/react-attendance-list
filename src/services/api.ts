import type { ClassModel } from "../models/ClassModel";
import type { StudentModel } from "../models/StudentModel";
import type { AttendanceModel } from "../models/AttendaceModel";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api ={
    // Get classes 
    async getClasses(userdId: string): Promise<ClassModel[]>{
        const res = await fetch(`${API_BASE_URL}/classes?userId=${encodeURIComponent(userdId)}`);
        if (!res.ok) throw new Error ('Failed to fetch classes');
        return res.json();
    },

    async createClass(newClass: Omit<ClassModel, 'id' | 'createdAt'> & {id?: string}): Promise<ClassModel>{
        const res = await fetch (`${API_BASE_URL}/classes`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newClass),
        });
        if (!res.ok) throw new Error ('Failed to create class');
        return res.json();
    },

    //Students 
    async getStudents(userdId: string, classId?: string): Promise<StudentModel[]>{
        let url = `${API_BASE_URL}/students?userId=${encodeURIComponent(userdId)}`;

        if(classId) {
            url += `&classId=${encodeURIComponent(classId)}`;
        }

        const res = await fetch(url); 
        if (!res.ok) throw new Error ('Failed to fetch students');
        return res.json();
    },

    async createStudents(newStudent: Omit<StudentModel, 'id' | 'createdAt'> & {id?: string}): Promise<StudentModel> {
        const res = await fetch (`${API_BASE_URL}/students`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newStudent),
        });

        if(!res.ok) throw new Error('Failed to create student');
        return res.json();
    },

    //Attendance
    async getAttendance(classId: string, date?: string): Promise<AttendanceModel | AttendanceModel[] | null> {
        let url = `${API_BASE_URL}/attendance?classId=${encodeURIComponent(classId)}`;

        if (date){
            url += `&date=${encodeURIComponent(date)}`;
        }

        const res = await fetch(url);
        if(!res.ok) throw Error('Failed to fetch attendance');
        return res.json();
    },

    async saveAttendance(data: Omit<AttendanceModel, 'id' | 'takenAt'>): Promise<AttendanceModel>{
        const res = await fetch (`${API_BASE_URL}/attendance`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('Failed to save attendance');
        return res.json();
    }
}