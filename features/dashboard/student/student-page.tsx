"use client";

import LabelSection from "@/components/label-section";
import useMe from "@/features/auth/hooks/use-me";
import useScores from "@/features/dashboard/score/hooks/use-scores";
import { Score } from "@/features/dashboard/score/types/score";
import StudentTable from "@/features/student/components/student-table";
import useTeachers from "@/features/teacher/hooks/use-teachers";
import {
  Award,
  BookMarked,
  BookOpen,
  GraduationCap,
  Loader2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import StatCard from "./components/stat-card";
import TeacherCard from "./components/teacher-card";
import HeroSection from "@/components/hero-section";

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
      <HeroSection
        header="Selamat Datang, "
        description="Pantau laporan perkembangan nilai akademik, daftar guru pengajar,
              dan status kelulusan mata pelajaran Anda di semester ini."
        color="blue"
      />

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
            <StatCard
              title="Total Mata Pelajaran"
              Icon={BookOpen}
              value={totalSubjects}
              description="Mata pelajaran dinilai"
              color="sky"
            />
            <StatCard
              title="Lulus Evaluasi"
              Icon={Award}
              value={passedCount}
              description="Standar kelulusan (&ge;75) terpenuhi"
              color="emerald"
            />
            <StatCard
              title="Rata-rata Nilai Akhir"
              Icon={TrendingUp}
              value={gpa}
              description="Indeks rata-rata semester ini"
              color="indigo"
            />
            <StatCard
              title="Total Guru Pengajar"
              Icon={TrendingUp}
              value={teachers.length}
              description="Pendidik aktif terdaftar"
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Detailed Scores */}
            <div className="flex flex-col space-y-4 lg:col-span-2">
              <LabelSection
                Icon={BookMarked}
                label="Laporan Nilai Belajar"
                color="blue"
              />

              <StudentTable />
            </div>

            {/* Right Side: Teachers & Subjects List */}
            <div className="flex flex-col space-y-4 lg:col-span-1">
              <LabelSection
                Icon={Users}
                label="Daftar Guru Pengajar"
                color="purple"
              />

              <div className="space-y-2">
                {teachersData?.map((teacher) => (
                  <TeacherCard
                    name={teacher.name}
                    subject={teacher.subject?.name ?? ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
