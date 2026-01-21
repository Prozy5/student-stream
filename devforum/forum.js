<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script>
const SUPABASE_URL = "https://iabzmoxzbqzcqgypxctr.supabase.co";
const SUPABASE_KEY = "YOUR_REAL_ANON_KEY"; // the long JWT one

const supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_KEY);

const threadsDiv = document.getElementById("threads");
const form = document.getElementById("newThreadForm");

async function loadThreads() {
  const { data, error } = await supabase
    .from("forum_posts")
    .select("*")
    .order("created_at", { ascending: false });

  threadsDiv.innerHTML = "";

  if (error) {
    threadsDiv.textContent = "Failed to load threads";
    console.log(error);
    return;
  }

  data.forEach(post => {
    const div = document.createElement("div");
    div.className = "thread";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>${new Date(post.created_at).toLocaleString()}</small>
    `;
    threadsDiv.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const { error } = await supabase
    .from("forum_posts")
    .insert([{ title, content }]);

  if (error) {
    alert("Failed to post");
    console.log(error);
  } else {
    form.reset();
    loadThreads();
  }
});

loadThreads();
</script>