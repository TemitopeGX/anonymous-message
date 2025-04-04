import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-bg"></div>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="shooting-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
