function clearList() {
    const userList = document.getElementById("user_list");
    while (userList.firstChild) userList.removeChild(userList.firstChild);
}

function getList() {
    console.log("getList fired");
    const url = "http://localhost:8080/api/users";
    axios
        .get(url)
        .then(function (res) {
            const users = res.data.data;
            console.log("users", users);
            clearList();
            users.forEach(function (user) {
                const li = document.createElement("li");
                li.innerHTML = user.name + " " + user.age;
                li.setAttribute("data-id", user.id);
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function () {
                    deleteUserById(user.id);
                });
                li.appendChild(deleteButton);
                document.getElementById("user_list").appendChild(li);
            });
        })
        .catch(function (err) {
            console.error("Error fetching user list:", err);
        });
}

function deleteUserById(userId) {
    console.log("deleteUserById fired");
    const url = "http://localhost:8080/api/users/" + userId;
    axios
        .delete(url)
        .then(function (res) {
            console.log(userId + " deleted");
            getList();
        })
        .catch(function (err) {
            console.error("Error deleting user with ID: " + userId, err);
        });
}
