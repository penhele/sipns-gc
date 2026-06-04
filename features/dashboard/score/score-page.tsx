"use client"

import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { PlusCircle, Sparkles, BookText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useScores from "./hooks/use-scores";

export default function ScorePage() {
    const { data } = useScores()
    console.log(data)

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
                        Pusat kendali untuk mengelola, memperbarui, dan memantau seluruh nilai akademik siswa dengan mudah dan cepat.
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

            {/* Empty State / Content Area */}
            <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/5 relative overflow-hidden group">
                <CardContent className="flex flex-col items-center justify-center py-32 text-center relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                        <PlusCircle className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Belum ada data nilai</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mb-8">
                        Mulai langkah awal dengan menambahkan data nilai akademik siswa untuk semester ini.
                    </p>
                    <Link href={ROUTES.CREATE_NILAI}>
                        <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl transition-all duration-300 hover:shadow-md ring-1 ring-indigo-500/20">
                            <PlusCircle className="w-4 h-4" />
                            Tambah Nilai Sekarang
                        </button>
                    </Link>
                </CardContent>
            </Card>

            {/* Custom Animation for shine effect */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shine {
                    100% { left: 200%; }
                }
                .animate-shine {
                    animation: shine 1.5s ease-in-out infinite;
                }
            `}} />
        </div>
    )
}