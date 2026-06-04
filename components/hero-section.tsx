"use client";

import useMe from "@/features/auth/hooks/use-me";
import { PlusCircle, Shield } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";

type Props = { description: string; header: string } & cardVariants;

export default function HeroSection({ description, header, color }: Props) {
  const { data: me } = useMe();

  return (
    <div className={card({ color })}>
      <div className="absolute top-0 right-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              Dashboard {me?.role}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {header}{" "}
            {me?.role !== "ADMIN" && (
              <span>{me?.student?.name ?? me?.teacher?.name[0]}</span>
            )}
          </h1>
          <p className="mt-2 text-sky-100 max-w-xl">{description}</p>
        </div>

        {me?.role === "STUDENT" && (
          <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-5 flex flex-col gap-1 min-w-50 shadow-sm">
            <span className="text-xs text-sky-200 uppercase tracking-wider font-semibold">
              Nomor Induk Siswa (NISN)
            </span>
            <span className="text-2xl font-mono font-bold tracking-widest">
              {me?.student?.nisn || "-"}
            </span>
          </div>
        )}

        {me?.role === "ADMIN" && (
          <div className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-3">
            <Shield className="w-6 h-6 animate-pulse" />
            <span className="font-semibold text-sm">Akses Super Admin</span>
          </div>
        )}

        {me?.role === "ADMIN" && (
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 font-semibold text-indigo-700 bg-white hover:bg-indigo-50 rounded-xl transition-all duration-300 shadow-md hover:scale-105">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              Input Nilai
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const card = tv({
  base: "relative overflow-hidden rounded-3xl border p-8 text-white shadow-lg border-sky-500/20 bg-linear-to-r",
  variants: {
    color: {
      blue: "from-sky-600 via-blue-600 to-indigo-600",
      purple: "from-indigo-600 via-purple-600 to-pink-600",
      red: "from-rose-600 via-pink-600 to-red-600",
    },
  },
});

type cardVariants = VariantProps<typeof card>;
