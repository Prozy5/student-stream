async function lockThread(id) {
  await supabase.from("forum_threads").update({ locked: true }).eq("id", id);
}
async function pinThread(id) {
  await supabase.from("forum_threads").update({ pinned: true }).eq("id", id);
}
async function deleteThread(id) {
  await supabase.from("forum_threads").delete().eq("id", id);
}