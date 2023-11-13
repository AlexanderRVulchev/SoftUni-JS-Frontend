function solve() {
   const addButtons = Array.from(document.getElementsByClassName("add-product"));
   const checkoutButton = document.getElementsByClassName("checkout")[0];
   const outputArea = document.getElementsByTagName("textarea")[0];

   let cart = {
      totalPrice: 0,
      productsBought: []
   };
   let products = [
      { name: "Bread", price: 0.80 },
      { name: "Milk", price: 1.09 },
      { name: "Tomatoes", price: 0.99 }
   ];
   
   for (let i = 0; i < addButtons.length; i++) {
      const product = products[i];
      const button = addButtons[i];
      button.addEventListener("click", () => {
         if (!cart.productsBought.includes(product.name)) {
            cart.productsBought.push(product.name);
         };
         cart.totalPrice += product.price;
         outputArea.textContent += `Added ${product.name} for ${product.price.toFixed(2)} to the cart.\n`;
      })
   }

   checkoutButton.addEventListener("click", () => {
      outputArea.textContent += `You bought ${cart.productsBought.join(", ")} for ${cart.totalPrice.toFixed(2)}.`;
      checkoutButton.disabled = true;
      addButtons.forEach(button => button.disabled = true);
   })
}