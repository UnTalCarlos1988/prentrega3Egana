document.addEventListener("DOMContentLoaded", function () {
    const tareaForm = document.getElementById("tareaForm");
    const listaTareas = document.getElementById("listaTareas");
    const totalTareas = document.getElementById("totalTareas");
    let mensajeH2 = document.getElementById("mensaje");

       
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

   
    actualizarListaTareas();

    tareaForm.addEventListener("submit", function (event) {
        event.preventDefault();

      
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const hora = document.getElementById("hora").value;

        
        const tarea = {
            titulo: titulo,
            descripcion: descripcion,
            hora: hora,
        };

        
        tareas.push(tarea);

       
        localStorage.setItem("tareas", JSON.stringify(tareas));

      
        tareaForm.reset();

        
        actualizarListaTareas();
    });

    function actualizarListaTareas() {
        
        listaTareas.innerHTML = "";

        
        tareas.forEach(function (tarea, indice) {
            const tareaItem = document.createElement("li");
            tareaItem.innerHTML = `<strong>${tarea.titulo}</strong><br>${tarea.descripcion}<br>Hora: ${tarea.hora}`;

            
            const botonCompletar = document.createElement("button");
            botonCompletar.textContent = "Completar";
            botonCompletar.addEventListener("click", function () {
                
                tareas.splice(indice, 1);

                
                localStorage.setItem("tareas", JSON.stringify(tareas));

                
                actualizarListaTareas();

               
                const mensaje = "tarea completada"
                mensajeH2.textContent= mensaje
            });

            tareaItem.appendChild(botonCompletar);
            listaTareas.appendChild(tareaItem);
        });

        
        totalTareas.textContent = tareas.length;

        
        if (tareas.length === 0) {
            const mensaje = "no hay tareas pendientes!"
                mensajeH2.textContent= mensaje
        }else{
           
            mensajeH2.textContent = ""
        }
    }
});
