import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
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
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Anonymous Messaging</span>
            <span className="block text-2xl md:text-3xl mt-2 text-white/90">
              Reimagined
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create your personalized anonymous message link and start receiving
            messages securely. Modern, private, and beautifully designed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 button-glow bg-purple-600 hover:bg-purple-700"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 glass-morphism hover:bg-white/10"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl glass-morphism card-hover"
              >
                <h2 className="text-xl font-semibold mb-3 text-purple-400">
                  {feature.title}
                </h2>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    title: "Create Your Link",
    description:
      "Generate a unique, secure link that others can use to send you anonymous messages.",
  },
  {
    title: "Receive Messages",
    description:
      "Get instant notifications when someone sends you a message through your personalized link.",
  },
  {
    title: "Stay Private",
    description:
      "Advanced encryption ensures your messages remain private and secure at all times.",
  },
];
