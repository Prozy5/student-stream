import { supabase } from "./supabase.js";

const container = document.getElementById("categories");

const { data: categories } = await supabase
  .from("forum_categories")
  .select("*")
  .order("order_index");

categories.forEach(cat => {
  const div = document.createElement("div");
  div.className = "category";
  div.innerHTML = `
    <div class="category-color" style="background:${cat.color}"></div>
    <div class="category-content">
      <div class="category-title">${cat.name}</div>
      <div class="category-desc">${cat.description}</div>
      <div class="category-meta">${cat.thread_count || 0} threads</div>
    </div>
  `;
  div.onclick = () =>
    location.href = `category.html?id=${cat.id}`;
  container.appendChild(div);
});