async function login(){
 const {error}=await supabase.auth.signInWithPassword({
   email:email.value,
   password:password.value
 });
 if(error) alert(error.message);
 else location="dashboard.html";
}