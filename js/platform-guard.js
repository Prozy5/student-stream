import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://iabzmoxzbqzcqgypxctr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhYnptb3h6YnF6Y3FneXB4Y3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDgzNzAsImV4cCI6MjA4MjY4NDM3MH0.mHke56jh8WSlzzQxa7o2PIxqLRk1eyPRZerJ3avuGkQ"
);

export async function platformGuard({ requireRole = null } = {}) {

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    location.replace("/auth/login.html");
    return;
  }

  const user = session.user;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, approved")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    document.body.innerHTML = "<h2>Account setup error</h2>";
    return;
  }

  if (!profile.approved) {
    location.replace("/waitlist.html");
    return;
  }

  if (requireRole && profile.role !== "owner" && profile.role !== requireRole) {
    location.replace("/dashboard.html");
    return;
  }

  window.currentUser = {
    id: user.id,
    email: user.email,
    role: profile.role
  };
}