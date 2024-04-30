$("#middle").hide();
function removeOldData() {
  $("tr:not(:first-child)").remove();
  $(".the-root").empty();
  $(".the-root").text("The Root = ");
}
$("#btn").click(function () {
  var formula = $("#equation").val();
  function convert() {
    if (!formula) return;
    while (formula.includes("^")) {
      formula = formula.replace("^", "**");
    }
  }
  function roundTo(num, places) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  }
  function convertX(expression, X) {
    if (!expression) return;
    while (expression.includes("x")) {
      expression = expression.replace("x", "*" + Number(X));
    }
    return expression;
  }
  function f(x) {
    convert();
    var expression = formula;
    var compile = convertX(expression, x);
    return eval(compile);
  }
  var xiMinus1 = parseFloat($("#xl").val());
  var xi = parseFloat($("#xu").val());
  console.log(xi);
  var esp = parseFloat($("#esp").val());
  console.log(esp);
  function secant(xiMinus1, xi,esp=0.1) {
    var iter = 0,
      error = 0,
      xiOld = 0;
    do {
      xiOld = xi;
      xi = roundTo(xi - (f(xi) * (xiMinus1 - xi)) / (f(xiMinus1) - f(xi)), 3);
      if (iter == 0) {
        removeOldData();
        $(".table").append(
          "<tr><td>" +
            iter +
            "</td><td>" +
            roundTo(xiMinus1, 3) +
            "</td><td>" +
            roundTo(f(xiMinus1), 3) +
            "</td><td>" +
            roundTo(xiOld, 3) +
            "</td><td>" +
            roundTo(f(xiOld), 3) +
            "</td><td>" +
            "----" +
            "</td></tr>"
        );
        // $(".table").append(
        //   "<tr><td>" +
        //     iter +
        //     "</td><td>" +
        //     roundTo(xiMinus1, 3) +
        //     "</td><td>" +
        //     roundTo(f(xiMinus1), 3) +
        //     "</td><td>" +
        //     roundTo(xi, 3) +
        //     "</td><td>" +
        //     roundTo(f(xi), 3) +
        //     "</td><td>" +
        //     "----" +
        //     "</td></tr>"
        // );
      } else {
        error = Math.abs(((xiOld-xiMinus1) / xi) * 100);
        // error = Math.abs(((xi - xiOld) / xi) * 100);
        $(".table").append(
          "<tr><td>" +
            iter +
            "</td><td>" +
            roundTo(xiMinus1, 3) +
            "</td><td>" +
            roundTo(f(xiMinus1), 3) +
            "</td><td>" +
            roundTo(xiOld, 3) +
            "</td><td>" +
            roundTo(f(xiOld), 3) +
            "</td><td>" +
            roundTo(error, 3) +
            "</td></tr>"
        );
        // $(".table").append(
        //   "<tr><td>" +
        //     iter +
        //     "</td><td>" +
        //     roundTo(xiMinus1, 3) +
        //     "</td><td>" +
        //     roundTo(f(xiMinus1), 3) +
        //     "</td><td>" +
        //     roundTo(xi, 3) +
        //     "</td><td>" +
        //     roundTo(f(xi), 3) +
        //     "</td><td>" +
        //     roundTo(error, 3) +
        //     "</td></tr>"
        // );
      }
      xiMinus1=xiOld;
      iter++;
    } while (error > esp || iter == 1);
    return xiMinus1;
  }
 
    var root = secant(xiMinus1, xi, esp);
    $(".the-root").append(roundTo(root, 3));
    console.log(root);
    $("#middle").show();
  
});
$("#clear").click(function () {
  // $('#middle').slideUp(3000);
  $("#middle").hide();
  $("#equation").val("");
  $("#xl").val("");
  $("#xi").val("");
  $("#esp").val("");
  // await sleep(3000);
  removeOldData();
});
