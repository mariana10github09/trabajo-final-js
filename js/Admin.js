
const nameUser = document.getElementById("bienvenido");

const data = JSON.parse(localStorage.getItem('user'));

let nombre = document.getElementById('nameUser');

nameUser.innerHTML = "Bienvenid@ " + `${data.nombre}`;
function logOut(){
    const exit = confirm("seguro de que quieres salir?");
    if(exit){      
        window.location.replace('Inicio.html');
    }
}