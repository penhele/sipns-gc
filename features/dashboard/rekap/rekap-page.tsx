"use client";

import {
  ClipboardList,
  Award,
  AlertCircle,
  BarChart3,
  Users,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useScores from "@/features/dashboard/score/hooks/use-scores";
import { Score } from "@/features/dashboard/score/types/score";
import useMe from "@/features/auth/hooks/use-me";

export default function RekapPage() {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const { data, isLoading: isLoadingScores } = useScores(me?.teacher?.id);

  const isLoading = isLoadingMe || isLoadingScores;

  // Safety check
  const scores: Score[] = Array.isArray(data)
    ? data
    : data
      ? ([data] as unknown as Score[])
      : [];

  const totalSiswa = scores.length;
  const totalLulus = scores.filter((s) => s.statusKelulusan).length;
  const totalTidakLulus = totalSiswa - totalLulus;
  const rataRataAkhir =
    totalSiswa > 0
      ? (
          scores.reduce((acc, curr) => acc + curr.nilaiAkhir, 0) / totalSiswa
        ).toFixed(2)
      : "0";

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <ClipboardList className="w-8 h-8 text-primary" />
          Rekapitulasi Nilai Siswa
        </h1>
        <p className="text-muted-foreground">
          Ringkasan hasil evaluasi akademik seluruh siswa.
        </p>
      </div>

      {isLoading ? (
        <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/5">
          <CardContent className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Menyusun Rekap...
            </h3>
          </CardContent>
        </Card>
      ) : scores.length === 0 ? (
        <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/5">
          <CardContent className="flex flex-col items-center justify-center py-32 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Belum ada data nilai
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Tidak dapat menampilkan rekap karena data nilai siswa masih
              kosong.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200/50 dark:border-blue-800/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  Siswa Dinilai
                </CardTitle>
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSiswa}</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-200/50 dark:border-emerald-800/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Total Lulus
                </CardTitle>
                <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                  {totalLulus}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-rose-500/10 to-rose-600/5 border-rose-200/50 dark:border-rose-800/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-rose-700 dark:text-rose-400">
                  Total Tidak Lulus
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-700 dark:text-rose-400">
                  {totalTidakLulus}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-200/50 dark:border-amber-800/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400">
                  Rata-rata Kelas
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rataRataAkhir}</div>
              </CardContent>
            </Card>
          </div>

          {/* Simple Recap Table */}
          <Card className="shadow-sm border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <CardTitle className="text-lg">Daftar Hasil Kelulusan</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b bg-muted/30">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground w-16">
                        No
                      </th>
                      <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">
                        Nama Siswa
                      </th>
                      <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">
                        Nilai Akhir
                      </th>
                      <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">
                        Status Kelulusan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {scores.map((score, index) => (
                      <tr
                        key={score.id}
                        className="border-b border-border/50 transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted"
                      >
                        <td className="p-6 align-middle font-medium text-muted-foreground">
                          {index + 1}
                        </td>
                        <td className="p-6 align-middle font-medium">
                          {score.student?.name || "Unknown"}
                        </td>
                        <td className="p-6 align-middle text-center font-bold text-primary">
                          {score.nilaiAkhir}
                        </td>
                        <td className="p-6 align-middle text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors
                                                        ${
                                                          score.statusKelulusan
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                                                            : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                                                        }`}
                          >
                            {score.statusKelulusan ? "Lulus" : "Tidak Lulus"}
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
      )}
    </div>
  );
}
