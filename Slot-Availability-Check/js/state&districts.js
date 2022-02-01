//To fetch States
fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`, {
  cache: "no-store",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
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

//To fetch Districts
function getDistrictData() {
  $("#district").empty();
  var getStateID = document.getElementById("state").value;
  console.log(getStateID);
  fetch(
    `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${getStateID}`,
    {
      cache: "no-store",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      appendDistrictData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
  function appendDistrictData(data) {
    var mainContainer = document.getElementById("district");
    for (var i = 0; i < data.districts.length; i++) {
      var optionContainer = document.createElement("option");
      optionContainer.value = data.districts[i].district_id;
      optionContainer.innerHTML = data.districts[i].district_name;
      mainContainer.appendChild(optionContainer);
    }
  }
}
