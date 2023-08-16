const cart = document.getElementById('cart');
const totalPriceElement = document.getElementById('total-price');

const items = [
    { name: 'Oreo Cheesecake', price: 12, image: 'oreo.jpg', quantity: 0 },
    { name: 'Ferrero Cheesecake', price: 15, image: 'ferrero.jpg', quantity: 0 },
    { name: 'Speculoos Cheesecake', price: 13, image: 'speculoos.jpg', quantity: 0 },
    // Add more items as needed
];

function updateTotalPrice() {
    let totalPrice = 0;
    cart.querySelectorAll('.item').forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const price = parseFloat(item.dataset.price);
        totalPrice += quantity * price;
    });
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function createCartItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('row', 'item');
    itemDiv.dataset.price = item.price;

    itemDiv.innerHTML = `
        <div class="col-md-3">
            <img src="${item.image}" alt="${item.name}" class="img-fluid">
        </div>
        <div class="col-md-3 align-self-center">
            <h4>${item.name}</h4>
            <p>Price: $${item.price.toFixed(2)}</p>
        </div>
        <div class="col-md-2 align-self-center quantity-buttons">
            <button class="btn btn-decrement">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="btn btn-increment">+</button>
        </div>
        <div class="col-md-2 align-self-center">
            <button class="btn btn-danger delete-button">Delete</button>
        </div>
        <div class="col-md-2 align-self-center">
            <button class="btn btn-outline-light like-button">
                <span class="heart">❤️</span>
            </button>
        </div>
    `;

    const decrementButton = itemDiv.querySelector('.btn-decrement');
    const incrementButton = itemDiv.querySelector('.btn-increment');
    const quantityElement = itemDiv.querySelector('.quantity');
    const deleteButton = itemDiv.querySelector('.delete-button');
    const likeButton = itemDiv.querySelector('.like-button');
    const priceElement = itemDiv.querySelector('p');

    decrementButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantity--;
            quantityElement.textContent = quantity;
            updateTotalPrice();
        }
    });

    incrementButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        updateTotalPrice();
    });

    deleteButton.addEventListener('click', () => {
        itemDiv.remove();
        updateTotalPrice();
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('clicked');
    });

    return itemDiv;
}

items.forEach(item => {
    cart.appendChild(createCartItem(item));
});

updateTotalPrice();

document.querySelector('.clear-cart').addEventListener('click', () => {
    cart.innerHTML = '';
    updateTotalPrice();
});
