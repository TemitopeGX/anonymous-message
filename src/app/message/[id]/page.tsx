"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function MessagePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [linkExists, setLinkExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLink();
  }, [params.id]);

  const checkLink = async () => {
    const { data, error } = await supabase
      .from("links")
      .select()
      .eq("id", params.id)
      .single();

    if (error || !data) {
      router.push("/404");
    } else {
      setLinkExists(true);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("messages").insert([
        {
          link_id: params.id,
          content: message,
        },
      ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      setMessage("");
    } catch (error) {
      setError("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </main>
    );
  }

  if (!linkExists) {
    return null; // Will redirect to 404
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen gradient-bg">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md text-center glass-morphism rounded-xl p-8">
            <div className="text-green-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 gradient-text">
              Message Sent Successfully!
            </h1>
            <p className="text-gray-300 mb-6">
              Your anonymous message has been delivered securely.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setMessage("");
              }}
              className="button-glow bg-purple-600 hover:bg-purple-700"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen gradient-bg">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="glass-morphism rounded-xl p-8">
            <h1 className="text-2xl font-bold mb-2 gradient-text text-center">
              Send Anonymous Message
            </h1>
            <p className="text-gray-400 text-center mb-6">
              Your message will be delivered securely and anonymously.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] glass-morphism bg-transparent border-0 text-gray-200 placeholder-gray-500 resize-none"
                  required
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {message.length} characters
                </div>
              </div>
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full button-glow bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting || !message.trim()}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
