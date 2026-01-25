import { supabase } from "./auth.js";

export async function requireOwner() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/waitlist.html";
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !data || data.role !== "owner") {
    window.location.href = "/waitlist.html";
  }
}