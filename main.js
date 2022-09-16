//Mensaje de bienvenida
const wrapper = document.getElementById('welcome');
wrapper.innerHTML = '<h1>Bienvenidos a Finance</h1>'


//Construyo a través de una class constructor un objeto vacio
class Cliente{
    constructor(nombre, apellido, edad, dni, caja, esCliente){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = Number(edad);
        this.dni = Number(dni);
        this.caja = Number(caja);
        this.esCliente = esCliente;
    }
}
//Creo un array vacio
const clientes = [];

//Agrego clientes a mi array
clientes.push(new Cliente("Ramon", "Sanchez", 35, 33256789, 100000, true));
clientes.push(new Cliente("Ana", "Silva", 38, 30111999, 80000, true));
clientes.push(new Cliente("Juana", "Rincón", 52, 23111555, 120000, true));
clientes.push(new Cliente("Marcos", "Juarez", 39, 29950854, 180000, true));
clientes.push(new Cliente("Mario", "Rivera", 45, 26888741, 74000, true));
clientes.push(new Cliente("Jesús", "Lopez", 65, 10852963, 115000, true));
clientes.push(new Cliente("Clara", "Mendoza", 59, 16951753, 93000, true));
clientes.push(new Cliente("Rosa", "Alfaro", 48, 25111000, 150000, true));
clientes.push(new Cliente("Martin", "Calderón", 27, 40159999, 120000, true));
clientes.push(new Cliente("Raúl", "Ruiz", 41, 28852000, 95000, true));
clientes.unshift(new Cliente("Juan", "Perez", 25, 42111222, 0, false));
clientes.push(new Cliente("Pedro", "Gomez", 62, 14789456, 50000, true));
clientes.push(new Cliente("Maria", "Marquez", 36, 33111147, 75000, true));
clientes.push(new Cliente("Carlos", "Gonzalez", 51, 23123423, 0, false));

//Consulto elemento de mi array
console.log(clientes.length);

//Elimino a los no clientes de mi array
clientes.pop();
clientes.shift();

//Recorro mi array de objetos (Información solo se muestra a modo de ejercicio pero en la práctica es información sensible que no debe mostrarse)
for (const cliente of clientes){
    let div = document.createElement("div");
    div.innerHTML = `<h2>${cliente.nombre} ${cliente.apellido}</h2>
                    <p>Edad: ${cliente.edad}, DNI: ${cliente.dni}, Dinero disponible para invertir: ${cliente.caja}</p>
                    <hr>`;
    document.body.appendChild(div);
} 

//Filtro en un nuevo array a los clientes que cuentan con mas de $75000 para invertir
const mayores = clientes.filter(cliente => cliente.caja > 75000)
console.log(mayores);

//Muestro los apellidos de mis clientes
const listaApellidos = clientes.map(cliente => cliente.apellido)
console.log(listaApellidos);

//Busco si existe alguien con más de $250000 en caja
const existe = clientes.some(cliente => cliente.caja === 250000)
console.log(existe);

//Busco cliente con 35 años de edad
const resultado = clientes.find(cliente => cliente.edad  === 35); 
console.log(resultado);

//Busco obtener el valor total de caja 
const total = clientes.reduce((acc, la) => acc + la.caja, 0)
console.log(total);

//Creo un array  con las distintas alternativas de inversión
let listaInversion = ["Plazo Fijo en $", "Plazo Fijo en USD", "Bonos", "Acciones"];

//Utilizo select para que el cliente elija que tipo de inversión quiere realizar:

let select = document.createElement("select"); 
for (let i=0; i<listaInversion.length; i++){ 
    select.innerHTML += `<option value='${i}'> ${listaInversion[i]}</option>`;
}

select.addEventListener('change', function (e) {
    const h3 = document.createElement('h3');
    h3.innerHTML = listaInversion[e.target.value];
    document.getElementById('inversion').appendChild(h3);
})
document.getElementById('inversion').appendChild(select);

//Creo formulario para ingresar montos, plazos y monedas elegidos por los clientes para invertir
const disponibles = []
class Disponible{
    constructor(literal){
        this.id = disponibles.length;
        this.apellido = literal.apellido;
        this.inversion = literal.inversion;
        this.currency = literal.currency;
        this.monto = literal.monto;
        this.plazo = literal.plazo;
    }
}
const formulario = document.createElement("form");
formulario.innerHTML = `<input type="text">
                        <input type="text">
                        <input type="number">
                        <input type="number">
                        <input type="submit">`;
formulario.onsubmit= (e) => {
    e.preventDefault ();
    const inputs = e.target.children;
    disponibles.push(new Disponible({apellido:inputs[0].value, currency:inputs[1].value, monto: inputs[2].value, plazo:inputs[3].value}));
    mostrarDisponibles(disponibles);
    const btnDisponibles = document.getElementsByClassName('btnDisponible');
    for (const boton of btnDisponibles) {
        boton.onclick = (e) => {
            const seleccionado = disponibles.find(obj => obj.id == e.target.id);
            let notificacion = document.createElement("h6");
            notificacion.innerHTML = `Apellido ${seleccionado.apellido}  - Moneda ${seleccionado.currency} - Monto ${seleccionado.monto} -  Plazo ${seleccionado.plazo}`;
            salida.prepend(notificacion);
        }
    }
    function mostrarDisponibles(disponibles) {
        salida.innerHTML = '';
        for (const disponible of disponibles) {
            let divDisponible = document.createElement("div");
            divDisponible.innerHTML = `<h2>${disponible.apellido}</h2>
                                    <p>${disponible.currency} ${disponible.monto} ${disponible.plazo}</p>
                                    <button id='${disponible.id}' class='btnDisponible'>Seleccionar</button>`
            salida.appendChild(divDisponible);
        }
    } 
}
const salida = document.createElement("div");
document.body.appendChild(formulario);
document.body.appendChild(salida);

