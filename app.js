const curr_user=document.querySelector("#curr_user");
console.log(sessionStorage.getItem("curr_user"));
curr_user.textContent=JSON.parse(sessionStorage.getItem("curr_user")).username;
document.querySelector("#logout").addEventListener("click",function(e){
    sessionStorage.clear();
    alert("Logout successful");
    window.location.href="/Login/login.html"
});