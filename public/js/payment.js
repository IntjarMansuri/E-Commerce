const buyButton = document.getElementById("buy-btn");

async function makeOrder(amount) {
  try {
    const response = await axios({
      method: "post",
      url: "/api/payment/order",
      data: { amount },
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });

    const { order } = response.data;

    const options = {
      key: "rzp_test_yiiqTBzCgzFKkF",
      amount: order.amount,
      currency: "INR",
      name: "I-Mart shopping store",
      description: "Test Transaction",
      image: "/images/i-mart-logo.png",
      order_id: order.id,
      callback_url: "http://localhost:7000/api/payment/payment-verify",
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  } catch (e) {
    window.location.replace("/api/user/login");
  }
}

buyButton.addEventListener("click", (e) => {
  const amount = document
    .querySelector("#product-price")
    .innerText.split(" ")
    .pop();
  makeOrder(amount);
});
