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
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </AuroraBackground>
  );
}
