"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import useMe from "@/features/auth/hooks/use-me";
import useStudents from "@/features/student/hooks/use-students";
import { useAppForm } from "@/hooks/use-app-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createScore } from "../api/create-score";
import { createScoreSchema } from "../schema/score.schema";
import { revalidateLogic } from "@tanstack/react-form";

export default function CreateScoreForm() {
  const router = useRouter();

  const { data } = useStudents();
  const { data: me } = useMe();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: createScore,
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Berhasil menambahkan nilai");
      router.push(ROUTES.NILAI);
      queryClient.invalidateQueries({ queryKey: ["scores"] });
    },
    onError(error, variables, onMutateResult, context) {
      toast.error("Gagal menambahkan score");
    },
  });

  const form = useAppForm({
    defaultValues: {
      teacherId: me?.teacher?.id ?? "",
      subjectId: me?.teacher?.subjectId ?? "",
      studentId: "",
      nilaiTugas: "" as unknown as number,
      nilaiUts: "" as unknown as number,
      nilaiUas: "" as unknown as number,
    },
    validators: {
      onChange: createScoreSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    onSubmit: async ({ value }) => {
      console.log(value);
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
        <div className="grid grid-cols-2 gap-4">
          <form.AppField name="teacherId">
            {(field) => (
              <field.TextField
                label="ID Guru"
                className="col-span-2"
                readonly
              />
            )}
          </form.AppField>

          <form.AppField name="subjectId">
            {(field) => (
              <field.TextField
                label="ID Mata Pelajaran"
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
