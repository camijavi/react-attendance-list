export interface StudentModel {
    id: string;
    userdId: string; // user id it's like 
    fullName: string;
    email?: string; // school email like @schoolname.com
    enrolledClassIds: string[];
}