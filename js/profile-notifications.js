/* =========================================================
    Edypat Express Quest
   PROFILE + NOTIFICATIONS JAVASCRIPT
========================================================= */


/* =========================================================
   PROFILE
========================================================= */

/*
    DEMO CUSTOMER DATA

    This is temporary frontend data.

    Later the backend will replace this with the
    authenticated customer's information from the database.
*/

const customerProfile = {

    firstName: "Michael",

    fullName: "Michael Ojugbeli",

    phone: "+234 800 000 0000",

    email: "customer@example.com",

    dateOfBirth: "01 January 2000",

    gender: "Male",

    address: "Customer residential address",

    customerId: "TS-000001",

    registrationDate: "01 September 2026"

};


/* =========================================================
   PROFILE ELEMENTS
========================================================= */

const profileName =
    document.getElementById("profileName");

const profileAvatar =
    document.getElementById("profileAvatar");

const fullName =
    document.getElementById("fullName");

const phoneNumber =
    document.getElementById("phoneNumber");

const emailAddress =
    document.getElementById("emailAddress");

const dateOfBirth =
    document.getElementById("dateOfBirth");

const gender =
    document.getElementById("gender");

const address =
    document.getElementById("address");

const customerId =
    document.getElementById("customerId");

const registrationDate =
    document.getElementById("registrationDate");


/* =========================================================
   LOAD PROFILE
========================================================= */

function loadCustomerProfile() {

    if (profileName) {
        profileName.textContent =
            customerProfile.firstName;
    }


    if (profileAvatar) {

        profileAvatar.textContent =
            customerProfile.firstName
                .charAt(0)
                .toUpperCase();

    }


    if (fullName) {
        fullName.textContent =
            customerProfile.fullName;
    }


    if (phoneNumber) {
        phoneNumber.textContent =
            customerProfile.phone;
    }


    if (emailAddress) {
        emailAddress.textContent =
            customerProfile.email;
    }


    if (dateOfBirth) {
        dateOfBirth.textContent =
            customerProfile.dateOfBirth;
    }


    if (gender) {
        gender.textContent =
            customerProfile.gender;
    }


    if (address) {
        address.textContent =
            customerProfile.address;
    }


    if (customerId) {
        customerId.textContent =
            customerProfile.customerId;
    }


    if (registrationDate) {
        registrationDate.textContent =
            customerProfile.registrationDate;
    }

}


/* =========================================================
   INITIALIZE PROFILE
========================================================= */

loadCustomerProfile();



/* =========================================================
   NOTIFICATIONS
========================================================= */

/*
    DEMO NOTIFICATION STORAGE

    Later these notifications will come from the backend.

    Possible backend notification types:

    - receipt_submitted
    - payment_pending
    - payment_verified
    - savings_updated
    - withdrawal_requested
    - withdrawal_completed
    - admin_message
*/

let notifications = [

    {
        id: 1,
        title: "Receipt submitted",
        message:
            "Your payment receipt has been submitted successfully and is awaiting confirmation from  Edypat Express Quest.",
        time: "Just now",
        type: "payment",
        status: "Awaiting confirmation",
        read: false
    },

    {
        id: 2,
        title: "Savings balance updated",
        message:
            "Your recent payment has been verified. Your savings record has been updated successfully.",
        time: "Yesterday",
        type: "success",
        status: "Payment verified",
        read: false
    },

    {
        id: 3,
        title: "Welcome to  Edypat Express Quest",
        message:
            "Your  Edypat Express Quest customer account has been successfully created. You can now manage your savings and payments from your dashboard.",
        time: "2 days ago",
        type: "info",
        status: "",
        read: false
    }

];


/* =========================================================
   NOTIFICATION ELEMENTS
========================================================= */

const notificationList =
    document.getElementById("notificationList");

const notificationEmpty =
    document.getElementById("notificationEmpty");

const notificationCount =
    document.getElementById("notificationCount");

const navNotificationBadge =
    document.getElementById("navNotificationBadge");

const markAllReadBtn =
    document.getElementById("markAllReadBtn");


/* =========================================================
   COUNT UNREAD
========================================================= */

function getUnreadNotificationCount() {

    return notifications.filter(
        notification => !notification.read
    ).length;

}


/* =========================================================
   UPDATE NOTIFICATION COUNT
========================================================= */

function updateNotificationCount() {

    const unreadCount =
        getUnreadNotificationCount();


    if (notificationCount) {

        notificationCount.textContent =
            unreadCount;

    }


    if (navNotificationBadge) {

        if (unreadCount > 0) {

            navNotificationBadge.textContent =
                unreadCount;

            navNotificationBadge.style.display =
                "inline-flex";

        } else {

            navNotificationBadge.style.display =
                "none";

        }

    }

}


/* =========================================================
   NOTIFICATION ICON
========================================================= */

function getNotificationIcon(type) {

    if (type === "payment") {
        return "₦";
    }

    if (type === "success") {
        return "✓";
    }

    if (type === "warning") {
        return "!";
    }

    return "i";

}


/* =========================================================
   NOTIFICATION CLASS
========================================================= */

function getNotificationIconClass(type) {

    if (type === "payment") {
        return "payment-icon";
    }

    if (type === "success") {
        return "success-icon";
    }

    if (type === "warning") {
        return "payment-icon";
    }

    return "info-icon";

}


/* =========================================================
   RENDER NOTIFICATIONS
========================================================= */

function renderNotifications() {

    if (!notificationList) {
        return;
    }


    notificationList.innerHTML = "";


    if (notifications.length === 0) {

        notificationList.style.display =
            "none";

        if (notificationEmpty) {

            notificationEmpty.style.display =
                "block";

        }

        updateNotificationCount();

        return;

    }


    notificationList.style.display =
        "flex";


    if (notificationEmpty) {

        notificationEmpty.style.display =
            "none";

    }


    notifications.forEach(
        (notification, index) => {

            const article =
                document.createElement("article");


            article.className =
                "notification-item";


            if (!notification.read) {

                article.classList.add("unread");

            }


            article.dataset.notificationId =
                notification.id;


            const statusHTML =
                notification.status
                    ? `
                        <span class="notification-status ${
                            notification.type === "success"
                                ? "verified-status"
                                : "pending-status"
                        }">
                            ${notification.status}
                        </span>
                    `
                    : "";


            const unreadDot =
                notification.read
                    ? ""
                    : `
                        <span class="unread-dot"></span>
                    `;


            article.innerHTML = `

                <div class="notification-icon ${getNotificationIconClass(notification.type)}">
                    ${getNotificationIcon(notification.type)}
                </div>

                <div class="notification-content">

                    <div class="notification-top">

                        <h3>
                            ${notification.title}
                        </h3>

                        <span class="notification-time">
                            ${notification.time}
                        </span>

                    </div>

                    <p>
                        ${notification.message}
                    </p>

                    ${statusHTML}

                </div>

                ${unreadDot}

            `;


            article.addEventListener(
                "click",
                () => {

                    markNotificationAsRead(
                        notification.id
                    );

                }
            );


            notificationList.appendChild(article);

        }
    );


    updateNotificationCount();

}


/* =========================================================
   MARK SINGLE NOTIFICATION AS READ
========================================================= */

function markNotificationAsRead(id) {

    const notification =
        notifications.find(
            item => item.id === id
        );


    if (!notification) {
        return;
    }


    notification.read = true;


    renderNotifications();

}


/* =========================================================
   MARK ALL AS READ
========================================================= */

if (markAllReadBtn) {

    markAllReadBtn.addEventListener(
        "click",
        () => {

            notifications =
                notifications.map(
                    notification => ({
                        ...notification,
                        read: true
                    })
                );


            renderNotifications();

        }
    );

}


/* =========================================================
   INITIALIZE NOTIFICATIONS
========================================================= */

renderNotifications();