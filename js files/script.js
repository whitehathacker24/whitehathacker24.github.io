function calculate() {
  var input1 = parseFloat(document.getElementById("input1").value);
  var input2 = parseFloat(document.getElementById("input2").value);
  var operator = document.getElementById("operator").value;
  var result;

  switch (operator) {
    case "add":
      result = input1 + input2;
      break;
    case "subtract":
      result = input1 - input2;
      break;
    case "multiply":
      result = input1 * input2;
      break;
    case "divide":
      result = input1 / input2;
      break;
  }

  document.getElementById("result").value = result;
}
