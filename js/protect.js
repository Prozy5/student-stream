import { supabase } from "./auth.js";

const { data } = await supabase.auth.getUser();

if (!data.user) {
  window.location.href = "/auth/login.html";
}