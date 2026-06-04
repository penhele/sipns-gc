"use client";

import useMe from "@/features/auth/hooks/use-me";
import useScores from "@/features/dashboard/score/hooks/use-scores";
import useTeachers from "@/features/teacher/hooks/use-teachers";
import { Score } from "@/features/dashboard/score/types/score";
import {
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  AlertCircle,
  Loader2,
  Users,
  Search,
  BookMarked,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import StudentTable from "@/features/student/components/student-table";
import useStudents from "@/features/student/hooks/use-students";
import useStudent from "@/features/student/hooks/use-student";

export default function StudentPage() {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const { data: scoresData, isLoading: isLoadingScores } = useScores();
  const { data: teachersData, isLoading: isLoadingTeachers } = useTeachers();

  const [searchTerm, setSearchTerm] = useState("");

  const isLoading = isLoadingMe || isLoadingScores || isLoadingTeachers;

  const allScores: Score[] = Array.isArray(scoresData)
    ? scoresData
    : scoresData
      ? ([scoresData] as unknown as Score[])
      : [];

  const teachers = Array.isArray(teachersData) ? teachersData : [];

  // Filter scores specifically for the logged-in student
  const studentScores = allScores.filter(
    (score) => score.studentId === me?.student?.id,
  );

  const totalSubjects = studentScores.length;
  const passedCount = studentScores.filter((s) => s.statusKelulusan).length;
  const gpa =
    totalSubjects > 0
      ? (
          studentScores.reduce((acc, curr) => acc + curr.nilaiAkhir, 0) /
          totalSubjects
        ).toFixed(1)
      : "0.0";

  // Filter teachers based on search term (name or subject)
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (teacher.subject?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome & Info Card */}
      <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                Dashboard Siswa
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-400/30 px-3 py-1 text-xs font-semibold backdrop-blur-md text-sky-200">
                <GraduationCap className="h-3 w-3" />
                Kelas {me?.student?.class || "-"}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Halo, {me?.student?.name || me?.email}
            </h1>
            <p className="mt-2 text-sky-100 max-w-xl">
              Pantau laporan perkembangan nilai akademik, daftar guru pengajar,
              dan status kelulusan mata pelajaran Anda di semester ini.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-5 flex flex-col gap-1 min-w-[200px] shadow-sm">
            <span className="text-xs text-sky-200 uppercase tracking-wider font-semibold">
              Nomor Induk Siswa (NISN)
            </span>
            <span className="text-2xl font-mono font-bold tracking-widest">
              {me?.student?.nisn || "-"}
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-sky-500 animate-spin mb-4" />
          <p className="text-muted-foreground text-sm font-medium">
            Memuat data akademik Anda...
          </p>
        </div>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-sky-500/10 to-sky-600/5 border-sky-200/50 dark:border-sky-800/50 hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-sky-700 dark:text-sky-400">
                  Total Mata Pelajaran
                </CardTitle>
                <div className="p-2 bg-sky-100 dark:bg-sky-900/40 rounded-lg">
                  <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalSubjects}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Mata pelajaran dinilai
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Lulus Evaluasi
                </CardTitle>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                  <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {passedCount}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Standar kelulusan (&ge;75) terpenuhi
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-200/50 dark:border-indigo-800/50 hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                  Rata-rata Nilai Akhir
                </CardTitle>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {gpa}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Indeks rata-rata semester ini
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200/50 dark:border-purple-800/50 hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400">
                  Total Guru Pengajar
                </CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {teachers.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pendidik aktif terdaftar
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Detailed Scores */}
            <div className="flex flex-col space-y-4 lg:col-span-2">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-sky-500" />
                Laporan Nilai Belajar
              </h2>

              <StudentTable />
            </div>

            {/* Right Side: Teachers & Subjects List */}
            <div className="flex flex-col space-y-4 lg:col-span-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  Daftar Guru Pengajar
                </h2>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari guru atau mata pelajaran..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-all"
                />
              </div>

              <div className="flex flex-col space-y-3 overflow-y-auto max-h-[480px] pr-1">
                {filteredTeachers.length === 0 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground bg-muted/20 border border-dashed rounded-2xl">
                    Tidak menemukan guru pengajar.
                  </div>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <Card
                      key={teacher.id}
                      className="hover:shadow-sm hover:border-primary/30 transition-all duration-300"
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400 rounded-full flex items-center justify-center font-bold">
                          {teacher.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-foreground truncate">
                            {teacher.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
                            Mata Pelajaran:{" "}
                            <span className="font-medium text-purple-600 dark:text-purple-400">
                              {teacher.subject?.name || "Umum"}
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
