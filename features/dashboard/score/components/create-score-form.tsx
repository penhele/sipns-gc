"use client";

import { Button } from "@/components/ui/button";
import useStudents from "@/features/student/hooks/use-students";
import { useAppForm } from "@/hooks/use-app-form";

export default function CreateScoreForm() {
  const form = useAppForm({
    defaultValues: {
      teacherId: "",
      studentId: "",
      nilaiTugas: "",
      nilaiUts: "",
      nilaiUas: "",
    },
  });

  const { data } = useStudents();

  return (
    <form.AppForm>
      <form action="" className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <form.AppField name="teacherId">
            {(field) => (
              <field.TextField label="ID Guru" className="col-span-2" />
            )}
          </form.AppField>

          <form.AppField name="studentId">
            {(field) => (
              <field.ComboboxField
                label="ID Siswa"
                className="col-span-2"
                items={data }
              />
            )}
          </form.AppField>

          <form.AppField name="nilaiTugas">
            {(field) => <field.TextField label="Nilai Tugas" type="number" />}
          </form.AppField>

          <form.AppField name="nilaiUts">
            {(field) => <field.TextField label="Nilai UTS" type="number" />}
          </form.AppField>

          <form.AppField name="nilaiUas">
            {(field) => <field.TextField label="Nilai UAS" type="number" />}
          </form.AppField>
        </div>

        <Button>Submit</Button>
      </form>
    </form.AppForm>
  );
}
