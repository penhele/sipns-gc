"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { PlusCircle, Sparkles, BookText, Award, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useScores from "./hooks/use-scores";
import { Score } from "./types/score";
import useMe from "@/features/auth/hooks/use-me";

export default function ScorePage() {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const { data, isLoading: isLoadingScores } = useScores(me?.teacher?.id);

  const isLoading = isLoadingMe || isLoadingScores;

  // Safety check since getScores return type was Promise<Score> but logically should be Score[]
  const scores: Score[] = Array.isArray(data)
    ? data
    : data
      ? ([data] as unknown as Score[])
      : [];

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-8 rounded-3xl border border-indigo-500/20 shadow-sm relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-lg">
              <BookText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 tracking-tight">
              Kelola Nilai Siswa
            </h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Pusat kendali untuk mengelola, memperbarui, dan memantau seluruh
            nilai akademik siswa dengan mudah dan cepat.
          </p>
        </div>

        <div className="relative z-10 self-stretch sm:self-auto flex items-center">
          <Link href={ROUTES.CREATE_NILAI} className="w-full sm:w-auto">
            <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-500 ease-out bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:-translate-y-1 hover:scale-105 overflow-hidden border border-white/20">
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg] group-hover:animate-shine" />
              </div>

              <Sparkles className="w-5 h-5 animate-pulse text-pink-200" />
              <span className="tracking-wide">Tambah Data</span>
              <div className="bg-white/20 rounded-full p-1 transition-transform duration-300 group-hover:rotate-90 group-hover:bg-white/30">
                <PlusCircle className="w-5 h-5" />
              </div>
            </button>
          </Link>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/5">
          <CardContent className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Memuat Data...
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Mohon tunggu sebentar, kami sedang mengambil data nilai.
            </p>
          </CardContent>
        </Card>
      ) : scores.length === 0 ? (
        <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/5 relative overflow-hidden group">
          <CardContent className="flex flex-col items-center justify-center py-32 text-center relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
              <PlusCircle className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Belum ada data nilai
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-8">
              Mulai langkah awal dengan menambahkan data nilai akademik siswa
              untuk semester ini.
            </p>
            <Link href={ROUTES.CREATE_NILAI}>
              <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl transition-all duration-300 hover:shadow-md ring-1 ring-indigo-500/20">
                <PlusCircle className="w-4 h-4" />
                Tambah Nilai Sekarang
              </button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BookText className="h-5 w-5 text-muted-foreground" />
              Daftar Nilai Siswa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b bg-muted/30">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">
                      Nama Siswa
                    </th>
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">
                      NISN
                    </th>
                    <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">
                      Mata Pelajaran
                    </th>
                    <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">
                      Nilai Tugas
                    </th>
                    <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">
                      Nilai UTS
                    </th>
                    <th className="h-12 px-6 text-center align-middle font-semibold text-muted-foreground">
                      Nilai UAS
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
                  {scores.map((score) => (
                    <tr
                      key={score.id}
                      className="border-b border-border/50 transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted group"
                    >
                      <td className="p-6 align-middle font-medium group-hover:text-primary transition-colors">
                        {score.student?.name || "Unknown"}
                      </td>
                      <td className="p-6 align-middle text-muted-foreground font-mono text-xs">
                        {score.student?.nisn || "-"}
                      </td>
                      <td className="p-6 align-middle text-center">
                        {score.subject?.name}
                      </td>
                      <td className="p-6 align-middle text-center">
                        {score.nilaiTugas}
                      </td>
                      <td className="p-6 align-middle text-center">
                        {score.nilaiUts}
                      </td>
                      <td className="p-6 align-middle text-center">
                        {score.nilaiUas}
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
                          {score.statusKelulusan ? (
                            <>
                              <Award className="h-3 w-3" />
                              Lulus
                            </>
                          ) : (
                            "Tidak Lulus"
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Animation for shine effect */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
                @keyframes shine {
                    100% { left: 200%; }
                }
                .animate-shine {
                    animation: shine 1.5s ease-in-out infinite;
                }
            `,
        }}
      />
    </div>
  );
}
