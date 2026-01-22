async function loadCreators() {
  const { data } = await supabase
    .from("creators")
    .select("*")
    .eq("is_live", true)
    .order("created_at", { ascending: false });

  const box = document.getElementById("creators");
  box.innerHTML = "";

  data.forEach(c => {
    const div = document.createElement("div");
    div.className = "creator";

    div.innerHTML = `
      <strong>${c.name}</strong> 🔴<br>
      ${c.platform} • ${c.category}<br>
      ${c.description}<br>
      <a href="${c.channel_url}" target="_blank">Watch</a>
    `;

    box.appendChild(div);
  });
}

async function loadFeed() {
  const { data } = await supabase
    .from("creator_posts")
    .select("*, creators(name)")
    .order("created_at", { ascending: false });

  const box = document.getElementById("feed");
  box.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <strong>${p.creators.name}</strong><br>
      ${p.content}<br>
      <small>${new Date(p.created_at).toLocaleString()}</small>
    `;

    box.appendChild(div);
  });
}

async function addCreator() {
  await supabase.from("creators").insert({
    name: c_name.value,
    platform: c_platform.value,
    channel_url: c_url.value,
    category: c_cat.value,
    description: c_desc.value,
    is_live: true
  });

  loadCreators();
}

async function addPost() {
  const { data } = await supabase
    .from("creators")
    .select("*")
    .eq("name", post_creator.value)
    .single();

  if (!data) return alert("Creator not found");

  await supabase.from("creator_posts").insert({
    creator_id: data.id,
    content: post_content.value
  });

  loadFeed();
}

loadCreators();
loadFeed();

supabase.channel("explore")
  .on("postgres_changes", { event:"*", table:"creators" }, loadCreators)
  .on("postgres_changes", { event:"*", table:"creator_posts" }, loadFeed)
  .subscribe();