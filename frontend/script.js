const $ = document.querySelector.bind(document);

/* ---------------------------- main function ---------------------------- */
const getProductivity = () => {
  const request = new XMLHttpRequest();

  request.open("GET", "/data");
  request.send();
  request.onload = function () {
    const data = JSON.parse(request.responseText);

    const highLevel = 0.8;
    const criticalLevel = 0.95;
    const plotName = "plot-workload";
    const plotElement = $("." + plotName);
    const plotFill = plotElement.getElementsByClassName("plot-fill");

    document.getElementById("cuppy-tired").classList.remove("cuppy-status-show");
    document.getElementById("cuppy-burnout").classList.remove("cuppy-status-show");


    // if data is undefined or null, display error message
    if (!data) {
      document.getElementById("cuppy-disconnected").classList.add("cuppy-status-show");
    } else {
      updatePlot(plotFill, data);
      document.querySelector(".plot-value").style.display = "flex";
    }

    // if workload is less than 10% ---> not enough space to display the value inside the bar:
    if (data.productivity < 0.1) {
      document.querySelector(".plot-value").style.display = "none";
    };

    // if workload exceeds the high level of 80%:
    if (data.productivity >= highLevel && data.productivity < criticalLevel) {
      displayWarningHigh(plotFill, data, highLevel);
    };

    // if workload exceeds the critical level of 95%:
    if (data.productivity >= criticalLevel) {
      displayWarningCritical(plotFill, data, highLevel, criticalLevel);
    };

  };
};

/* ---------------------------- helper functions ---------------------------- */
function updatePlot(plotFill, data) {
  document.getElementById("cuppy-happy").classList.add("cuppy-status-show");
  plotFill[0].style.background = "#a36730";
  plotFill[0].style.width = `${(data.productivity * 100)}%`;
  plotFill[0].getElementsByClassName("plot-value")[0].textContent = `${Math.round(data.productivity * 100)}%`;
};

function displayWarningHigh(plotFill, data, highLevel) {
  // add different color to bar where high level is exceeded
  document.getElementById("cuppy-happy").classList.remove("cuppy-status-show");
  document.getElementById("cuppy-tired").classList.add("cuppy-status-show");
  const newHighLevel = highLevel / data.productivity;
  plotFill[0].style.background = `linear-gradient(to right, #a36730 0%, #a36730 ${newHighLevel * 100}%, #ffff00 100%)`;
  plotFill[0].getElementsByClassName("plot-value")[0].textContent = `${Math.round(data.productivity * 100)}%`
};

function displayWarningCritical(plotFill, data, highLevel, criticalLevel) {
  // add different color to bar where critical level is exceeded
  document.getElementById("cuppy-happy").classList.remove("cuppy-status-show");
  document.getElementById("cuppy-burnout").classList.add("cuppy-status-show");
  const newHighLevel = highLevel / data.productivity;
  const newCriticalLevel = criticalLevel / data.productivity;
  console.log(newHighLevel);
  plotFill[0].style.background = `linear-gradient(to right, #a36730 0%, #a36730 ${newHighLevel * 100}%)`;
  plotFill[0].style.background = `linear-gradient(to right, #a36730 ${newHighLevel * 100}%, #ffff00 ${newCriticalLevel * 100}%, #d40000 100%)`;
  plotFill[0].getElementsByClassName("plot-value")[0].textContent = `${Math.round(data.productivity * 100)}%`
};

/* ---------------------------- call main function every 2 seconds ---------------------------- */
getProductivity();
setInterval(getProductivity, 2000);
