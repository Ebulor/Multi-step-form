const inputText = document.querySelectorAll("input");
const nextButton = document.querySelector(".next-option");
const prevButton = document.querySelector(".prev-option");
const navBtns = document.querySelectorAll(".side-nav-btn");
const contentTabs = document.querySelectorAll(".content");
const emailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let counter = 0;
let valName = false;
let valEmail = false;
let valNumber = false;

nextButton.addEventListener("click", formErrorHandling);
nextButton.addEventListener("click", GoToNext);
function formErrorHandling() {
  inputText.forEach((input) => {
    if (input.value === "") {
      nextButton.removeEventListener("click", GoToNext);
      input.parentElement.classList.add("invalid");
      return;
    } else if (!input.parentElement.classList.contains("invalid")) {
      nextButton.addEventListener("click", GoToNext);
    }
  });
}
//toggle plan type
const plans = document.querySelectorAll(".plan");
plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    plans.forEach((plan) => {
      plan.classList.remove("active-plan");
    });
    plan.classList.add("active-plan");
  });
});
function GoToNext() {
  if (counter >= navBtns.length - 1) {
    return;
  } else {
    counter++;
    console.log(counter);
    contentTabs.forEach((tab) => {
      tab.classList.remove("active-tab");
      contentTabs[counter].classList.add("active-tab");
    });
    navBtns.forEach((btn) => {
      btn.classList.remove("active-btn");
      navBtns[counter].classList.add("active-btn");
    });
  }
  if (counter === navBtns.length - 1) {
    createSummary();
  }
  buttonText();
}
prevButton.addEventListener("click", () => {
  if (counter === 0) {
    return;
  } else {
    counter--;
    contentTabs.forEach((tab) => {
      tab.classList.remove("active-tab");
      contentTabs[counter].classList.add("active-tab");
    });
    navBtns.forEach((btn) => {
      btn.classList.remove("active-btn");
      navBtns[counter].classList.add("active-btn");
    });
  }
  buttonText();
});
//styling checkbox
const checkbox = document.querySelectorAll(".check-container input");
checkbox.forEach((box) => {
  box.addEventListener("change", () => {
    if (box.checked) {
      box.parentElement.parentElement.classList.add("checked");
    } else {
      box.parentElement.parentElement.classList.remove("checked");
    }
  });
});

function createSummary() {
  //console.log(activePlan);
  const activePlan = document.querySelector(".active-plan");
  const add_ons = document.querySelectorAll(".checked");
  const planName = activePlan.querySelector(".plan-name").textContent;
  const planPrice = activePlan.querySelector(".active-duration").textContent;
  const chosen_plan = document.querySelector(".chosen-plan");
  const service_add_ons = document.querySelector(".service-add-ons");
  const serviceSummary = document.querySelector(".services");
  let durText = "";
  if (serviceSummary.classList.contains("dur-year")) {
    durText = "(Yearly)";
  } else {
    durText = "(Monthly)";
  }
  console.log(durText);
  let plan_summary = `
        <p class="service-plan-name">${planName + " " + durText}</p>
        <p class="service-plan-price">${planPrice}</p>
        <a class="change-btn" href="#">Change</a> 
  `;
  chosen_plan.innerHTML = plan_summary;

  //console.log(planPrice);
  let priceMatch = planPrice.match(/(\d+)/);
  let priceArry = [];
  let summaryArr = [];
  let sum = 0;
  const changePlanBtn = document.querySelector(".change-btn");
  changePlanBtn.addEventListener("click", changePlan);

  add_ons.forEach((add_on) => {
    const add_on_name = add_on.querySelector("h4").textContent;
    const add_on_price = add_on.querySelector(".add-on-duration").textContent;
    let add_on_summary = ` <div class="service-add-on">
    <p class="service-add-on-name">${add_on_name}</p>
    <p class="service-add-on-price">${add_on_price}</p>
    </div>
    `;

    summaryArr.push(add_on_summary);
    let match = add_on_price.match(/(\d+)/);

    priceArry.push(match);
  });
  const withoutCommas = summaryArr.join("");
  service_add_ons.innerHTML = withoutCommas;
  for (const value of priceArry) {
    sum += parseInt(value);
  }
  const totalPrice = document.querySelector(".total-price p");
  totalPrice.textContent = parseInt(priceMatch[0]) + parseInt(sum);
}
function changePlan() {
  counter = 0;
  GoToNext();
}
const confirmBtn = document.querySelector(".confirm-btn");
function buttonText() {
  if (counter === 0) {
    prevButton.style.display = "none";
    confirmBtn.style.display = "none";
  } else {
    prevButton.style.display = "block";
    nextButton.style.display = "block";
    confirmBtn.style.display = "none";
  }
  if (counter === navBtns.length - 1) {
    nextButton.style.display = "none";
    confirmBtn.style.display = "block";
  }
}
buttonText();
confirmBtn.addEventListener("click", () => {
  const successWrapper = document.querySelector(".success-wrapper");
  const pageBtns = document.querySelector(".page-btns");
  contentTabs.forEach((tab) => {
    tab.classList.remove("active-tab");
  });
  successWrapper.style.display = "flex";
  pageBtns.style.display = "none";
});

const email = document.querySelector("#email");
const pNumber = document.querySelector("#phoneNumber");
const fullName = document.querySelector("#name");

//console.log(emailError);
fullName.addEventListener("input", (e) => {
  const nameError = fullName.parentElement.children[0];
  if (e.target.value === "") {
    fullName.parentElement.classList.add("invalid");
    nameError.textContent = "This field is required";
    return;
  } else {
    fullName.parentElement.classList.remove("invalid");
    valName = true;
  }
});
email.addEventListener("input", (e) => {
  const emailError = email.parentElement.children[0];
  if (!emailExpression.test(e.target.value)) {
    email.parentElement.classList.add("invalid");
    emailError.textContent = "Wrong email Format";
    return;
  } else {
    email.parentElement.classList.remove("invalid");
    valEmail = true;
  }
});
pNumber.addEventListener("input", (e) => {
  const pNumberError = pNumber.parentElement.children[0];
  if (isNaN(e.target.value)) {
    pNumber.parentElement.classList.add("invalid");
    pNumberError.textContent = "Please insert correct digits";
    return;
  } else {
    pNumber.parentElement.classList.remove("invalid");
    valNumber = true;
  }
});
