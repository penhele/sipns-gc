"use client";

import { Button } from "@/components/ui/button";
import useMe from "@/features/auth/hooks/use-me";
import useStudents from "@/features/student/hooks/use-students";
import { useAppForm } from "@/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { createScore } from "../api/create-score";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route";

export default function CreateScoreForm() {
  const router = useRouter();

  const { data } = useStudents();
  const { data: me } = useMe();

  const { mutateAsync } = useMutation({
    mutationFn: createScore,
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Berhasil menambahkan nilai");
      router.push(ROUTES.HOME)
    },
    onError(error, variables, onMutateResult, context) {
      toast.error("Gagal menambahkan score");
    },
  });

  const form = useAppForm({
    defaultValues: {
      teacherId: me?.teacher?.id ?? "",
      studentId: "",
      nilaiTugas: "",
      nilaiUts: "",
      nilaiUas: "",
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-2">
          <form.AppField name="teacherId">
            {(field) => (
              <field.TextField
                label="ID Guru"
                className="col-span-2"
                readonly
              />
            )}
          </form.AppField>

          <form.AppField name="studentId">
            {(field) => (
              <field.ComboboxField
                label="ID Siswa"
                className="col-span-2"
                items={data}
              />
            )}
          </form.AppField>

          <form.AppField name="nilaiTugas">
            {(field) => (
              <field.TextField
                label="Nilai Tugas"
                type="number"
                placeholder="80"
              />
            )}
          </form.AppField>

          <form.AppField name="nilaiUts">
            {(field) => (
              <field.TextField
                label="Nilai UTS"
                type="number"
                placeholder="80"
              />
            )}
          </form.AppField>

          <form.AppField name="nilaiUas">
            {(field) => (
              <field.TextField
                label="Nilai UAS"
                type="number"
                placeholder="80"
              />
            )}
          </form.AppField>
        </div>

        <Button>Submit</Button>
      </form>
    </form.AppForm>
  );
}
