document.addEventListener("DOMContentLoaded", function () {
    const tareaForm = document.getElementById("tareaForm");
    const listaTareas = document.getElementById("listaTareas");
    const totalTareas = document.getElementById("totalTareas");

    const tareas = [];

    tareaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const hora = document.getElementById("hora").value;

        // Crear un objeto de tarea
        const tarea = {
            titulo: titulo,
            descripcion: descripcion,
            hora: hora,
        };

        // Agregar la tarea al array
        tareas.push(tarea);

        // Limpiar el formulario
        tareaForm.reset();

        // Actualizar la lista de tareas y la cantidad total
        actualizarListaTareas();
    });

    function actualizarListaTareas() {
        // Limpiar la lista de tareas actual
        listaTareas.innerHTML = "";

        // Mostrar las tareas pendientes
        tareas.forEach(function (tarea, indice) {
            const tareaItem = document.createElement("li");
            tareaItem.innerHTML = `<strong>${tarea.titulo}</strong><br>${tarea.descripcion}<br>Hora: ${tarea.hora}`;

            // Agregar un botón para completar la tarea
            const botonCompletar = document.createElement("button");
            botonCompletar.textContent = "Completar";
            botonCompletar.addEventListener("click", function () {
                // Eliminar la tarea completada del array
                tareas.splice(indice, 1);

                // Actualizar la lista de tareas y la cantidad total
                actualizarListaTareas();

                // Mostrar un alert de tarea completada
                alert("Tarea completada");
            });

            tareaItem.appendChild(botonCompletar);
            listaTareas.appendChild(tareaItem);
        });

        // Actualizar la cantidad total de tareas
        totalTareas.textContent = tareas.length;

        // Mostrar un mensaje de "No hay tareas pendientes" si no hay tareas
        if (tareas.length === 0) {
            alert("No hay tareas pendientes");
        }
    }
});
