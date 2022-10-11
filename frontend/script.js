const $ = document.querySelector.bind(document);

/* ---------------------------- main function ---------------------------- */
const getProductivity = () => {
  const request = new XMLHttpRequest();

  request.open("GET", "/data");
  request.send();
  request.onload = function () {
    const data = JSON.parse(request.responseText);

    const criticalLevel = 0.8;
    const plotName = "plot-workload";
    const plotElement = $("." + plotName);
    const plotFill = plotElement.getElementsByClassName("plot-fill");
    const textElement = document.getElementsByClassName("text-message");

    // if data is undefined or null, display error message
    if (!data) {
      showMessage(textElement, "🛠️ We encountered an error. Please come back later. 🛠️");
      document.querySelector(".text-message").setAttribute("role", "alert");
    };

    updatePlot(plotFill, data);
    textElement[0].innerText = " ";
    document.querySelector(".text-message").removeAttribute("role", "alert");
    document.querySelector(".plot-value").style.display = "flex";

    // if workload is less than 10% ---> not enough space to display the value inside the bar:
    if (data.productivity < 0.1) {
      document.querySelector(".plot-value").style.display = "none";
    };

    // if workload exceeds the critical level of 80%:
    if (data.productivity > criticalLevel) {
      displayWarning(textElement, plotFill, data, criticalLevel);
    };

  };
};

/* ---------------------------- helper functions ---------------------------- */
function updatePlot(plotFill, data) {
  plotFill[0].style.background = "#c88c54";
  plotFill[0].style.width = `${(data.productivity * 100)}%`;
  plotFill[0].getElementsByClassName("plot-value")[0].textContent = `${Math.round(data.productivity * 100)}%`;
};

function displayWarning(textElement, plotFill, data, criticalLevel) {
  // display warning message
  showMessage(textElement, "⚠️ Warning : critical level exceeded ⚠️");
  document.querySelector(".text-message").setAttribute("role", "alert");

  // add different color to bar where critical level is exceeded
  const newCriticalLevel = criticalLevel / data.productivity;
  plotFill[0].style.background = `linear-gradient(to right, #c88c54 0%, #c88c54 ${newCriticalLevel * 100}% , #ffff00 100%)`;
  plotFill[0].getElementsByClassName("plot-value")[0].textContent = `${Math.round(data.productivity * 100)}%`
};

function showMessage(textElement, message) {
  textElement[0].innerText = message;
};

/* ---------------------------- call main function every 2 seconds ---------------------------- */
getProductivity();
setInterval(getProductivity, 2000);
