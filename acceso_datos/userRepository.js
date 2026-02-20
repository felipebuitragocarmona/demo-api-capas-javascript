// ==========================
// REPOSITORY - JS PURO
// ==========================

let BASE_URL = "https://jsonplaceholder.typicode.com/users";

function getUsers() {
    return fetch(BASE_URL)
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Error al obtener usuarios");
            }
            return res.json();
        });
}

function createUser(user) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Error al crear usuario");
            }
            return res.json();
        });
}

function updateUser(id, user) {
    return fetch(BASE_URL + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Error al actualizar usuario");
            }
            return res.json();
        });
}

function deleteUser(id) {
    return fetch(BASE_URL + "/" + id, {
        method: "DELETE"
    })
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Error al eliminar usuario");
            }
            return true;
        });
}