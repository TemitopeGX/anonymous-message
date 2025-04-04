"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { Link, Message } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchLinks();
    fetchMessages();
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login");
    }
  };

  const fetchLinks = async () => {
    const { data: links, error } = await supabase
      .from("links")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching links:", error);
    } else {
      setLinks(links || []);
    }
    setLoading(false);
  };

  const fetchMessages = async () => {
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*, links(*)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(messages || []);
    }
  };

  const createNewLink = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: link, error } = await supabase
      .from("links")
      .insert([{ user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error("Error creating link:", error);
    } else if (link) {
      setLinks([link, ...links]);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navbar */}
      <nav className="glass-morphism sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold gradient-text">Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="glass-morphism hover:bg-white/10"
          >
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Links Section */}
          <section className="glass-morphism rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-lg font-semibold text-purple-400">
                Your Links
              </h2>
              <Button
                onClick={createNewLink}
                className="button-glow bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
              >
                Create New Link
              </Button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
                </div>
              ) : (
                <>
                  {links.map((link) => (
                    <div
                      key={link.id}
                      className="glass-morphism rounded-lg p-4 card-hover"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-purple-400 mb-1">
                            Share this link:
                          </p>
                          <p className="font-mono text-sm text-gray-300 break-all">
                            {`${window.location.origin}/message/${link.id}`}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              `${window.location.origin}/message/${link.id}`
                            )
                          }
                          className="glass-morphism hover:bg-white/10 w-full sm:w-auto"
                        >
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  ))}

                  {links.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">
                        No links created yet. Create your first link to start
                        receiving messages!
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* Messages Section */}
          <section className="glass-morphism rounded-xl p-6">
            <h2 className="text-lg font-semibold text-purple-400 mb-6">
              Messages
            </h2>
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="glass-morphism rounded-lg p-4 card-hover"
                    >
                      <p className="text-gray-200">{message.content}</p>
                      <p className="text-sm text-purple-400 mt-2">
                        Received:{" "}
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">
                        No messages yet. Share your link to start receiving
                        messages!
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
