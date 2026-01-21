async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

async function ensureProfile(user) {
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (!data) {
    await supabase.from("profiles").insert({
      id: user.id,
      username: "user" + Math.floor(Math.random()*9999)
    });
  }
}