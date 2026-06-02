import { AuroraBackground } from "@/components/ui/aurora-background";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <AuroraBackground className="relative">
      <div className="absolute top-0 left-0 m-8">
        <div className="flex flex-col ">
          <span className="text-2xl font-semibold">
            Sistem Informasi Pengelolaan Nilai
          </span>
          <span className="text-sm">Sekolah Gunadarma Cendekia</span>
        </div>
      </div>

      <Card className="absolute min-w-md">
        <CardHeader>
          <CardTitle>Masuk ke Akun Anda</CardTitle>
          <CardDescription>
            Silakan masukkan ID dan password Anda untuk melanjutkan.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </AuroraBackground>
  );
}
