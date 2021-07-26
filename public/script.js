const userList = document.getElementById("users-list");
const userItems = document.getElementById("user-items");
const userAgeCountList = document.getElementById("user-age-count-list");
const fetchUsers = async () => {
  await fetch("/users")
    .then((res) => res.json())
    .then((rows) => {
      let tbody = "";
      rows &&
        rows.forEach((row) => {
          tbody =
            tbody + `<tr><td>${row.username}</td><td>${row.age}</td></tr>`;
        });
      userList.innerHTML = tbody;
    });
};
fetchUsers();

const getUserAgeCounts = (item) => {
  fetch(`/users/age?item=${item}`)
    .then((res) => res.json())
    .then((rows) => {
      let tbody = "";
      if (rows && typeof rows === "object") {
        for (const key in rows) {
          if (Object.hasOwnProperty.call(rows, key)) {
            tbody = tbody + `<tr><td>${key}</td><td>${rows[key]}</td></tr>`;
          }
        }
      }
      userAgeCountList.innerHTML = tbody;
    });
};

const fetchUsersItems = async () => {
  await fetch("/users/items")
    .then((res) => res.json())
    .then((rows) => {
      let tbody = "";
      rows &&
        rows.forEach((row) => {
          tbody =
            tbody +
            `<li onclick="getUserAgeCounts('${row}')"><a class="dropdown-item" href="javascript:void(0)">${row}</a></li>`;
        });
      userItems.innerHTML = tbody;
    });
};
fetchUsersItems();
