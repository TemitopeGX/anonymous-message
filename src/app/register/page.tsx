import { AuthForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <AuthForm mode="register" />
    </main>
  );
}
