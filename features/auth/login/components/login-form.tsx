"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput
} from "@/components/ui/input-group";
import { ROUTE } from "@/constants/route";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>ID</FieldLabel>
        <Input />
      </Field>
      <Field>
        <div className="flex items-center">
          <FieldLabel>Password</FieldLabel>
          <Link
            href={"#"}
            className="text-xs inline-block ml-auto hover:underline text-primary"
          >
            Forgot your password?
          </Link>
        </div>
        <InputGroup>
          <InputGroupInput></InputGroupInput>
          <InputGroupButton>
            <Eye />
          </InputGroupButton>
        </InputGroup>
      </Field>

      <Field>
        <Button onClick={() => router.push(ROUTE.HOME)}>Login</Button>
      </Field>
    </FieldGroup>
  );
}
