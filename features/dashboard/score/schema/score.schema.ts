import * as z from "zod";

export const createScoreSchema = z.object({
  teacherId: z.string().min(1, "teacherId wajib diisi"),
  subjectId: z.string().min(1, "subjectId wajib diisi"),
  studentId: z.string().min(1, "studentId wajib diisi"),
  nilaiTugas: z
    .number({ message: "Wajib berupa angka" })
    .min(0)
    .max(100, "Angka harus di bawah 100"),
  nilaiUts: z
    .number({ message: "Wajib berupa angka" })
    .min(0)
    .max(100, "Angka harus di bawah 100"),
  nilaiUas: z
    .number({ message: "Wajib berupa angka" })
    .min(0)
    .max(100, "Angka harus di bawah 100"),
});
