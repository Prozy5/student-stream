import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://iabzmoxzbqzcqgypxctr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhYnptb3h6YnF6Y3FneXB4Y3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDgzNzAsImV4cCI6MjA4MjY4NDM3MH0.mHke56jh8WSlzzQxa7o2PIxqLRk1eyPRZerJ3avuGkQ"
);

async function platformGuard(){

  const { data:{user} } = await supabase.auth.getUser();

  if(!user) return;

  const { data:profile } = await supabase
    .from("profiles")
    .select("law_status")
    .eq("id", user.id)
    .single();

  if(profile?.law_status === "banned"){
    alert("⛔ Your account has been permanently banned.");
    await supabase.auth.signOut();
    location.href="/banned.html";
  }

  if(profile?.law_status === "suspended"){
    alert("⚠ Your account is currently suspended.");
    await supabase.auth.signOut();
    location.href="/suspended.html";
  }
}

platformGuard();