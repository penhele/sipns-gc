"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { ROUTES } from "@/constants/route";
import { useAppForm } from "@/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "../../api/login";
import { Login } from "../types/login";

export default function LoginForm() {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: (data: Login) => login(data),
    onSuccess(data) {
      toast.success("Berhasil login");

      if (data.user.role === "STUDENT") {
        router.push(ROUTES.STUDENT);
      } else if (data.user.role === "TEACHER") {
        router.push(ROUTES.TEACHER);
      } else {
        router.push(ROUTES.ADMIN);
      }
    },
    onError(error: any) {
      toast.error("Gagal login");
      console.log(error.response.data);
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  return (
    <FieldGroup>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-2"
      >
        <form.AppField name={"email"}>
          {(field) => <field.TextField label="Email" />}
        </form.AppField>

        <form.AppField name={"password"}>
          {(field) => <field.TextField label="Password" type="password" />}
        </form.AppField>

        <Field>
          <Button>Login</Button>
        </Field>
      </form>
    </FieldGroup>
  );
}
