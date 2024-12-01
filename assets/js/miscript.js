const Pedido = JSON.parse(localStorage.getItem("pedido")) || [];

const productosCafeteria = [
    {nombre: "Americano pequeño", precio: 1000, id: 1, categoria: "bebida"},
    {nombre: "Americano mediano", precio: 1500, id: 2, categoria: "bebida"},
    {nombre: "Americano grande", precio: 2000, id: 3, categoria: "bebida"},
    {nombre: "Capuchino pequeño", precio: 2500, id: 4, categoria: "bebida"},
    {nombre: "Capuchino mediano", precio: 3000, id: 5, categoria: "bebida"},
    {nombre: "Capuchino grande", precio: 3500, id: 6, categoria: "bebida"},
    {nombre: "Latte pequeño", precio: 2500, id: 7, categoria: "bebida"},
    {nombre: "Latte mediano", precio: 3000, id: 8, categoria: "bebida"},
    {nombre: "Latte grande", precio: 3500, id: 9, categoria: "bebida"},
    {nombre: "Mocha pequeño", precio: 2800, id: 10, categoria: "bebida"},
    {nombre: "Mocha mediano", precio: 3300, id: 11, categoria: "bebida"},
    {nombre: "Mocha grande", precio: 3800, id: 12, categoria: "bebida"},
    {nombre: "Té negro", precio: 2000, id: 13, categoria: "bebida"},
    {nombre: "Te verde", precio: 2200, id: 14, categoria: "bebida"},
    {nombre: "Té chai latte", precio: 3500, id: 15, categoria: "bebida"},
    {nombre: "Croissant simple", precio: 1500, id: 16, categoria: "comida"},
    {nombre: "Croissant con jamon y queso", precio: 2500, id: 17, categoria: "comida"},
    {nombre: "Muffin de chocolate", precio: 2000, id: 18, categoria: "comida"},
    {nombre: "Muffin de arándanos", precio: 2000, id: 19, categoria: "comida"},
    {nombre: "Sandwich de pollo", precio: 4000, id: 20, categoria: "comida"},
    {nombre: "Sandwich vegetariano", precio: 3800, id: 21, categoria: "comida"},
    {nombre: "Cheesecake de frutilla", precio: 3500, id: 22, categoria: "comida"},
    {nombre: "Brownie", precio: 3000, id: 23, categoria: "comida"},
    {nombre: "Galleta de avena", precio: 1500, id: 24, categoria: "comida"}
];

const productosDiv = document.getElementById("div-productos");
const pedidoDiv = document.getElementById("pedido");
const totalDetalle = document.getElementById("totalDetalle");
const btnaplicarDescuento = document.getElementById("btnaplicarDescuento");
const codigoDescuento = document.getElementById("codigoDescuento");
const totalDetalleDescuento = document.getElementById("totalDetalleDescuento");

const btnBebida = document.getElementById("btnBebida");
const btnComida = document.getElementById("btnComida");

idContador = 1;
cantidad = 0


function AgregarAlPedido(){
    const cardProducto = document.getElementsByClassName("card-producto")
    const ArrayProductosSeleccionados = Array.from(cardProducto)

    ArrayProductosSeleccionados.forEach(producto => {

        console.dir(producto.parentElement.children[0].children[0].innerText)

        producto.addEventListener("click", (e) => {

            console.log(e.target.parentElement.children[0].innerText)
            const idProducto = idContador++;
            const productoExistente = Pedido.find(producto => producto.nombre === e.target.parentElement.children[0].innerText);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                Pedido.push({
                    nombre: e.target.parentElement.children[0].innerText,
                    precio: Number(e.target.parentElement.children[1].children[0].innerText),
                    id: idProducto,
                    cantidad: 1
                })
            }

            
            ActualizarPedido()
        })

    })
    
}

function ActualizarPedido(){
    pedidoDiv.innerHTML = " "
    totalDetalle.innerHTML = " "
    Pedido.forEach(producto => {
        pedidoDiv.innerHTML += `<hr><div class="pedido-item d-flex justify-content-between">
                                <span>${producto.nombre}</span>
                                <span>$${producto.precio}</span>
                                <span>${producto.cantidad}</span>
                                <span><button class="btn btn-danger btn-sm" onclick="EliminarDelPedido(${producto.id})">X</button></span>
                            </div>`
    })

    localStorage.setItem("pedido", JSON.stringify(Pedido))

    const total = Pedido.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    totalDetalle.innerHTML = `$${total}`
}

function EliminarDelPedido(id) {
    const indice = Pedido.findIndex(producto => producto.id === id);

    if (indice >= 0) {
        Pedido.splice(indice, 1);
        ActualizarPedido(); 
    }
}


btnaplicarDescuento.addEventListener("click", () => {
    const total = Pedido.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    if (codigoDescuento.value.includes("CODIGO10")) {
        const totalConDescuento = total - (total * 0.10);
        totalDetalleDescuento.innerHTML = `$${totalConDescuento}`;
    } else {
        totalDetalleDescuento.innerHTML = `$${total}`;
    }
} );


btnBebida.addEventListener("click", () => {
    const bebidas = productosCafeteria.filter(producto => producto.categoria === "bebida");
    productosDiv.innerHTML = "";

    bebidas.forEach(producto => {
        productosDiv.innerHTML += `<div class="col-md-3 mb-4">
                                    <div class="card" style="width: 100%;">
                                        <div class="card-body card-producto">
                                            <h5 class="card-title">${producto.nombre}</h5>
                                            <p class="card-text">$<span>${producto.precio}</span></p>
                                            <button class="botonComprar">Comprar</button>
                                        </div>
                                    </div>
                                </div>`;
    })
    AgregarAlPedido()
} );

btnComida.addEventListener("click", () => {
    const comidas = productosCafeteria.filter(producto => producto.categoria === "comida");
    productosDiv.innerHTML = "";
    
    comidas.forEach(producto => {
        productosDiv.innerHTML += `<div class="col-md-3 mb-4">
                                    <div class="card" style="width: 100%;">
                                        <div class="card-body card-producto">
                                            <h5 class="card-title">${producto.nombre}</h5>
                                            <p class="card-text">$<span>${producto.precio}</span></p>
                                            <button class="botonComprar">Comprar</button>
                                        </div>
                                    </div>
                                </div>`;
    })
    AgregarAlPedido()
} );

document.addEventListener("DOMContentLoaded", () => {
    productosCafeteria.forEach(producto=>{
        productosDiv.innerHTML += `<div class="col-md-3 mb-4">
                                    <div class="card" style="width: 100%;">
                                        <div class="card-body card-producto">
                                            <h5 class="card-title">${producto.nombre}</h5>
                                            <p class="card-text">$<span>${producto.precio}</span></p>
                                            <button class="botonComprar">Comprar</button>
                                        </div>
                                    </div>
                                </div>`;
    })
    AgregarAlPedido()
    ActualizarPedido(); 
});






