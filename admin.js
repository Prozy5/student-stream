const supabase = supabase.createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);

let currentUser = null;
let isOwner = false;

async function init() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert("Login required");
    location.href = "/login.html";
    return;
  }

  currentUser = user.id;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile.is_admin) {
    alert("Not authorized");
    location.href = "/";
    return;
  }

  if (!profile.is_owner) {
    document.getElementById("ownerBtn").style.display = "none";
  } else {
    isOwner = true;
  }

  loadStats();
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function openOwnerPanel() {
  document.getElementById("ownerModal").style.display = "flex";
}

async function verifyOwner() {
  const pw = document.getElementById("ownerPassword").value;

  const { data, error } = await supabase.rpc("verify_owner_password", {
    pw
  });

  if (data === true) {
    document.getElementById("ownerModal").style.display = "none";
    showSection("owner");
  } else {
    alert("Wrong password");
  }
}

async function loadStats() {
  const users = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const listings = await supabase.from("marketplace_listings").select("*", { count: "exact", head: true });
  const msgs = await supabase.from("messages").select("*", { count: "exact", head: true });

  document.getElementById("userCount").innerText = users.count;
  document.getElementById("listingCount").innerText = listings.count;
  document.getElementById("msgCount").innerText = msgs.count;
}

function logout() {
  supabase.auth.signOut();
  location.href = "/";
}

init();
