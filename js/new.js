async function postThread() {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return alert("Login first");

  await supabase.from("forum_threads").insert({
    title: title.value,
    body: body.value,
    user_id: user.id
  });

  location.href = "index.html";
}