const supabase = supabase.createClient("URL","KEY");

async function createThread(){
  const {data:{user}} = await supabase.auth.getUser();

  await supabase.from("forum_posts").insert({
    title:title.value,
    content:content.value,
    category:category.value,
    user_id:user.id
  });

  location.href="index.html";
}