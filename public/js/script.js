/**  Card Clicking */
const productCards = document.querySelectorAll(".card");
productCards.forEach((card) => {
  card.addEventListener("click", () => {
    const productId = card.getAttribute("data-product-id");
    window.location.href = `/api/products/${productId}`;
  });
});

/**  Flash Messages Close Button */
const alertElements = document.querySelectorAll(".alert");

alertElements.forEach((alertElement) => {
  const closeButton = alertElement.querySelector(".btn-close");

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      alertElement.classList.add("hidden");
    });
  }
});
