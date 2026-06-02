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
      <div className="relative z-20 h-[calc(100vh-4rem)] bg-white m-8 p-8 shadow-xl/70 rounded-xl">
        <Card className="">
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
                <FieldLabel>Password</FieldLabel>
                <Input />
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
