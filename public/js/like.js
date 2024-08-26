async function likeButton(productId, btn) {
  try {
    const response = await axios({
      method: "post",
      url: `/api/${productId}/like`,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });

    if (btn.classList.contains("far")) {
      btn.classList.remove("far");
      btn.classList.add("fas");
    } else {
      btn.classList.remove("fas");
      btn.classList.add("far");
    }
  } catch (e) {
    // res.render("error", { error: e.message });
    console.log("Error while liking product");
    window.location.replace("/api/user/login");
  }
}

window.document.addEventListener("click", (e) => {
  const btn = e.target;

  if (btn.classList.contains("like-button")) {
    const productId = btn.getAttribute("product-id");

    likeButton(productId, btn);
  }
});
