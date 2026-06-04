import { Student } from "@/features/student/types/student"
import { Teacher } from "@/features/teacher/types/teacher"
import { Subject } from "@/features/subject/types/subject"

export interface Score {
    id: string
    teacherId: string
    studentId: string
    subjectId: string
    nilaiTugas: number
    nilaiUts: number
    nilaiUas: number
    nilaiAkhir: number
    statusKelulusan: boolean
    createdAt: Date
    updatedAt: Date
    teacher?: Teacher
    student?: Student
    subject?: Subject
}