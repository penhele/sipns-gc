"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMe from "@/features/auth/hooks/use-me";
import useStudents from "@/features/student/hooks/use-students";
import useTeachers from "@/features/teacher/hooks/use-teachers";
import { Users, GraduationCap, Award, BookOpen } from "lucide-react";

const mockStudents = [
  {
    id: 1,
    name: "Budi Santoso",
    nisn: "0012345678",
    tugas: 85,
    uts: 80,
    uas: 88,
    akhir: 84.3,
    status: "Lulus",
  },
  {
    id: 2,
    name: "Siti Aminah",
    nisn: "0012345679",
    tugas: 90,
    uts: 85,
    uas: 92,
    akhir: 89.0,
    status: "Lulus",
  },
  {
    id: 3,
    name: "Ahmad Dahlan",
    nisn: "0012345680",
    tugas: 60,
    uts: 55,
    uas: 65,
    akhir: 60.0,
    status: "Tidak Lulus",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    nisn: "0012345681",
    tugas: 75,
    uts: 70,
    uas: 80,
    akhir: 75.0,
    status: "Lulus",
  },
];


export default function HomePage() {

  const { data: me } = useMe();
  const { data: teachers } = useTeachers()
  const { data: students } = useStudents()

  const totalGuru = teachers?.length ?? 0;
  const totalSiswa = students?.length ?? 0;

  console.log(me)

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Hi, {me?.email} </h1>

      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200/50 dark:border-blue-800/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Total Guru</CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-full shadow-inner">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalGuru}</div>
              <p className="text-xs text-muted-foreground mt-1">Tenaga pendidik aktif</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-200/50 dark:border-indigo-800/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-400">Total Siswa</CardTitle>
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-full shadow-inner">
                <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalSiswa}</div>
              <p className="text-xs text-muted-foreground mt-1">Siswa terdaftar semester ini</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              Data Akademik Siswa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b bg-muted/30">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">Nama Siswa</th>
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">NISN</th>
                    <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">Nilai Tugas</th>
                    <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">Nilai UTS</th>
                    <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">Nilai UAS</th>
                    <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">Nilai Akhir</th>
                    <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">Status Kelulusan</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {mockStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border/50 transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted group">
                      <td className="p-6 align-middle font-medium group-hover:text-primary transition-colors">{student.name}</td>
                      <td className="p-6 align-middle text-muted-foreground font-mono text-xs">{student.nisn}</td>
                      <td className="p-6 align-middle text-center">{student.tugas}</td>
                      <td className="p-6 align-middle text-center">{student.uts}</td>
                      <td className="p-6 align-middle text-center">{student.uas}</td>
                      <td className="p-6 align-middle text-center font-bold text-primary">{student.akhir}</td>
                      <td className="p-6 align-middle text-center">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors
                        ${student.status === 'Lulus'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'}`}>
                          {student.status === 'Lulus' && <Award className="h-3 w-3" />}
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
