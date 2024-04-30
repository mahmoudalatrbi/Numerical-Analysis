$("#middle").hide();
function removeOldData() {
  $("tr:not(:first-child)").remove();
  $(".the-root").empty();
  $(".the-root").text("The Root = ");
}
$("#btn").click(function () {
  var formula = $("#equation").val();
  // alert(formula);
  function convertVal(val) {
    if (!val) return;
    while (val.includes("^")) {
      val = val.replace("^", "**");
    }
    // alert(val);
    return val;
  }
  function convert() {
    if (!formula) return;
    while (formula.includes("^")) {
      formula = formula.replace("^", "**");
    }
  }
  function roundTo(num, places) {
    const factor = 10 ** places;
    return math.round(num * factor) / factor;
  }
  function convertX(expression, X) {
    if (!expression) return;
    while (expression.includes("x")) {
      expression = expression.replace("x", "*" + Number(X));
    }
    return expression;
  }
  function convertXAndNumber(expression, X) {
    if (!expression) return;
    while (expression.includes("x")) {
      expression = expression.replace("x", Number(X));
    }
    return expression;
  }
  function f(x) {
    convert();
    var expression = formula;
    var compile = convertX(expression, x);
    return eval(compile);
  }
  function fDash(x) {
    let xDash = formula;
    // let scop ={x:Number(x)};
    while (xDash.includes("**")) xDash = xDash.replace("**", "^");
    // alert(xDash);
    var derv = math.derivative(xDash, "x");
    // alert(derv);
    // return roundTo(Parser.parse(derv).evaluate(scop),3);
    var expression = convertVal(derv.toString());
    // alert(expression);
    expression = convertXAndNumber(expression, x);
    return roundTo(eval(expression), 3);
  }
  var xi = parseFloat($("#xi").val());
  var esp = parseFloat($("#esp").val());
  // alert(esp);
  function newton(xi, eps = 0.1) {
    var iter = 0,
      error = 0,
      xiOld = 0;
    do {
      xiOld = xi;
      if (iter == 0) {
        removeOldData();
        // alert(xi);
        // alert(f(xi));
        // alert(fDash(xi));
        $(".table").append(
          "<tr><td>" +
            iter +
            "</td><td>" +
            roundTo(xi, 3) +
            "</td><td>" +
            roundTo(f(xi), 3) +
            "</td><td>" +
            roundTo(fDash(xi), 3) +
            "</td><td>" +
            "----" +
            "</td></tr>"
        );
        // alert("create row of table 1");
      } else {
        // alert(iter);
        xi = roundTo(xi - f(xi) / fDash(xi), 3);
        error = math.abs(((xi - xiOld) / xi) * 100);
        // alert("abs is true ");
        $(".table").append(
          "<tr><td>" +
            iter +
            "</td><td>" +
            roundTo(xi, 3) +
            "</td><td>" +
            roundTo(f(xi), 3) +
            "</td><td>" +
            roundTo(fDash(xi), 3) +
            "</td><td>" +
            roundTo(error, 3) +
            "</td></tr>"
        );
        // alert("create row of table");
      }
      iter++;
    } while (error > eps || iter == 1);
    return xi;
  }
  var root = newton(xi, esp);
  $(".the-root").append(roundTo(root, 3));
  // $('#middle').slideDown(3000);
  $("#middle").show();
});
$("#clear").click(function () {
  // $('#middle').slideUp(3000);
  $("#middle").hide();
  $("#equation").val("");
  $("#xi").val("");
  $("#esp").val("");
  // await sleep(3000);
  removeOldData();
});
