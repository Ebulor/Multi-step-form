const toggle = document.querySelector(".toggle input");
const container = document.querySelector(".content-wrapper");
toggle.addEventListener("click", () => {
  const month = document.querySelector(".month");
  const year = document.querySelector(".year");
  const plan = document.querySelectorAll(".plan");
  const planPrices = document.querySelectorAll(".plan-price");
  const addOnPrices = document.querySelectorAll(".add-on-price");
  const totalText = document.querySelector(".total-text span");
  const totalduration = document.querySelector(".total-duration");
  const serviceSummary = document.querySelector(".services");
  plan.forEach((plan) => {
    if (toggle.checked === true) {
      container.classList.add("yearly");
      serviceSummary.classList.add("dur-year");
      year.classList.add("checked-price");
      month.classList.remove("checked-price");
      totalText.textContent = "(per year)";
      totalduration.textContent = "/yr";
      planPrices.forEach((price) => {
        if (!price.classList.contains("active-duration")) {
          price.classList.add("active-duration");
        } else {
          price.classList.remove("active-duration");
        }
      });
      addOnPrices.forEach((item) => {
        if (!item.classList.contains("add-on-duration")) {
          item.classList.add("add-on-duration");
        } else {
          item.classList.remove("add-on-duration");
        }
      });
    } else {
      container.classList.remove("yearly");
      serviceSummary.classList.remove("dur-year");
      year.classList.remove("checked-price");
      month.classList.add("checked-price");
      totalText.textContent = "(per month)";
      totalduration.textContent = "/mo";
      planPrices.forEach((price) => {
        if (!price.classList.contains("active-duration")) {
          price.classList.add("active-duration");
        } else {
          price.classList.remove("active-duration");
        }
      });
      addOnPrices.forEach((item) => {
        if (!item.classList.contains("add-on-duration")) {
          item.classList.add("add-on-duration");
        } else {
          item.classList.remove("add-on-duration");
        }
      });
    }
  });
});
