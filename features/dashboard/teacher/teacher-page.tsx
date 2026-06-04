"use client";

import useMe from "@/features/auth/hooks/use-me";
import useScores from "@/features/dashboard/score/hooks/use-scores";
import { Score } from "@/features/dashboard/score/types/score";
import { ROUTES } from "@/constants/route";
import Link from "next/link";
import {
  BookOpen,
  PlusCircle,
  ClipboardList,
  Users,
  Award,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeroSection from "@/components/hero-section";

export default function TeacherPage() {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const { data: scoresData, isLoading: isLoadingScores } = useScores(
    me?.teacher?.id,
  );

  console.log(me);

  const isLoading = isLoadingMe || isLoadingScores;

  const scores: Score[] = Array.isArray(scoresData)
    ? scoresData
    : scoresData
      ? ([scoresData] as unknown as Score[])
      : [];

  const subjectName = scores[0]?.subject?.name || "Mata Pelajaran";
  const totalAssessed = scores.length;
  const passedCount = scores.filter((s) => s.statusKelulusan).length;
  const averageScore =
    totalAssessed > 0
      ? (
          scores.reduce((acc, curr) => acc + curr.nilaiAkhir, 0) / totalAssessed
        ).toFixed(1)
      : "0.0";

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Banner */}
      <HeroSection
        header="Selamat Datang, "
        description="Kelola nilai akademik siswa Anda, pantau statistik kelulusan kelas, dan perbarui hasil ujian di sini."
        color="purple"
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-muted-foreground text-sm font-medium">
            Memuat data dashboard...
          </p>
        </div>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-200/50 dark:border-indigo-800/50 hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                  Total Dinilai
                </CardTitle>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg">
                  <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalAssessed}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Siswa telah menerima penilaian
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Lulus
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
                  Siswa memenuhi nilai kelulusan (&ge;75)
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200/50 dark:border-purple-800/50 hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400">
                  Rata-rata Nilai
                </CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {averageScore}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Akumulasi nilai akhir kelas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Uploads */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions Menu */}
            <div className="flex flex-col space-y-4 lg:col-span-1">
              <h2 className="text-lg font-bold text-foreground">Akses Cepat</h2>

              <Link href={ROUTES.NILAI}>
                <Card className="hover:border-primary/50 cursor-pointer transition-all duration-300 group hover:-translate-y-0.5">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">
                        Kelola Semua Nilai
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Lihat, sunting, dan hapus nilai siswa.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href={ROUTES.REKAP}>
                <Card className="hover:border-primary/50 cursor-pointer transition-all duration-300 group hover:-translate-y-0.5">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 text-purple-500 rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">
                        Rekap Nilai Siswa
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Analisis statistik kelulusan & rata-rata.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Recent Uploads Table */}
            <div className="flex flex-col space-y-4 lg:col-span-2">
              <h2 className="text-lg font-bold text-foreground">
                Penilaian Terbaru
              </h2>

              <Card className="overflow-hidden border-border/50">
                <CardContent className="p-0">
                  {scores.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground text-sm">
                      Belum ada nilai yang diunggah.
                    </div>
                  ) : (
                    <div className="relative w-full overflow-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/40 border-b">
                          <tr>
                            <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                              Siswa
                            </th>
                            <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                              Nilai Akhir
                            </th>
                            <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                          {scores.slice(0, 5).map((score) => (
                            <tr
                              key={score.id}
                              className="hover:bg-muted/10 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="font-medium text-foreground">
                                  {score.student?.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {score.student?.class}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center font-bold text-indigo-600 dark:text-indigo-400">
                                {score.nilaiAkhir}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                                  ${
                                    score.statusKelulusan
                                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400"
                                      : "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400"
                                  }`}
                                >
                                  {score.statusKelulusan
                                    ? "Lulus"
                                    : "Tidak Lulus"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
