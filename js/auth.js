import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://iabzmoxzbqzcqgypxctr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhYnptb3h6YnF6Y3FneXB4Y3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDgzNzAsImV4cCI6MjA4MjY4NDM3MH0.mHke56jh8WSlzzQxa7o2PIxqLRk1eyPRZerJ3avuGkQ";

export const supabase = createClient(supabaseUrl, supabaseKey);

// LOGIN
export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
}

// SIGNUP
export async function signup(email, password) {
  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) throw error;
}

// LOGOUT
export async function logout() {
  await supabase.auth.signOut();
}

// GET USER
export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}