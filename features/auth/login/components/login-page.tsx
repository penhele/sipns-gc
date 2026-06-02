import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuroraBackground className="grid grid-cols-2">
      <div className="relative h-[calc(100vh-4rem)] m-8">
        <div className="flex flex-col ">
          <span className="text-2xl font-semibold">
            Sistem Informasi Pengelolaan Nilai
          </span>
          <span className="text-sm">Sekolah Gunadarma Cendekia</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Card className="relative z-20 shadow-xl/70 m-8 rounded-xl w-full max-w-md">
          <CardHeader>
            <CardTitle>Masuk ke Akun Anda</CardTitle>
            <CardDescription>
              Silakan masukkan ID dan password Anda untuk melanjutkan.
            </CardDescription>
          </CardHeader>

          <CardContent>
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
                  <InputGroupAddon align={"inline-end"}>
                    <Eye />
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <Button>Login</Button>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </AuroraBackground>
  );
}
