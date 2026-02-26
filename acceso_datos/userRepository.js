// ==========================
// REPOSITORY - EN CLASE (JS PURO)
// ==========================
class UserRepository {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getUsers() {
        return fetch(this.baseUrl).then(function (res) {
            if (!res.ok) {
                throw new Error("Error al obtener usuarios");
            }
            return res.json();
        });
    }

    createUser(user) {
        return fetch(this.baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }).then(function (res) {
            if (!res.ok) {
                throw new Error("Error al crear usuario");
            }
            return res.json();
        });
    }

    updateUser(id, user) {
        return fetch(this.baseUrl + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }).then(function (res) {
            if (!res.ok) {
                throw new Error("Error al actualizar usuario");
            }
            return res.json();
        });
    }

    deleteUser(id) {
        return fetch(this.baseUrl + "/" + id, {
            method: "DELETE",
        }).then(function (res) {
            if (!res.ok) {
                throw new Error("Error al eliminar usuario");
            }
            return true;
        });
    }
}