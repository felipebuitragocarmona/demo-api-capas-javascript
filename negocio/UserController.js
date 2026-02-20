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
    // CONTROLADOR
    // ==========================
    function listarUsuarios() {
        getUsers()
            .then(function (data) {

                tablaUsuarios.innerHTML = "";

                data.forEach(function (u) {

                    let usuario = new User(u.id, u.name, u.username, u.email);

                    tablaUsuarios.innerHTML +=
                        "<tr>" +
                        "<td>" + usuario.id + "</td>" +
                        "<td>" + usuario.name + "</td>" +
                        "<td>" + usuario.username + "</td>" +
                        "<td>" + usuario.email + "</td>" +
                        "<td>" +
                        "<button class='btn btn-warning btn-sm btn-editar' data-id='" + usuario.id + "'>Actualizar</button> " +
                        "<button class='btn btn-danger btn-sm btn-eliminar' data-id='" + usuario.id + "'>Eliminar</button>" +
                        "</td>" +
                        "</tr>";
                });

                asignarEventos(data);
            })
            .catch(function (error) {
                console.error(error);
                alert("Error al obtener usuarios");
            });
    }

    function asignarEventos(dataOriginal) {

        let editarBtns = document.querySelectorAll(".btn-editar");
        let eliminarBtns = document.querySelectorAll(".btn-eliminar");

        editarBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                let id = btn.getAttribute("data-id");

                let usuario = dataOriginal.find(function (u) {
                    return String(u.id) === String(id);
                });

                if (!usuario) return;

                cargarUsuario(usuario);
            });
        });

        eliminarBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                let id = btn.getAttribute("data-id");
                eliminarUsuario(id);
            });
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

        createUser(usuario)
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

        updateUser(id, usuario)
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

        deleteUser(id)
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
    // EVENTOS
    // ==========================
    btnCrear.addEventListener("click", crearUsuario);
    btnActualizar.addEventListener("click", actualizarUsuario);
    btnListar.addEventListener("click", listarUsuarios);

    listarUsuarios();
});