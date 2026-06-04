import { Score } from "@/features/dashboard/score/types/score";
import { ColumnDef } from "@tanstack/react-table";

export const studentColumns: ColumnDef<Score>[] = [
  {
    header: "Mata Pelajaran & Guru",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-bold text-foreground">
            {row.original.subject?.name}
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            Guru: {row.original.teacher?.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "nilaiTugas",
    header: "Tugas",
  },
  {
    accessorKey: "nilaiUts",
    header: "UTS",
  },
  {
    accessorKey: "nilaiUas",
    header: "UAS",
  },
  {
    accessorKey: "nilaiAkhir",
    header: "Akhir",
  },
  {
    accessorKey: "statusKelulusan",
    header: "Status",
  },
];
