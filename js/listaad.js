
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tableBody = document.querySelector("tbody");  
     let editIndex = -1;

   const loadTableData = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
       renderTable(users);
    };

    const saveUser = (user) => {
       const users = JSON.parse(localStorage.getItem("users")) || [];
        if (editIndex === -1) {
           users.push(user);
        } else {
            users[editIndex] = user;
            editIndex = 1;
        }
        localStorage.setItem("users", JSON.stringify(users));
       renderTable(users);
    };

   const deleteUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.splice(index, 1);  
        localStorage.setItem("users", JSON.stringify(users));
        renderTable(users);  
    };

    const renderTable = (users) => {
        tableBody.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.email}</td>
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.edad}</td>
                <td>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Consult" onclick="consultUser(${index})">Consultar</button>
                    <button class="btn btn-danger" onclick="deleteUser(${index})">Eliminar</button>
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#newUserModal" onclick="editUser(${index})">Editar</button>
                </td>
            `;
             tableBody.appendChild(row);
        });
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = {
            email: document.getElementById("Email").value,
            nombre: document.getElementById("Nombre").value,
            apellido: document.getElementById("Apellido").value,
            edad: document.getElementById("Edad").value
        };
        saveUser(user);
        form.reset();
    });

    loadTableData();

    window.editUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users[index];
        if (user) {
            document.getElementById("Email").value = user.email;
            document.getElementById("Nombre").value = user.nombre;
            document.getElementById("Apellido").value = user.apellido;
            document.getElementById("Edad").value = user.edad;
            editIndex = index;
        }
    };

   window.consultUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users[index];
        if (user) {
            document.getElementById("EmailConsult").value = user.email;
            document.getElementById("NombreConsult").value = user.nombre;
            document.getElementById("ApellidoConsult").value = user.apellido;
            document.getElementById("EdadConsult").value = user.edad;
        }
    };

   window.deleteUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderTable(users);
    };
});
