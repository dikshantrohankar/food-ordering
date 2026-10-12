let cart = [];

function goToMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}

function addToCart(name, price) {

    let item = cart.find(item => item.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}

function updateCart() {

    let cartItems = document.getElementById("cart-items");

    let count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("cart-count").innerText = count;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {

        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div class="quantity">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>

            </div>
        `).join("");
    }

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cart-total").innerText = total;
}

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function openCart() {
    document.getElementById("cart-sidebar").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closeCart() {
    document.getElementById("cart-sidebar").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    closeCart();

    document.getElementById("checkout").style.display = "block";

    document.getElementById("checkout").scrollIntoView({
        behavior: "smooth"
    });
}

function filterFood(category) {

    let cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {

        if (category === "all" ||
            card.dataset.category === category) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
}

function searchFood() {

    let search = document.getElementById("searchInput")
        .value.toLowerCase();

    let cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {

        let name = card.dataset.name.toLowerCase();

        if (name.includes(search)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}

   function submitOrder(event) {
    event.preventDefault();

    let name = document.getElementById("customerName").value;
    let payment = document.getElementById("payment").value;

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    saveOrder({
        items: cart.map(item => item.name).join(", "),
        total: total,
        status: "Order Placed"
    });

    document.getElementById("order-message").innerText =
        "🎉 Thank you " + name +
        "! Your order has been placed using " +
        payment + ".";

    cart = [];
    updateCart();

    document.getElementById("checkout").scrollIntoView({
        behavior: "smooth"
    });
}

    let name = document.getElementById("customerName").value;
    let payment = document.getElementById("payment").value;

    document.getElementById("order-message").innerText =
        "🎉 Thank you " + name +
        "! Your order has been placed using " +
        payment + ".";

    document.getElementById("checkout").scrollIntoView({
        behavior: "smooth"
    });
}
function openLogin() {
    document.getElementById("login-overlay")
        .classList.add("active");
}

function closeLogin() {
    document.getElementById("login-overlay")
        .classList.remove("active");
}

function loginUser(event) {

    event.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let savedEmail = localStorage.getItem("foodieEmail");
    let savedPassword = localStorage.getItem("foodiePassword");

    if (email === savedEmail && password === savedPassword) {

        document.getElementById("login-message").innerText =
            "Welcome back!";

        setTimeout(() => {
            closeLogin();
            updateUserSection();
        }, 1000);

    } else {

        document.getElementById("login-message").innerText =
            "Invalid email or password!";
    }
}
function showSignup(event) {
    event.preventDefault();

    closeLogin();

    document.getElementById("signup-overlay")
        .classList.add("active");
}

function closeSignup() {
    document.getElementById("signup-overlay")
        .classList.remove("active");
}

function signupUser(event) {

    event.preventDefault();

    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    localStorage.setItem("foodieName", name);
    localStorage.setItem("foodieEmail", email);
    localStorage.setItem("foodiePassword", password);

    document.getElementById("signup-message").innerText =
        "🎉 Account created successfully!";

    setTimeout(() => {
        closeSignup();
        updateUserSection();
    }, 1500);
}

function backToLogin(event) {

    event.preventDefault();

    closeSignup();
    openLogin();

}
function updateUserSection() {

    let name = localStorage.getItem("foodieName");

    if (name) {

        document.getElementById("user-section").innerHTML = `
            <div class="user-menu">
                👤 ${name}
                <button onclick="logoutUser()">Logout</button>
            </div>
        `;

    } else {

        document.getElementById("user-section").innerHTML = `
            <button class="login-btn" onclick="openLogin()">
                Login
            </button>
        `;
    }
}

function logoutUser() {

    localStorage.removeItem("foodieName");
    localStorage.removeItem("foodieEmail");
    localStorage.removeItem("foodiePassword");

    updateUserSection();

    alert("You have been logged out!");
}

window.onload = function() {
    updateUserSection();
};
