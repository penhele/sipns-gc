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
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CreateScoreForm() {
  const router = useRouter();

  const { data } = useStudents();
  const { data: me } = useMe();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: createScore,
    onSuccess() {
      toast.success("Berhasil menambahkan nilai");
      router.push(ROUTES.NILAI);
      queryClient.invalidateQueries({ queryKey: ["scores"] });
    },
    onError() {
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

  useEffect(() => {
    if (me?.teacher) {
      form.setFieldValue("teacherId", me.teacher.id);
      form.setFieldValue("subjectId", me.teacher.subjectId);
    }
  }, [me, form]);

  console.log(me);

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
          <div className="flex flex-col space-y-1.5 col-span-2">
            <Label className="font-semibold">Nama Guru</Label>
            <Input value={me?.teacher?.name ?? ""} readOnly />
          </div>

          <div className="flex flex-col space-y-1.5 col-span-2">
            <Label className="font-semibold">Mata Pelajaran</Label>
            <Input value={me?.teacher?.subject?.name ?? ""} readOnly />
          </div>

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
