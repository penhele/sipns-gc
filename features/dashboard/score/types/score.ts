import { Student } from "@/features/student/types/student"
import { Teacher } from "@/features/teacher/types/teacher"

export interface Score {
    id: string
    teacherId: string
    studentId: string
    nilaiTugas: number
    nilaiUts: number
    nilaiUas: number
    nilaiAkhir: number
    statusKelulusan: boolean
    createdAt: Date
    updatedAt: Date
    teacher: Teacher
    student: Student
}