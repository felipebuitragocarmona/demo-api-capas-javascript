**Descripción**

Proyecto demo para gestionar usuarios desde una interfaz web simple. Usa el módulo de acceso a datos en `acceso_datos/userRepository.js` (fetch hacia jsonplaceholder) y un controlador en `negocio` que renderiza la vista en `presentacion/vistas`.

**Estructura del proyecto**

- **`acceso_datos/userRepository.js`**: funciones `getUsers()`, `createUser()`, `updateUser()` y `deleteUser()` que realizan llamadas HTTP.
- **`negocio/userController.js`**: controlador que orquesta llamadas al repository y gestiona la interfaz de usuario (renderizado, formulario, edición, eliminación).
- **`presentacion/vistas/userView.html`**: vista principal que monta el controlador.
- **`presentacion/estilos/user.css`**: estilos básicos para la vista.


1. Desde la carpeta del proyecto (`demoAPI`) puedes abrir directamente `presentacion/vistas/userView.html` en el navegador.

**Uso**

- La vista carga la lista de usuarios con `getUsers()` y muestra un formulario para crear o editar usuarios.
- Botones de acción: **Editar** (carga datos al formulario) y **Eliminar** (elimina vía `deleteUser()`).

**Notas y recomendaciones**

- El `userRepository.js` apunta a `https://jsonplaceholder.typicode.com/users` para demo; los cambios POST/PUT/DELETE no persisten realmente.
- Si deseas integrar este proyecto en una app mayor, mueve `userView.html` a la carpeta pública del servidor o configura un bundler.
- Para mejorar: validaciones de formulario, manejo de errores más robusto y paginación en la lista.

**Archivos clave**

- [acceso_datos/userRepository.js](acceso_datos/userRepository.js)
- [negocio/userController.js](negocio/userController.js)
- [presentacion/vistas/userView.html](presentacion/vistas/userView.html)
- [presentacion/estilos/user.css](presentacion/estilos/user.css)
