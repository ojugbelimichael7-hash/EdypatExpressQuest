/* =========================================================
   Edypat Express Quest - SAVINGS PAGE
========================================================= */


/* =========================================================
   CUSTOMER SETTINGS
========================================================= */

/*
    DEMO DATA ONLY

    Later this information will come from the database/API.

    dailyAmount:
    The customer's agreed daily savings amount.

    IMPORTANT:
    Do not put sensitive customer information directly
    inside the public website when the real backend is added.
*/

const customerDailyAmount = 1000;


/* =========================================================
   MONTHS
========================================================= */

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


/* =========================================================
   CURRENT DATE
========================================================= */

const today = new Date();

let selectedMonth = today.getMonth();

let selectedYear = today.getFullYear();


/* =========================================================
   DEMO SAVINGS DATA
========================================================= */

/*
    This represents days that have already been VERIFIED.

    Format:

    "YEAR-MONTH": [days]

    Example:

    "2026-8": [1,2,3,4]

    means:

    September 2026
    days 1,2,3,4 have been settled.

    Month is zero-based:
    January = 0
    February = 1
    ...
    September = 8

    This is temporary demo data.

    Later the backend will provide the customer's
    actual verified payment records.
*/

const savingsData = {

    "2026-8": [
        1,
        2,
        3,
        4,
        5,
        6,
        8,
        9,
        10,
        11,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        20,
        22,
        23,
        24,
        25,
        26,
        27,
        29,
        30,
        31
    ],

    "2026-7": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
    ],

    "2026-6": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ],

    "2026-5": [
        1,
        2,
        3,
        4,
        5,
        6,
        7
    ]

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

const monthSelector =
    document.getElementById("monthSelector");

const calendarGrid =
    document.getElementById("calendarGrid");

const calendarMonth =
    document.getElementById("calendarMonth");

const calendarStatus =
    document.getElementById("calendarStatus");

const previousMonthButton =
    document.getElementById("previousMonth");

const nextMonthButton =
    document.getElementById("nextMonth");


/* =========================================================
   SUMMARY ELEMENTS
========================================================= */

const totalSavingsAmount =
    document.getElementById("totalSavingsAmount");

const totalSavingDays =
    document.getElementById("totalSavingDays");

const savingsFormula =
    document.getElementById("savingsFormula");


const historyMonth =
    document.getElementById("historyMonth");

const historyDailyAmount =
    document.getElementById("historyDailyAmount");

const historyDays =
    document.getElementById("historyDays");

const historySavings =
    document.getElementById("historySavings");

const historyTotal =
    document.getElementById("historyTotal");


const sidebarDailyAmount =
    document.getElementById("sidebarDailyAmount");

const breakdownMonth =
    document.getElementById("breakdownMonth");

const breakdownDays =
    document.getElementById("breakdownDays");

const breakdownDaily =
    document.getElementById("breakdownDaily");

const breakdownTotal =
    document.getElementById("breakdownTotal");


/* =========================================================
   FORMAT NAIRA
========================================================= */

function formatNaira(amount) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(amount);

}


/* =========================================================
   MONTH KEY
========================================================= */

function getMonthKey(year, month) {

    return `${year}-${month}`;

}


/* =========================================================
   GET SETTLED DAYS
========================================================= */

function getSettledDays(year, month) {

    const key =
        getMonthKey(year, month);

    return savingsData[key] || [];

}


/* =========================================================
   GET MONTH NAME
========================================================= */

function getMonthName(month) {

    return months[month];

}


/* =========================================================
   GET SELECTED MONTH LABEL
========================================================= */

function getSelectedMonthLabel() {

    return `${getMonthName(selectedMonth)} ${selectedYear}`;

}


/* =========================================================
   RENDER MONTH SELECTOR
========================================================= */

function renderMonthSelector() {

    if (!monthSelector) {
        return;
    }

    monthSelector.innerHTML = "";


    /*
        Show all 12 months.

        This deliberately allows customers to select
        previous months.
    */

    months.forEach((month, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = "month-button";


        if (index === selectedMonth) {

            button.classList.add("active");

        }


        button.innerHTML = `

            <span class="month-name">
                ${month.substring(0, 3)}
            </span>

            <span class="month-year">
                ${selectedYear}
            </span>

        `;


        button.addEventListener(
            "click",
            () => {

                selectedMonth = index;

                renderSavingsPage();

            }
        );


        monthSelector.appendChild(button);

    });

}


/* =========================================================
   GET MONTH STATUS
========================================================= */

function getMonthStatus() {

    const currentYear =
        today.getFullYear();

    const currentMonth =
        today.getMonth();


    if (selectedYear < currentYear) {

        return "Previous month savings";

    }


    if (
        selectedYear === currentYear &&
        selectedMonth < currentMonth
    ) {

        return "Previous month savings";

    }


    if (
        selectedYear === currentYear &&
        selectedMonth === currentMonth
    ) {

        return "Current month savings";

    }


    return "Upcoming month";

}


/* =========================================================
   RENDER CALENDAR
========================================================= */

function renderCalendar() {

    if (!calendarGrid) {
        return;
    }


    calendarGrid.innerHTML = "";


    const settledDays =
        getSettledDays(
            selectedYear,
            selectedMonth
        );


    /*
        IMPORTANT:

        We intentionally create 31 days for EVERY month.

        This keeps the savings UI consistent with the
        physical savings/passbook concept and your requested
        rounded design.

        This is NOT being used as a traditional date picker.
        It represents saving days.
    */

    for (
        let day = 1;
        day <= 31;
        day++
    ) {


        const dayElement =
            document.createElement("div");


        dayElement.className =
            "calendar-day";


        /*
            Determine whether this day has been settled.
        */

        if (
            settledDays.includes(day)
        ) {

            dayElement.classList.add(
                "settled"
            );

        }


        /*
            Future-day styling.

            Only relevant for the current month.
        */

        const isCurrentMonth =
            selectedYear === today.getFullYear() &&
            selectedMonth === today.getMonth();


        if (
            isCurrentMonth &&
            day > today.getDate()
        ) {

            if (
                !settledDays.includes(day)
            ) {

                dayElement.classList.add(
                    "future"
                );

            }

        }


        /*
            Highlight today's date.
        */

        if (
            isCurrentMonth &&
            day === today.getDate()
        ) {

            dayElement.classList.add(
                "today"
            );

        }


        /*
            Determine the weekday position.

            We use the actual calendar weekday for
            normal calendar formatting.

            Days 29-31 remain visible even when a real
            month has fewer days because this is a savings
            day display rather than a strict date picker.
        */

        const actualDate =
            new Date(
                selectedYear,
                selectedMonth,
                day
            );


        const weekday =
            actualDate.getDay();


        /*
            For day 1, insert blank cells before it
            so the calendar keeps standard calendar format.
        */

        if (day === 1) {

            for (
                let blank = 0;
                blank < weekday;
                blank++
            ) {

                const emptyCell =
                    document.createElement("div");

                emptyCell.className =
                    "calendar-day calendar-empty";

                emptyCell.style.visibility =
                    "hidden";

                calendarGrid.appendChild(
                    emptyCell
                );

            }

        }


        dayElement.innerHTML = `

            <span class="day-number">
                ${day}
            </span>

            <span class="day-check">
                ${settledDays.includes(day) ? "✓" : ""}
            </span>

        `;


        calendarGrid.appendChild(
            dayElement
        );

    }

}


/* =========================================================
   UPDATE CALENDAR HEADING
========================================================= */

function updateCalendarHeading() {

    const label =
        getSelectedMonthLabel();


    if (calendarMonth) {

        calendarMonth.textContent =
            label;

    }


    if (calendarStatus) {

        calendarStatus.textContent =
            getMonthStatus();

    }

}


/* =========================================================
   UPDATE SAVINGS SUMMARY
========================================================= */

function updateSavingsSummary() {

    const settledDays =
        getSettledDays(
            selectedYear,
            selectedMonth
        );


    const numberOfDays =
        settledDays.length;


    const savingsAmount =
        numberOfDays *
        customerDailyAmount;


    /*
        Main total
    */

    if (totalSavingsAmount) {

        totalSavingsAmount.textContent =
            formatNaira(
                savingsAmount
            );

    }


    if (totalSavingDays) {

        totalSavingDays.textContent =
            `${numberOfDays} ${
                numberOfDays === 1
                    ? "day"
                    : "days"
            }`;

    }


    if (savingsFormula) {

        savingsFormula.textContent =
            `${numberOfDays} days × ${formatNaira(customerDailyAmount)}`;

    }


    /*
        Payment history
    */

    if (historyMonth) {

        historyMonth.textContent =
            getSelectedMonthLabel();

    }


    if (historyDailyAmount) {

        historyDailyAmount.textContent =
            formatNaira(
                customerDailyAmount
            );

    }


    if (historyDays) {

        historyDays.textContent =
            `${numberOfDays} ${
                numberOfDays === 1
                    ? "day"
                    : "days"
            }`;

    }


    if (historySavings) {

        historySavings.textContent =
            formatNaira(
                savingsAmount
            );

    }


    if (historyTotal) {

        historyTotal.textContent =
            formatNaira(
                savingsAmount
            );

    }


    /*
        Sidebar
    */

    if (sidebarDailyAmount) {

        sidebarDailyAmount.textContent =
            formatNaira(
                customerDailyAmount
            );

    }


    if (breakdownMonth) {

        breakdownMonth.textContent =
            getMonthName(
                selectedMonth
            );

    }


    if (breakdownDays) {

        breakdownDays.textContent =
            numberOfDays;

    }


    if (breakdownDaily) {

        breakdownDaily.textContent =
            formatNaira(
                customerDailyAmount
            );

    }


    if (breakdownTotal) {

        breakdownTotal.textContent =
            formatNaira(
                savingsAmount
            );

    }

}


/* =========================================================
   MONTH NAVIGATION
========================================================= */

if (previousMonthButton) {

    previousMonthButton.addEventListener(
        "click",
        () => {

            if (selectedMonth === 0) {

                selectedMonth = 11;

                selectedYear--;

            } else {

                selectedMonth--;

            }

            renderSavingsPage();

        }
    );

}


if (nextMonthButton) {

    nextMonthButton.addEventListener(
        "click",
        () => {

            if (selectedMonth === 11) {

                selectedMonth = 0;

                selectedYear++;

            } else {

                selectedMonth++;

            }

            renderSavingsPage();

        }
    );

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderSavingsPage() {

    renderMonthSelector();

    renderCalendar();

    updateCalendarHeading();

    updateSavingsSummary();

}


/* =========================================================
   FOOTER YEAR
========================================================= */

const footerYear =
    document.getElementById(
        "footerYear"
    );


if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   INITIALIZE
========================================================= */

renderSavingsPage();