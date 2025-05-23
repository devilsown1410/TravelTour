const User = JSON.parse(localStorage.getItem("User"));
const userList = document.getElementById("userTable");
const home = document.getElementById("home");
home.addEventListener("click", function () {
  window.location.href = "../index.html";
});
function renderUsers() {
  if( User.length === 0) {
    userList.innerHTML = "<tr><td colspan='7'>No users found</td></tr>";
    return;
  }
  User.forEach((element) => {
    if (element.isAdmin === true) {
      return;
    }
    const tableRow = document.createElement("tr");
    const tableData1 = document.createElement("td");
    const tableData2 = document.createElement("td");
    const tableData3 = document.createElement("td");
    const tableData4 = document.createElement("td");
    const tableData5 = document.createElement("td");
    const tableData6 = document.createElement("td");
    const tableData7 = document.createElement("td");
    tableData1.innerText = element.username;
    tableData3.innerText = element.email;
    tableData2.innerText = element.password;
    tableData4.innerText = element.dob;
    tableData5.innerText = element.gender;
    tableData6.innerText = element.phone;
    tableData7.innerText = element.hobbies;
    tableRow.appendChild(tableData1);
    tableRow.appendChild(tableData2);
    tableRow.appendChild(tableData3);
    tableRow.appendChild(tableData4);
    tableRow.appendChild(tableData5);
    tableRow.appendChild(tableData6);
    tableRow.appendChild(tableData7);
    userList.appendChild(tableRow);
  });
}
renderUsers();