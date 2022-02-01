

//To fetch States
fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`, {
  cache: "no-store",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendStateData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
function appendStateData(data) {
  var mainContainer = document.getElementById("state");
  for (var i = 0; i < data.states.length; i++) {
    var optionContainer = document.createElement("option");
    optionContainer.value = data.states[i].state_id;
    optionContainer.innerHTML = data.states[i].state_name;
    mainContainer.appendChild(optionContainer);
  }
}

//To get total cases of different states & India
function getTotalCases() {
  fetch(`https://api.rootnet.in/covid19-in/stats/latest`, {
    cache: "no-store",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getTotalCase(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });

  function getTotalCase(data) {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    var a = data.data.regional.length;
    var getState = document.getElementById("state");
    var getStateName = getState.options[getState.selectedIndex].text;
    if (getStateName === "India") {
      document.getElementById("confirmed").innerHTML = numberWithCommas(
        data.data.summary.total
      );
      document.getElementById("active").innerHTML = numberWithCommas(
        data.data.summary.total -
          (data.data.summary.discharged +
            data.data.summary.deaths)
      );
      document.getElementById("recovered").innerHTML = numberWithCommas(
        data.data.summary.discharged
      );
      document.getElementById("death").innerHTML = numberWithCommas(
        data.data.summary.deaths
      );

      var day = ["today"];
      var confirmed = [];
      var active = [];
      var discharged = [];
      var death = [];
        
    // for (var i = 0; i < data.data.summary.length; i++) {
      //   confirmed.push(data.data[i].summary.total);
      //   active.push(
      //     data.data[i].summary.total -
      //       (data.data[i].summary.discharged + data.data[i].summary.deaths)
      //   );
      //   discharged.push(data.data[i].summary.discharged);
      //   death.push(data.data[i].summary.deaths);
      // }
      
      confirmed.push(data.data.summary.total);
      active.push(
        data.data.summary.total - (data.data.summary.discharged + data.data.summary.deaths))
      discharged.push(data.data.summary.discharged);
      death.push(data.data.summary.deaths);
      
      graph(day, confirmed, active, discharged, death);
    }
    else if (
      getStateName === "Dadra and Nagar Haveli" ||
      getStateName === "Daman and Diu"
    ) {
      document.getElementById("confirmed").innerHTML = numberWithCommas(
        data.data.regional[7].totalConfirmed
      );
      document.getElementById("active").innerHTML = numberWithCommas(
        data.data.regional[7].totalConfirmed -
          (data.data.regional[7].discharged +
            data.data.regional[7].deaths)
      );
      document.getElementById("recovered").innerHTML = numberWithCommas(
        data.data.regional[7].discharged
      );
      document.getElementById("death").innerHTML = numberWithCommas(
        data.data.regional[7].deaths
      );

      var day = ["today"];
      var confirmed = [];
      var active = [];
      var discharged = [];
      var death = [];
      console.log('val',data.data.regional.length);
      
        for (var k = 0; k < data.data.regional.length; k++) {
          if (
            data.data.regional[k].loc ===
            "Dadra and Nagar Haveli and Daman and Diu"
          ) {
            confirmed.push(data.data.regional[k].totalConfirmed);
            active.push(
              data.data.regional[k].totalConfirmed -
                (data.data.regional[k].discharged +
                  data.data.regional[k].deaths)
            );
            discharged.push(data.data.regional[k].discharged);
            death.push(data.data.regional[k].deaths);
          }
        }
      
      graph(day, confirmed, active, discharged, death);
    } else {
      for (var i = 0; i < a; i++) {
        var stateName = data.data.regional[i].loc;
        if (getStateName === stateName) {
          document.getElementById("confirmed").innerHTML = numberWithCommas(
            data.data.regional[i].totalConfirmed
          );
          document.getElementById("active").innerHTML = numberWithCommas(
            data.data.regional[i].totalConfirmed -
              (data.data.regional[i].discharged +
                data.data.regional[i].deaths)
          );
          document.getElementById("recovered").innerHTML = numberWithCommas(
            data.data.regional[i].discharged
          );
          document.getElementById("death").innerHTML = numberWithCommas(
            data.data.regional[i].deaths
          );
          
          var day = ["today"];
          var confirmed = [];
          var active = [];
          var discharged = [];
          var death = [];
          
            for (var k = 0; k < data.data.regional.length; k++) {
              if (data.data.regional[k].loc === getStateName) {
                
                confirmed.push(data.data.regional[k].totalConfirmed);
                active.push(
                  data.data.regional[k].totalConfirmed -
                    (data.data.regional[k].discharged +
                      data.data.regional[k].deaths)
                );
                discharged.push(data.data.regional[k].discharged);
                death.push(data.data.regional[k].deaths);
              }
            
          }
          graph(day, confirmed, active, discharged, death);
        }
      }
    }
  }
}

function graph(a, b, c, d, e) {
  const labels = a;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Confirmed",
        backgroundColor: "rgb(216, 46, 47)",
        borderColor: "rgb(216, 46, 47)",
        data: b,
      },
      {
        label: "Active",
        backgroundColor: "rgb(18, 176, 232)",
        borderColor: "rgb(18, 176, 232)",
        data: c,
      },
      {
        label: "Recovered",
        backgroundColor: "rgb(30, 182, 84)",
        borderColor: "rgb(30, 182, 84)",
        data: d,
      },
      {
        label: "Death",
        backgroundColor: "rgb(117, 130, 131)",
        borderColor: "rgb(117, 130, 131)",
        data: e,
      },
    ],
  };

  const config = {
    type: "bar",
    data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Covid-Analytic",
        },
      },
    },
  };

  $("#myChartContainer").empty();
  var mainContainer = document.getElementById("myChartContainer");
  var chartCanvas = document.createElement("canvas");
  chartCanvas.id = "myChart";
  mainContainer.appendChild(chartCanvas);
  var myChart = new Chart(document.getElementById("myChart"), config);
}
console.log('Covid-19_Analytics by S.T Akhil Kumar\n**happy service');
getTotalCases();