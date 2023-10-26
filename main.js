document.addEventListener("DOMContentLoaded", function () {
    const tareaForm = document.getElementById("tareaForm");
    const listaTareas = document.getElementById("listaTareas");
    const totalTareas = document.getElementById("totalTareas");

    // Obtener las tareas del localStorage al cargar la página
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    // Actualizo la lista de tareas al cargar la página
    actualizarListaTareas();

    tareaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtengo los valores del formulario
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const hora = document.getElementById("hora").value;

        // Creando un objeto de tarea
        const tarea = {
            titulo: titulo,
            descripcion: descripcion,
            hora: hora,
        };

        // Agregar la tarea al array
        tareas.push(tarea);

        // Guardando las tareas en el localStorage
        localStorage.setItem("tareas", JSON.stringify(tareas));

        // Limpio el formulario
        tareaForm.reset();

        // Actualizo la lista de tareas y la cantidad total
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

                // Actualizar el localStorage sin la tarea completada
                localStorage.setItem("tareas", JSON.stringify(tareas));

                // Actualizar la lista de tareas y la cantidad total
                actualizarListaTareas();

                // Mostrar un alert de tarea completada
                alert("Tarea completada");
            });

            tareaItem.appendChild(botonCompletar);
            listaTareas.appendChild(tareaItem);
        });

        
        totalTareas.textContent = tareas.length;

        
        if (tareas.length === 0) {
            alert("No hay tareas pendientes");
        }
    }
});
