document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("answer").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();  // Prevent default behavior (new line or form 
      input();  // Ensure this calls your main logic function
    }
  });
});
function input2() {
  localStorage.clear();
  console.log("Local storage cleared.");
  alert("E");
}
function stufff(){
  alert("e");
}
const mathsymbols = /[+\-*/Ω√∫]/; // Regular expression to check for math symbols
const list = ["triangle", "square", "rectangle", "prop", "circle", "sphere", "cylinder"]; // List of shape keywords

function input() {
  const Question2 = document.getElementById("question").value;
  const Answer2 = document.getElementById("answer").value;
  const Question = Question2.toLowerCase().trim();
  const Answer = Answer2
  const textBox = document.getElementById("text_box");
  // Check localStorage
  if (localStorage.getItem(Question) !== null) {
    textBox.innerHTML = localStorage.getItem(Question);
    return;
  }else{
    textBox.innerHTML = "Please Provide an Answer"
  }

  // Store answer if provided
  if (Answer !== "") {
    localStorage.setItem(Question, Answer);
    textBox.innerHTML = "Answer stored.";
    return;
  }

  // Check for shapes
  if (list.some(word => Question.includes(word))) {
    const splitQuestion = Question.split(" ");
    const shape = splitQuestion[0];

    if (shape === "triangle") {
      const base = parseFloat(splitQuestion[1]);
      const height = parseFloat(splitQuestion[2]);
      if (!isNaN(base) && !isNaN(height)) {
        const area = 0.5 * base * height;
        textBox.innerHTML = `Area: ${area}`;
      } else {
        textBox.innerHTML = "Please provide valid numbers for base and height.";
      }

    } else if (shape === "square") {
      const side = parseFloat(splitQuestion[1]);
      if (!isNaN(side)) {
        const area = side * side;
        textBox.innerHTML = `Area: ${area}`;
      } else {
        textBox.innerHTML = "Please provide a valid number for the side.";
      }

    } else if (shape === "rectangle") {
      const base = parseFloat(splitQuestion[1]);
      const height = parseFloat(splitQuestion[2]);
      if (!isNaN(base) && !isNaN(height)) {
        const area = base * height;
        textBox.innerHTML = `Area: ${area}`;
      } else {
        textBox.innerHTML = "Please provide valid numbers for base and height.";
      }

    } else if (shape === "circle") {
      const radius = parseFloat(splitQuestion[1]);
      if (!isNaN(radius)) {
        const area = Math.PI * radius * radius;
        textBox.innerHTML = `Area: ${area}`;
      } else {
        textBox.innerHTML = "Please provide a valid radius.";
      }

    } else if (shape === "sphere") {
      const radius = parseFloat(splitQuestion[1]);
      if (!isNaN(radius)) {
        const choice = prompt("Volume[1] or Surface Area[2]");
        let result = 0;
        if (choice === "1") {
          result = (4 / 3) * Math.PI * Math.pow(radius, 3);
          textBox.innerHTML = `Volume: ${result}`;
        } else if (choice === "2") {
          result = 4 * Math.PI * Math.pow(radius, 2);
          textBox.innerHTML = `Surface Area: ${result}`;
        } else {
          textBox.innerHTML = "Invalid selection.";
        }
      } else {
        textBox.innerHTML = "Please provide a valid radius.";
      }

    } else if (shape === "cylinder") {
      const radius = parseFloat(splitQuestion[1]);
      const height = parseFloat(splitQuestion[2]);
      if (!isNaN(radius) && !isNaN(height)) {
        const choice = prompt("Volume[1], Surface Area[2], or Lateral Surface Area[3]");
        let result = 0;
        if (choice === "1") {
          result = Math.PI * radius * radius * height;
          textBox.innerHTML = `Volume: ${result}`;
        } else if (choice === "2") {
          result = 2 * Math.PI * radius * (height + radius);
          textBox.innerHTML = `Surface Area: ${result}`;
        } else if (choice === "3") {
          result = 2 * Math.PI * radius * height;
          textBox.innerHTML = `Lateral Surface Area: ${result}`;
        } else {
          textBox.innerHTML = "Invalid selection.";
        }
      } else {
        textBox.innerHTML = "Please provide valid radius and height.";
      }

    } else if (shape === "prop") {
      const first_one = splitQuestion[1].split("/");
      const second_one = splitQuestion[2].split("/");
      const stuff = prompt("Normal[1] or x+4 something");
      const special = first_one[0].split("+");
      const special2 = first_one[1].split("+");
      const special3 = second_one[0].split("+");
      const special4 = second_one[1].split("+");
      let sum;
      let sum1;
      let sum2;
      let sum3;
      if (stuff === "1"){
        if (first_one[0] === "x") {
          sum = parseInt(first_one[1]) * parseInt(second_one[0]) / parseInt(second_one[1]);
        } else if (first_one[1] === "x") {
          sum = parseInt(first_one[0]) * parseInt(second_one[1]) / parseInt(second_one[0]);
        } else if (second_one[0] === "x") {
          sum = parseInt(second_one[1]) * parseInt(first_one[0]) / parseInt(first_one[1]);
        } else if (second_one[1] === "x") {
          sum = parseInt(second_one[0]) * parseInt(first_one[1]) / parseInt(first_one[0]);
        } else {
          sum = "Invalid proportion format.";
        }
      textBox.innerHTML = "The Answer is " + sum;
    }else if(stuff ==="2"){
      if(special[0] ==="x"){
        sum3 = parseInt(first_one[1]) * parseInt(second_one[0]);
        sum2 = parseInt(special[1])*parseInt(second_one[1]);
        sum1 = parseInt(sum3)-parseInt(sum2);
        sum = sum1/parseInt(second_one[1]);
        textBox.innerHTML = "Answer: " + sum;
      }else if(special2[0]==="x"){
        sum3 = parseInt(first_one[0])* parseInt(second_one[1]);
        sum2 = parseInt(special2[1])*parseInt(second_one[0]);
        sum1 = parseInt(sum3) - parseInt(sum2)

        sum = sum1/parseInt(second_one[0])
        textBox.innerHTML = "Answer: " + sum;
        }
      }
    }
  }else if (/^[0-9+\-*/().\s^√∫Ω]+$/.test(Question)) {
  try {
    const result = Function(`"use strict"; return (${Question})`)();
    textBox.innerHTML = `Result: ${result}`;
    return;
  } catch {
    textBox.innerHTML = "Invalid math expression.";
    return;
  }
}
}
document.getElementById("question").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent newline if it's a textarea
    input();  // Call the input function
  }
});