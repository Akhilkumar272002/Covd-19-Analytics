//To fetch Slots available!

function getAvailableSlots() {
  event.preventDefault();
  $("#filterFeeType option").prop("selected", function () {
    return this.defaultSelected;
  });
  $("#filterVaccineType option").prop("selected", function () {
    return this.defaultSelected;
  });
  var a = document.getElementById("DateVaccinationSlot").value;
  var day = a.slice(8, 10);
  var month = a.slice(5, 7);
  var year = a.slice(0, 4);
  var b = document.getElementById("district").value;
  var c = document.getElementById("dose").value;
  fetch(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${b}&date=${day}-${month}-${year}`,
    { cache: "no-store" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
  function appendData(data) {
    $("#tableBody").empty();
    var mainContainer = document.getElementById("tableBody");
    if (data.sessions.length == 0) {
      $("#noslots").empty();
      var noslots = document.getElementById("noslots");
      var noslotimg = document.createElement("img");
      noslotimg.src = "./Images/noSlots.svg";
      noslotimg.className = "noSlotImg";
      noslots.appendChild(noslotimg);
      var noslotmessage = document.createElement("p");
      noslotmessage.id = "noSlotAvailable";
      noslotmessage.innerHTML =
        "Sorry, Currently No Slots available for your prefered date!";
      noslots.appendChild(noslotmessage);
    } else {
      $("#noslots").empty();
      var emptySlot = [];
      for (var i = 0; i < data.sessions.length; i++) {
        if (c == "dose1") {
          emptySlot.push(data.sessions[i].available_capacity_dose1);
        }
        if (c == "dose2") {
          emptySlot.push(data.sessions[i].available_capacity_dose2);
        }
        if (c == "dose1" && data.sessions[i].available_capacity_dose1 > 0) {
          var trContainer = document.createElement("tr");
          trContainer.className = "rowsElement";
          var tdContainer1 = document.createElement("td");
          tdContainer1.innerHTML = data.sessions[i].name;
          trContainer.appendChild(tdContainer1);
          var tdContainer2 = document.createElement("td");
          tdContainer2.innerHTML = data.sessions[i].available_capacity_dose1;
          trContainer.appendChild(tdContainer2);
          var tdContainer3 = document.createElement("td");
          if (data.sessions[i].fee_type == "Free") {
            var tdContainer3Badge = document.createElement("span");
            tdContainer3Badge.className = "badge badge-success";
            tdContainer3Badge.innerHTML = data.sessions[i].fee_type;
            tdContainer3.appendChild(tdContainer3Badge);
          } else {
            var tdContainer3Badge = document.createElement("span");
            tdContainer3Badge.className = "badge badge-danger";
            tdContainer3Badge.innerHTML = data.sessions[i].fee_type;
            tdContainer3.appendChild(tdContainer3Badge);
          }
          tdContainer3.className = "term";
          trContainer.appendChild(tdContainer3);
          var tdContainer4 = document.createElement("td");
          tdContainer4.innerHTML = data.sessions[i].fee;
          trContainer.appendChild(tdContainer4);
          var tdContainer5 = document.createElement("td");
          tdContainer5.className = "term2";
          tdContainer5.innerHTML = data.sessions[i].vaccine;
          trContainer.appendChild(tdContainer5);
          mainContainer.appendChild(trContainer);
        } else if (
          c == "dose2" &&
          data.sessions[i].available_capacity_dose2 > 0
        ) {
          var trContainer = document.createElement("tr");
          trContainer.className = "rowsElement";
          var tdContainer1 = document.createElement("td");
          tdContainer1.innerHTML = data.sessions[i].name;
          trContainer.appendChild(tdContainer1);
          var tdContainer2 = document.createElement("td");
          tdContainer2.innerHTML = data.sessions[i].available_capacity_dose2;
          trContainer.appendChild(tdContainer2);
          var tdContainer3 = document.createElement("td");
          if (data.sessions[i].fee_type == "Free") {
            var tdContainer3Badge = document.createElement("span");
            tdContainer3Badge.className = "badge badge-success";
            tdContainer3Badge.innerHTML = data.sessions[i].fee_type;
            tdContainer3.appendChild(tdContainer3Badge);
          } else {
            var tdContainer3Badge = document.createElement("span");
            tdContainer3Badge.className = "badge badge-danger";
            tdContainer3Badge.innerHTML = data.sessions[i].fee_type;
            tdContainer3.appendChild(tdContainer3Badge);
          }
          tdContainer3.className = "term";
          trContainer.appendChild(tdContainer3);
          var tdContainer4 = document.createElement("td");
          tdContainer4.innerHTML = data.sessions[i].fee;
          trContainer.appendChild(tdContainer4);
          var tdContainer5 = document.createElement("td");
          tdContainer5.className = "term2";
          tdContainer5.innerHTML = data.sessions[i].vaccine;
          trContainer.appendChild(tdContainer5);
          mainContainer.appendChild(trContainer);
        }
      }
      if (Math.max(...emptySlot) == 0) {
        console.log(emptySlot);
        $("#noslots").empty();
        var noslots = document.getElementById("noslots");
        var noslotimg = document.createElement("img");
        noslotimg.src = "./Images/noSlots.svg";
        noslotimg.className = "noSlotImg";
        noslots.appendChild(noslotimg);
        var noslotmessage = document.createElement("p");
        noslotmessage.id = "noSlotAvailable";
        noslotmessage.innerHTML =
          "Sorry, Currently No Slots available for your prefered date!";
        noslots.appendChild(noslotmessage);
      }
    }
  }
}
