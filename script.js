// Code For Active or NonActive Tab Diffrencition
let tabIndexTitleEl = document.querySelectorAll(
  ".step-toggle__index, .step-toggle__title"
);

tabIndexTitleEl.forEach((tabElement) => {
  if (
    tabElement.classList.contains("one") ||
    tabElement.classList.contains("two") ||
    tabElement.classList.contains("three")
  ) {
    tabElement.style.opacity = 1;
  } else {
    tabElement.style.opacity = 0.4;
  }
});
console.log(tabIndexTitleEl);
// Code End

// tab
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".toggles__item");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all tabs
      tabs.forEach((item) => item.classList.remove("toggles__item--active"));

      // Hide all tab contents
      tabContents.forEach((content) =>
        content.classList.remove("tab-content--active")
      );

      // Add active class to the clicked tab
      tab.classList.add("toggles__item--active");

      // Show the corresponding tab content
      const tabContent = document.getElementById(tab.dataset.tab);
      if (tabContent) {
        tabContent.classList.add("tab-content--active");
      }
    });
  });
});

// calender
document.addEventListener("DOMContentLoaded", function () {
  const datepickers = document.querySelectorAll(".datepicker");

  datepickers.forEach(function (datepicker) {
    const input = datepicker.querySelector(".datepicker-input");
    const popup = datepicker.querySelector(".datepicker-popup");
    const daysContainer = popup.querySelector(".days");
    const monthSelect = popup.querySelector("#month-select");
    const yearSelect = popup.querySelector("#year-select");
    const prevMonth = popup.querySelector(".prev-month");
    const nextMonth = popup.querySelector(".next-month");

    // Generate months and years for select dropdowns
    function generateMonths() {
      const months = [
        { value: 0, name: "January" },
        { value: 1, name: "February" },
        { value: 2, name: "March" },
        { value: 3, name: "April" },
        { value: 4, name: "May" },
        { value: 5, name: "June" },
        { value: 6, name: "July" },
        { value: 7, name: "August" },
        { value: 8, name: "September" },
        { value: 9, name: "October" },
        { value: 10, name: "November" },
        { value: 11, name: "December" },
      ];

      months.forEach((month) => {
        const option = document.createElement("option");
        option.value = month.value;
        option.textContent = month.name;
        monthSelect.appendChild(option);
      });
    }

    function generateYears() {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 100; // Show 100 years in the past
      const endYear = currentYear + 100; // Show 100 years in the future

      for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      }
    }

    // Function to generate days in a month
    function generateDays(year, month) {
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month
      const firstDay = new Date(year, month, 1).getDay(); // Get first day of the month (0-6, where 0 is Sunday)

      // Clear previous days
      daysContainer.innerHTML = "";

      // Set month and year in header
      monthSelect.value = month.toString();
      yearSelect.value = year.toString();

      // Update month and year text in header
      const monthText = monthSelect.options[month].textContent;
      const yearText = yearSelect.value;
      popup.querySelector(
        ".month-year"
      ).textContent = `${monthText} ${yearText}`;

      // Generate days buttons
      for (let i = 0; i < firstDay; i++) {
        const emptyButton = document.createElement("button");
        emptyButton.disabled = true;
        daysContainer.appendChild(emptyButton);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dayButton = document.createElement("button");
        dayButton.textContent = day;
        dayButton.addEventListener("click", function () {
          const selectedDate = new Date(year, month, day);
          input.value = formatDate(selectedDate);
          popup.style.display = "none";
        });
        daysContainer.appendChild(dayButton);
      }
    }

    // Function to format date as dd--mm-yyyy
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}--${month}--${year}`;
    }

    // Initialize date picker
    generateMonths();
    generateYears();

    // Event listeners
    input.addEventListener("click", function () {
      popup.style.display = "block";
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      generateDays(currentYear, currentMonth);
    });

    prevMonth.addEventListener("click", function () {
      let currentMonth = parseInt(monthSelect.value, 10);
      let currentYear = parseInt(yearSelect.value, 10);

      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear -= 1;
      } else {
        currentMonth -= 1;
      }

      generateDays(currentYear, currentMonth);
    });

    nextMonth.addEventListener("click", function () {
      let currentMonth = parseInt(monthSelect.value, 10);
      let currentYear = parseInt(yearSelect.value, 10);

      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear += 1;
      } else {
        currentMonth += 1;
      }

      generateDays(currentYear, currentMonth);
    });

    document.addEventListener("click", function (event) {
      if (!datepicker.contains(event.target) && event.target !== input) {
        popup.style.display = "none";
      }
    });
  });
});

// select time
document.addEventListener("DOMContentLoaded", function () {
  const selectWrappers = document.querySelectorAll(".custom-select-wrapper");

  selectWrappers.forEach((selectWrapper) => {
    const select = selectWrapper.querySelector(".custom-select");
    const options = selectWrapper.querySelector(".custom-select-options");

    const defaultOption = options.querySelector("div");
    const defaultText = defaultOption.textContent;
    const defaultTextNode = document.createTextNode(defaultText);

    // select.innerHTML = ""; // Clear existing content
    select.appendChild(defaultTextNode);

    select.addEventListener("click", function () {
      options.style.display =
        options.style.display === "block" ? "none" : "block";
    });

    options.querySelectorAll("div").forEach((option) => {
      option.addEventListener("click", function () {
        const displayText = this.textContent;
        const textNode = document.createTextNode(displayText);
        const img = document.createElement("img");
        img.setAttribute("src", "/images/time.svg");
        select.innerText = ""; // Clear existing content
        select.appendChild(img);
        select.appendChild(textNode);

        options.style.display = "none";
      });
    });
  });
});

// mega form popup

document.addEventListener("DOMContentLoaded", function () {
  var openFormButtons = document.querySelectorAll(".openFormButton");
  openFormButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelector(".overlay").style.display = "block";
      document.querySelector(".mega-form--border").style.display = "block";
    });
  });

  document.querySelector(".overlay").addEventListener("click", function () {
    this.style.display = "none";
    document.querySelector(".mega-form--border").style.display = "none";
  });
});

// repeat form

document.addEventListener("DOMContentLoaded", function () {
  var addButton = document.getElementById("add-destination");

  addButton.addEventListener("click", function () {
    var formsContainer = document.getElementById("forms-container");
    if (formsContainer) {
      var clonedContainer = formsContainer.cloneNode(true); // Clone the container and its content

      // Insert the cloned container after the original container
      formsContainer.insertAdjacentElement("afterend", clonedContainer);

      // Add event listener to the "Close" button in the cloned container
      var closeButton = clonedContainer.querySelector(
        ".small-circle-button--close"
      );
      if (closeButton) {
        closeButton.addEventListener("click", function () {
          clonedContainer.parentNode.removeChild(clonedContainer);
        });
      } else {
        console.error(
          "The close button was not found in the cloned container."
        );
      }
    } else {
      console.error("The element #forms-container was not found.");
    }
  });
});
