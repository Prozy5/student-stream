const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkAdmin() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    location.href = "/login.html";
    return;
  }

  const { data } = await supabase
    .from("profiles")
    .select("is_admin, is_owner")
    .eq("id", user.id)
    .single();

  if (!data || (!data.is_admin && !data.is_owner)) {
    alert("Access denied");
    location.href = "/";
    return;
  }

  document.getElementById("status").innerText = "Logged in as admin";
  loadUsers();
}

async function loadUsers() {
  const { data, error } = await supabase
    .from("admin_users")
    .select("*");

  if (error) {
    alert(error.message);
    return;
  }

  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";

  data.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.username}</td>
      <td><input type="checkbox" ${user.is_owner ? "checked" : ""} disabled></td>
      <td><input type="checkbox" ${user.is_admin ? "checked" : ""} data-role="is_admin"></td>
      <td><input type="checkbox" ${user.is_staff ? "checked" : ""} data-role="is_staff"></td>
      <td><input type="checkbox" ${user.is_verified ? "checked" : ""} data-role="is_verified"></td>
      <td><button onclick="saveUser('${user.id}', this)">Save</button></td>
    `;

    tbody.appendChild(row);
  });
}

async function saveUser(userId, btn) {
  const row = btn.parentElement.parentElement;
  const inputs = row.querySelectorAll("input");

  const payload = {};

  inputs.forEach(i => {
    if (i.dataset.role) payload[i.dataset.role] = i.checked;
  });

  const { error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId);

  if (error) {
    alert(error.message);
  } else {
    alert("Updated!");
  }
}

checkAdmin();