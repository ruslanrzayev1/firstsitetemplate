let productcntnr = document.querySelector(".product-cntr");
let db;

function renderProducts() {
	axios.get("https://dummyjson.com/products").then((res) => {
		db = res.data.products;
		db.map((item) => {
			let miniDiv = document.createElement("div");
			miniDiv.className = "miniDiv";
			miniDiv.innerHTML = `
                <img src="${item.thumbnail}" alt="productimg"/>
                <div class="productfeature">
                    <h1>MODEL:${item.title}</h1>
                    <p>${item.description}</p>
                    <p>PRICE:${item.price}</p>
                    <button onclick="addToCart(${item.id})">ADD</button>
                </div>
            `;
			productcntnr.append(miniDiv);
		});
	});
}

function addToCart(productIndex) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.push(db.find((item) => item.id == productIndex));
	localStorage.setItem("cart", JSON.stringify(cart));
	displayCart();
}

function removeCart() {
	localStorage.removeItem("cart");
	displayCart();
}

function removeFromCart(index) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.splice(index, 1);
	localStorage.setItem("cart", JSON.stringify(cart));
	displayCart();
}

let cartcntr = document.querySelector(".cart-cntr");

function displayCart() {
	let cart = JSON.parse(localStorage.getItem("cart"));

	cartcntr.innerHTML = "";

	if (cart) {
		cart.forEach((item, index) => {
			let cartDiv = document.createElement("div");
			cartDiv.className = "cartDiv";
			cartDiv.innerHTML = `
                <img src="${item.thumbnail}" alt="productimg"/>
                <div class="productfeature">
                    <h1>MODEL:${item.title}</h1>
                    <p>PRICE:${item.price}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
			
			cartcntr.append(cartDiv);
		});
		let removeButton = document.createElement("button");
		removeButton.innerText = "RemoveALL";
		removeButton.onclick = () => removeCart();
		cartcntr.append(removeButton);

	}
}

window.onload = () => {
	renderProducts();
	displayCart();
};
