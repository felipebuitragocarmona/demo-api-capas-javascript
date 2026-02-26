document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM cargado");

    let btnCrear = document.getElementById("crearUsuario");
    let btnActualizar = document.getElementById("actualizarUsuario");
    let btnListar = document.getElementById("listarUsuarios");
    let tablaUsuarios = document.getElementById("tablaUsuarios");

    let nameInput = document.getElementById("nombre");
    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let userIdInput = document.getElementById("userId");
    let formTitle = document.getElementById("formTitle");

    // ==========================
    // INSTANCIA DEL REPO
    // ==========================
    let repo = new UserRepository("https://jsonplaceholder.typicode.com/users");

    // ==========================
    // CONTROLADOR
    // ==========================
    function listarUsuarios() {
        repo
            .getUsers()
            .then(function (data) {
                tablaUsuarios.innerHTML = "";

                data.forEach(function (u) {
                    let usuario = new User(u.id, u.name, u.username, u.email);

                    // IMPORTANTE: usar window.cargarUsuario / window.eliminarUsuario
                    tablaUsuarios.innerHTML +=
                        "<tr>" +
                        "<td>" + usuario.id + "</td>" +
                        "<td>" + usuario.name + "</td>" +
                        "<td>" + usuario.username + "</td>" +
                        "<td>" + usuario.email + "</td>" +
                        "<td>" +
                        "<button class='btn btn-warning btn-sm' onclick='cargarUsuario(" + JSON.stringify(u) + ")'>Actualizar</button> " +
                        "<button class='btn btn-danger btn-sm' onclick='eliminarUsuario(" + usuario.id + ")'>Eliminar</button>" +
                        "</td>" +
                        "</tr>";
                });
            })
            .catch(function (error) {
                console.error(error);
                alert("Error al obtener usuarios");
            });
    }

    function cargarUsuario(usuario) {
        userIdInput.value = usuario.id;
        nameInput.value = usuario.name;
        usernameInput.value = usuario.username;
        emailInput.value = usuario.email;

        formTitle.textContent = "Actualizar Usuario";
        btnCrear.classList.add("d-none");
        btnActualizar.classList.remove("d-none");
    }

    function limpiarFormulario() {
        userIdInput.value = "";
        nameInput.value = "";
        usernameInput.value = "";
        emailInput.value = "";

        formTitle.textContent = "Registrar Nuevo Usuario";
        btnCrear.classList.remove("d-none");
        btnActualizar.classList.add("d-none");
    }

    function crearUsuario() {
        let usuario = new User(
            null,
            nameInput.value.trim(),
            usernameInput.value.trim(),
            emailInput.value.trim()
        );

        if (!usuario.name || !usuario.username || !usuario.email) {
            alert("Complete todos los campos.");
            return;
        }

        repo
            .createUser(usuario)
            .then(function () {
                alert("Usuario creado.");
                listarUsuarios();
                limpiarFormulario();
            })
            .catch(function (error) {
                console.error(error);
                alert("Error al crear usuario");
            });
    }

    function actualizarUsuario() {
        let id = userIdInput.value;

        let usuario = new User(
            id,
            nameInput.value.trim(),
            usernameInput.value.trim(),
            emailInput.value.trim()
        );

        if (!usuario.name || !usuario.username || !usuario.email) {
            alert("Complete todos los campos.");
            return;
        }

        repo
            .updateUser(id, usuario)
            .then(function () {
                alert("Usuario actualizado.");
                listarUsuarios();
                limpiarFormulario();
            })
            .catch(function (error) {
                console.error(error);
                alert("Error al actualizar usuario");
            });
    }

    function eliminarUsuario(id) {
        if (!confirm("¿Eliminar usuario #" + id + "?")) return;

        repo
            .deleteUser(id)
            .then(function () {
                alert("Usuario eliminado.");
                listarUsuarios();
            })
            .catch(function (error) {
                console.error(error);
                alert("Error al eliminar usuario");
            });
    }

    // ==========================
    // EXPONER A WINDOW (PARA ONCLICK)
    // ==========================
    window.cargarUsuario = cargarUsuario;
    window.eliminarUsuario = eliminarUsuario;

    // ==========================
    // EVENTOS (ONCLICK)
    // ==========================
    btnCrear.onclick = crearUsuario;
    btnActualizar.onclick = actualizarUsuario;
    btnListar.onclick = listarUsuarios;

    listarUsuarios();
});