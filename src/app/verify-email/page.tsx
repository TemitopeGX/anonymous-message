export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
        <p className="text-gray-600 mb-4">
          We've sent you an email with a verification link. Please check your
          inbox and click the link to verify your account.
        </p>
        <p className="text-sm text-gray-500">
          If you don't see the email, check your spam folder.
        </p>
      </div>
    </main>
  );
}
