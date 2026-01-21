import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "YOUR_URL";
const SUPABASE_KEY = "YOUR_ANON_KEY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// OWNER UID
export const OWNER_ID = "0801d47e-6bc7-4916-bf0a-e2de667d21ea";

// fake auth for now
export function getUser() {
  return {
    id: localStorage.getItem("uid") || crypto.randomUUID(),
    name: localStorage.getItem("name") || "Guest" + Math.floor(Math.random()*9999)
  };
}

// save fake user
const user = getUser();
localStorage.setItem("uid", user.id);
localStorage.setItem("name", user.name);