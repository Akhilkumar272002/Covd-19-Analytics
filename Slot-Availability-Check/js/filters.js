//Filter
function filter() {
  $(".rowsElement").show();
  var fee = $("#filterFeeType").val();
  var vaccine = $("#filterVaccineType").val();
  var table = document.getElementById("tableBody");
  var tableRow = table.getElementsByTagName("tr");
  if (
    (fee === "Paid" && vaccine === "COVAXIN") ||
    (fee === "Free" && vaccine === "COVAXIN") ||
    (fee === "Paid" && vaccine === "COVISHIELD") ||
    (fee === "Free" && vaccine === "COVISHIELD") ||
    (fee === "Paid" && vaccine === "SPUTNIK V") ||
    (fee === "Free" && vaccine === "SPUTNIK V")
  ) {
    for (var i = 0; i < tableRow.length; i++) {
      var a = tableRow[i].getElementsByClassName("term")[0].outerText;
      var b = tableRow[i].getElementsByClassName("term2")[0].outerText;
      if (
        (a != fee && b != vaccine) ||
        (a === fee && b != vaccine) ||
        (a != fee && b === vaccine)
      ) {
        tableRow[i].style.display = "none";
      }
    }
  } else if (fee === "all" && vaccine === "all") {
    $(".rowsElement").show();
  } else if (
    (fee === "all" && vaccine === "COVAXIN") ||
    (fee === "all" && vaccine === "COVISHIELD") ||
    (fee === "all" && vaccine === "SPUTNIK V")
  ) {
    for (var i = 0; i < tableRow.length; i++) {
      var a = tableRow[i].getElementsByClassName("term")[0].outerText;
      var b = tableRow[i].getElementsByClassName("term2")[0].outerText;
      if (b != vaccine) {
        tableRow[i].style.display = "none";
      }
    }
  } else if (
    (fee === "Free" && vaccine === "all") ||
    (fee === "Paid" && vaccine === "all")
  ) {
    for (var i = 0; i < tableRow.length; i++) {
      var a = tableRow[i].getElementsByClassName("term")[0].outerText;
      var b = tableRow[i].getElementsByClassName("term2")[0].outerText;
      if (a != fee) {
        tableRow[i].style.display = "none";
      }
    }
  } else if (
    vaccine === "COVAXIN" ||
    vaccine === "COVISHIELD" ||
    vaccine === "SPUTNIK V"
  ) {
    for (var i = 0; i < tableRow.length; i++) {
      var b = tableRow[i].getElementsByClassName("term2")[0].outerText;
      if (b != vaccine) {
        tableRow[i].style.display = "none";
      }
    }
  } else if (fee === "Free" || fee === "Paid") {
    for (var i = 0; i < tableRow.length; i++) {
      var a = tableRow[i].getElementsByClassName("term")[0].outerText;
      if (a != fee) {
        tableRow[i].style.display = "none";
      }
    }
  }
}
