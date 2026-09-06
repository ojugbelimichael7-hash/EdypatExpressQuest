const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const currentItem = question.parentElement;

        currentItem.classList.toggle("active");

    });

});

// Password visibility
const passwordToggles = document.querySelectorAll(".password-toggle");

passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {

        const input = document.getElementById(
            toggle.dataset.target
        );

        if (input.type === "password") {
            input.type = "text";
            toggle.textContent = "Hide";
        } else {
            input.type = "password";
            toggle.textContent = "Show";
        }

    });
});



// Registration validation
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        alert("Registration details are valid.");

    });
}



/* =====================================================
   DEMO CUSTOMER DATA
===================================================== */

/*
    FRONTEND ONLY

    Later this information will come from
    the logged-in customer's account.
*/

const demoCustomer = {

    firstName: "Michael",

    dailyAmount: 100,

    totalSavingsDays: 100,

    daysCovered: 75,

    balance: 110000.04

};


/* =====================================================
   HELPER - FORMAT NAIRA
===================================================== */

function formatNaira(amount) {

    return new Intl.NumberFormat("en-NG", {

        style: "currency",

        currency: "NGN",

        minimumFractionDigits: 2

    }).format(amount);

}


/* =====================================================
   CUSTOMER NAME
===================================================== */

const customerName =
    document.getElementById("customerName");

const topCustomerName =
    document.getElementById("topCustomerName");

const topbarAvatar =
    document.getElementById("topbarAvatar");


if (customerName) {

    customerName.textContent =
        demoCustomer.firstName;

}


if (topCustomerName) {

    topCustomerName.textContent =
        demoCustomer.firstName;

}


if (topbarAvatar) {

    topbarAvatar.textContent =
        demoCustomer.firstName
            .charAt(0)
            .toUpperCase();

}


/* =====================================================
   DASHBOARD SAVINGS DATA
===================================================== */

const dailyAmount =
    document.getElementById("dailyAmount");

const totalSavingsDays =
    document.getElementById("totalSavingsDays");


if (dailyAmount) {

    dailyAmount.textContent =
        formatNaira(demoCustomer.dailyAmount);

}


if (totalSavingsDays) {

    totalSavingsDays.textContent =
        demoCustomer.totalSavingsDays;

}


/* =====================================================
   BALANCE
===================================================== */

const balanceAmount =
    document.getElementById("balanceAmount");

const balanceToggle =
    document.getElementById("balanceToggle");


if (balanceAmount && balanceToggle) {

    const actualBalance =
        formatNaira(demoCustomer.balance);


    balanceAmount.textContent =
        actualBalance;


    balanceToggle.addEventListener("click", () => {

        const isHidden =
            balanceAmount.dataset.hidden === "true";


        if (isHidden) {

            balanceAmount.textContent =
                actualBalance;

            balanceToggle.textContent =
                "Hide ◉";

            balanceAmount.dataset.hidden =
                "false";

        } else {

            balanceAmount.textContent =
                "••••••••";

            balanceToggle.textContent =
                "Show ◉";

            balanceAmount.dataset.hidden =
                "true";

        }

    });

}


/* =====================================================
   SAVINGS PROGRESS
===================================================== */

const progressPercentage =
    document.getElementById(
        "progressPercentage"
    );

const progressFill =
    document.getElementById(
        "progressFill"
    );

const coveredDaysText =
    document.getElementById(
        "coveredDaysText"
    );

const remainingDaysText =
    document.getElementById(
        "remainingDaysText"
    );


if (
    progressPercentage &&
    progressFill
) {

    const percentage =
        Math.round(
            (
                demoCustomer.daysCovered /
                demoCustomer.totalSavingsDays
            ) * 100
        );


    const remainingDays =
        Math.max(
            demoCustomer.totalSavingsDays -
            demoCustomer.daysCovered,
            0
        );


    progressPercentage.textContent =
        `${percentage}%`;


    progressFill.style.width =
        `${percentage}%`;


    if (coveredDaysText) {

        coveredDaysText.textContent =
            `${demoCustomer.daysCovered} of ${demoCustomer.totalSavingsDays} days covered`;

    }


    if (remainingDaysText) {

        remainingDaysText.textContent =
            `${remainingDays} days remaining`;

    }

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );

const dashboardSidebar =
    document.getElementById(
        "dashboardSidebar"
    );

const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


if (
    mobileMenuBtn &&
    dashboardSidebar &&
    sidebarOverlay
) {


    /* Open */

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            dashboardSidebar.classList.add(
                "open"
            );

            sidebarOverlay.classList.add(
                "active"
            );

        }
    );


    /* Close by clicking overlay */

    sidebarOverlay.addEventListener(
        "click",
        () => {

            dashboardSidebar.classList.remove(
                "open"
            );

            sidebarOverlay.classList.remove(
                "active"
            );

        }
    );


    /* Close after selecting link */

    const sidebarLinks =
        dashboardSidebar.querySelectorAll(
            ".sidebar-link"
        );


    sidebarLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                dashboardSidebar.classList.remove(
                    "open"
                );

                sidebarOverlay.classList.remove(
                    "active"
                );

            }
        );

    });

}



/* =========================================================
   Edypat Express Quest - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   PAYMENT PAGE
========================================================= */

/*
   Customer's daily savings amount.
   For now this is a frontend demonstration.
   Later the backend will load the actual customer's
   daily savings amount from the database.
*/
const customerDailyAmount = 1000;

/*
   Service charge applied to each payment.
*/
const serviceCharge = 50;

/* =========================================================
   PAYMENT ELEMENTS
========================================================= */

const paymentAmount = document.getElementById("paymentAmount");
const daysCovered = document.getElementById("daysCovered");
const daysCalculation = document.getElementById("daysCalculation");
const totalToPay = document.getElementById("totalToPay"); // NEW
const paymentWarning = document.getElementById("paymentWarning");
const continuePaymentBtn = document.getElementById("continuePaymentBtn");
const paymentError = document.getElementById("paymentError");
const paymentMethodStep = document.getElementById("paymentMethodStep");
const reviewStep = document.getElementById("reviewStep");
const paymentFormCard = document.getElementById("paymentFormCard");
const paymentSuccess = document.getElementById("paymentSuccess");
const newPaymentBtn = document.getElementById("newPaymentBtn");

/* =========================================================
   FORMAT NAIRA
========================================================= */

function formatPaymentNaira(amount) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/* =========================================================
   DAILY AMOUNT DISPLAY
========================================================= */

const dailyRate = document.getElementById("dailyRate");
const summaryDailyAmount = document.getElementById("summaryDailyAmount");

if (dailyRate) {
    dailyRate.textContent = formatPaymentNaira(customerDailyAmount);
}

if (summaryDailyAmount) {
    summaryDailyAmount.textContent = formatPaymentNaira(customerDailyAmount);
}

/* =========================================================
   CALCULATE COMPLETE SAVING DAYS
========================================================= */

function calculateSavingDays(amount) {
    if (!amount || amount <= 0) {
        return 0;
    }
    return Math.ceil(amount / customerDailyAmount);
}

/* =========================================================
   CALCULATE ACTUAL SAVINGS AMOUNT
========================================================= */

function calculateSavingsAmount(amount) {
    const days = calculateSavingDays(amount);
    return days * customerDailyAmount;
}

/* =========================================================
   CALCULATE TOTAL PAYMENT
========================================================= */

function calculateTotalPayment(amount) {
    const savingsAmount = calculateSavingsAmount(amount);
    return savingsAmount + serviceCharge; // INCLUDES SERVICE CHARGE
}

/* =========================================================
   LIVE PAYMENT CALCULATION
========================================================= */

if (paymentAmount) {
    paymentAmount.addEventListener("input", () => {
        const amount = Number(paymentAmount.value);

        /* Empty input */
        if (!amount || amount <= 0) {
            if (daysCovered) {
                daysCovered.textContent = "0 saving days";
            }
            if (daysCalculation) {
                daysCalculation.style.display = "none";
            }
            if (totalToPay) { // NEW
                totalToPay.style.display = "none";
            }
            if (paymentWarning) {
                paymentWarning.classList.remove("show");
            }
            return;
        }

        /* Calculate complete days */
        const calculatedDays = calculateSavingDays(amount);

        /* Amount is less than one full saving day. */
        if (calculatedDays < 1) {
            if (daysCovered) {
                daysCovered.textContent = "0 saving days";
            }
            if (totalToPay) { // NEW
                totalToPay.style.display = "none";
            }
            if (paymentWarning) {
                paymentWarning.classList.add("show");
            }
            return;
        }

        /* Hide warning */
        if (paymentWarning) {
            paymentWarning.classList.remove("show");
        }

        /* Show calculation */
        if (daysCalculation) {
            daysCalculation.style.display = "flex";
        }

        /* Display days */
        if (daysCovered) {
            daysCovered.textContent = `${calculatedDays} saving ${
                calculatedDays === 1 ? "day" : "days"
            }`;
        }

        /* NEW: Display Total to Pay including service charge */
        if (totalToPay) {
            const totalPayment = calculateTotalPayment(amount);
            totalToPay.innerHTML = `Total to Pay: <strong>${formatPaymentNaira(totalPayment)}</strong>`;
            totalToPay.style.display = "block";
        }

    });
}

/* =========================================================
   PAYMENT STEPS
========================================================= */

let currentPaymentStep = 1;

/* =========================================================
   HIDE PAYMENT STEPS INITIALLY
========================================================= */

if (paymentMethodStep) {
    paymentMethodStep.style.display = "none";
}

if (reviewStep) {
    reviewStep.style.display = "none";
}

/* =========================================================
   CONTINUE / CONFIRM BUTTON
========================================================= */

if (continuePaymentBtn) {
    continuePaymentBtn.addEventListener("click", () => {

        /* Remove previous error */
        if (paymentError) {
            paymentError.classList.remove("show");
        }

        /* =========================================
           STEP 1
           ENTER AMOUNT
        ========================================= */
        if (currentPaymentStep === 1) {
            const amount = Number(paymentAmount.value);

            /* No amount */
            if (!amount || amount <= 0) {
                showPaymentError("Please enter the amount you want to save.");
                return;
            }

            /* Calculate days */
            const calculatedDays = calculateSavingDays(amount);

            /* Must cover at least one complete day. */
            if (calculatedDays < 1) {
                showPaymentError("Please enter an amount that covers at least one saving day.");
                return;
            }

            /* Show payment methods */
            if (paymentMethodStep) {
                paymentMethodStep.style.display = "block";
            }

            currentPaymentStep = 2;
            continuePaymentBtn.innerHTML = `Continue <span>→</span>`;

            if (paymentMethodStep) {
                paymentMethodStep.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
            return;
        }

        /* =========================================
           STEP 2
           PAYMENT METHOD
        ========================================= */
        if (currentPaymentStep === 2) {
            const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');

            /* No payment method selected */
            if (!selectedMethod) {
                showPaymentError("Please select a payment method.");
                return;
            }

            /* Update review section */
            updatePaymentSummary();

            /* Show review */
            if (reviewStep) {
                reviewStep.style.display = "block";
            }

            currentPaymentStep = 3;
            continuePaymentBtn.innerHTML = `Confirm Payment <span>→</span>`;

            if (reviewStep) {
                reviewStep.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
            return;
        }

        /* =========================================
           STEP 3
           CONFIRM PAYMENT
        ========================================= */
        if (currentPaymentStep === 3) {
            submitPayment();
        }
    });
}

/* =========================================================
   SHOW PAYMENT ERROR
========================================================= */

function showPaymentError(message) {
    if (!paymentError) {
        return;
    }
    paymentError.textContent = message;
    paymentError.classList.add("show");
    paymentError.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

/* =========================================================
   UPDATE PAYMENT SUMMARY
========================================================= */

function updatePaymentSummary() {
    if (!paymentAmount) {
        return;
    }

    const amount = Number(paymentAmount.value);

    /* Round UP to the next complete saving day. */
    const calculatedDays = calculateSavingDays(amount);

    /* Actual savings amount. */
    const savingsAmount = calculateSavingsAmount(amount);

    /* Add ₦50 service charge. */
    const totalPayment = calculateTotalPayment(amount); // INCLUDES SERVICE CHARGE

    /* Get selected payment method. */
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');

    /* =========================================
       SUMMARY ELEMENTS
    ========================================= */
    const summaryAmount = document.getElementById("summaryAmount");
    const summaryDays = document.getElementById("summaryDays");
    const summaryCharge = document.getElementById("summaryCharge");
    const summaryMethod = document.getElementById("summaryMethod");
    const summaryTotal = document.getElementById("summaryTotal");

    /* =========================================
       PAYMENT AMOUNT - Savings Only
    ========================================= */
    if (summaryAmount) {
        summaryAmount.textContent = formatPaymentNaira(savingsAmount);
    }

    /* =========================================
       SAVING DAYS
    ========================================= */
    if (summaryDays) {
        summaryDays.textContent = `${calculatedDays} ${
            calculatedDays === 1 ? "day" : "days"
        }`;
    }

    /* =========================================
       SERVICE CHARGE
    ========================================= */
    if (summaryCharge) {
        summaryCharge.textContent = formatPaymentNaira(serviceCharge);
    }

    /* =========================================
       PAYMENT METHOD
    ========================================= */
    if (summaryMethod && selectedMethod) {
        summaryMethod.textContent = selectedMethod.value;
    }

    /* =========================================
       TOTAL - INCLUDES SERVICE CHARGE
    ========================================= */
    if (summaryTotal) {
        summaryTotal.textContent = formatPaymentNaira(totalPayment);
    }
}

/* =========================================================
   SUBMIT PAYMENT
========================================================= */

function submitPayment() {
    if (!paymentAmount) {
        return;
    }

    const amount = Number(paymentAmount.value);
    const calculatedDays = calculateSavingDays(amount);
    const savingsAmount = calculateSavingsAmount(amount);
    const totalPayment = calculateTotalPayment(amount); // INCLUDES SERVICE CHARGE
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');

    /* =========================================
       SUCCESS ELEMENTS
    ========================================= */
    const successAmount = document.getElementById("successAmount");
    const successDays = document.getElementById("successDays");
    const successMethod = document.getElementById("successMethod");

    /* =========================================
       SUCCESS AMOUNT - TOTAL PAID
    ========================================= */
    if (successAmount) {
        successAmount.textContent = formatPaymentNaira(totalPayment);
    }

    /* =========================================
       SUCCESS DAYS
    ========================================= */
    if (successDays) {
        successDays.textContent = `${calculatedDays} ${
            calculatedDays === 1 ? "day" : "days"
        }`;
    }

    /* =========================================
       SUCCESS PAYMENT METHOD
    ========================================= */
    if (successMethod && selectedMethod) {
        successMethod.textContent = selectedMethod.value;
    }

    /* Hide payment form. */
    if (paymentFormCard) {
        paymentFormCard.style.display = "none";
    }

    /* Show confirmation. */
    if (paymentSuccess) {
        paymentSuccess.classList.add("show");
        paymentSuccess.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

/* =========================================================
   MAKE ANOTHER PAYMENT
========================================================= */

if (newPaymentBtn) {
    newPaymentBtn.addEventListener("click", () => {

        /* Reset amount */
        if (paymentAmount) {
            paymentAmount.value = "";
        }

        /* Reset calculation */
        if (daysCovered) {
            daysCovered.textContent = "0 saving days";
        }

        if (daysCalculation) {
            daysCalculation.style.display = "none";
        }

        if (totalToPay) { // NEW
            totalToPay.style.display = "none";
        }

        /* Remove warning */
        if (paymentWarning) {
            paymentWarning.classList.remove("show");
        }

        /* Remove error */
        if (paymentError) {
            paymentError.classList.remove("show");
        }

        /* Reset payment method */
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (selectedMethod) {
            selectedMethod.checked = false;
        }

        /* Hide later steps */
        if (paymentMethodStep) {
            paymentMethodStep.style.display = "none";
        }

        if (reviewStep) {
            reviewStep.style.display = "none";
        }

        /* Hide success */
        if (paymentSuccess) {
            paymentSuccess.classList.remove("show");
        }

        /* Show payment form */
        if (paymentFormCard) {
            paymentFormCard.style.display = "block";
        }

        /* Reset step */
        currentPaymentStep = 1;

        /* Reset button */
        if (continuePaymentBtn) {
            continuePaymentBtn.innerHTML = `Continue <span>→</span>`;
        }

        /* Go back to top */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}