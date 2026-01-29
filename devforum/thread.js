import { supabase } from "./supabase.js";

const id = new URLSearchParams(location.search).get("id");
const container = document.getElementById("thread");

const { data: thread } = await supabase
  .from("forum_threads")
  .select("*, forum_profiles(username)")
  .eq("id", id)
  .single();

container.innerHTML += `
  <div class="post">
    <div class="post-author">${thread.forum_profiles.username}</div>
    <div class="post-body">${thread.body}</div>
  </div>
`;

const { data: replies } = await supabase
  .from("forum_replies")
  .select("body, forum_profiles(username)")
  .eq("thread_id", id);

replies.forEach(r => {
  container.innerHTML += `
    <div class="post">
      <div class="post-author">${r.forum_profiles.username}</div>
      <div class="post-body">${r.body}</div>
    </div>
  `;
});