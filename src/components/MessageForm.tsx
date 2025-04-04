"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function MessageForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit message");
      }

      setMessage("");
      // You can add a success toast/notification here
    } catch (error) {
      console.error("Error submitting message:", error);
      // You can add an error toast/notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
      <div className="space-y-2">
        <Textarea
          placeholder="Type your anonymous message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[120px]"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !message.trim()}
      >
        {isSubmitting ? "Sending..." : "Send Anonymous Message"}
      </Button>
    </form>
  );
}
