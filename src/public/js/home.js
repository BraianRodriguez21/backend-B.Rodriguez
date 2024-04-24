const socket = io();
const form = document.getElementById('productForm'); // Cambiar a 'productForm'
const cardContainer = document.querySelector('.card-container');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Previene el comportamiento por defecto de envío del formulario

    // Construir un objeto con los datos del formulario
    const formData = {
        title: form.elements['title'].value,
        price: form.elements['price'].value, // Cambiar a 'price'
    };

    // Opciones de la solicitud fetch
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convertir los datos del formulario a JSON
    };

    // Enviar los datos al servidor
    fetch('http://localhost:8080/api/products', options) // Cambiar a '/api/products'
        .then((response) => response.json())
        .then((data) => {
            if (!data.success) {
                alert(data.message);
                return;
            }

            alert('Producto registrado con éxito!'); // Cambiar a 'Producto'
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al registrar el producto'); // Cambiar a 'producto'
        });
});

socket.on('new-product', (product) => { // Cambiar a 'product'
    const newCard = `
                <div class="card">
                    <h3>${product.title}</h3>
                    <p>Precio: ${product.price}</p> // Cambiar a 'price'
                </div>`;

    cardContainer.innerHTML += newCard;
});
