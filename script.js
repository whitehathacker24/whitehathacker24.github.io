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
  
}
function test(){
  alert("HI");
}
const mathsymbols = /[+\-*/Ω√∫]/; // Regular expression to check for math symbols
const list = ["triangle", "square", "rectangle", "prop", "circle", "sphere", "cylinder","ellipse","quad","poly", "cone"]; // List of shape keywords
function input() {
  const Question2 = document.getElementById("question").value;
  const Answer2 = document.getElementById("answer").value;
  const Question = Question2.toLowerCase().trim();
  const Answer = Answer2;
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
    }else if(shape =="poly"){
      const apothem = parseFloat(splitQuestion[1]);
      const perimeter = parseFloat(splitQuestion[2]);
      sum = apothem * perimeter * .5;
      textBox.innerHTML = "Result: "+ sum;
    } else if(shape ==="quad"){
      const a = parseFloat(splitQuestion[1]);
      const b = parseFloat(splitQuestion[2]);
      const c = parseFloat(splitQuestion[3]);
      const negb = b*-1;
      //top
      top4 = b**2;
      alert(top4);
      top3 = 4*a*c;
      alert(top3);
      top2 = top4 - top3;
      alert(top2);
      if (top2 < 0){
        top2 *= -1;
        alert(top2);
        top1 = Math.sqrt(top2);
        alert(top1);
        bottom = 2*a;
        //first solution
        sum2 = negb + top1;
        sum1_5 = sum2/bottom;
        sum1 = sum1_5 *=-1;
        //second solution
        sum4 = negb - top1;
        sum3_5 = sum4/bottom;
        sum3 = sum3_5 *=-1;
        textBox.innerHTML = "First Solution" + sum1 + " Second Solution" + sum3;
      }else{
        alert(top2);
        top1 = Math.sqrt(top2);
        alert(top1);
        //bottom
        bottom = 2*a;
        //first solution
        sum2 = negb + top1;
        sum1 = sum2/bottom;
        //second solution
        sum4 = negb - top1;
        sum3 = sum4/bottom;
        textBox.innerHTML = "First Solution" + sum1 + " Second Solution" + sum3;
    }
    }else if(shape ==="cone"){
      alert("HI");
      const inputsss = prompt("Surface Area[1], Lateral Surface Area[2], Volume[3], height[4], Radius[5]");
      const a = parseFloat(splitQuestion[1]);
      const b = parseFloat(splitQuestion[2]);
      const pie = Math.PI;
      if(inputsss === "1"){
        sum3_6 = b**2;
        sum3_5 = a**2;
        sum3_4 = sum3_6 + sum3_5;
        sum3 = Math.sqrt(sum3_4);
        sum2 = a + sum3;
        sum1 = pie * a * sum2
        textBox.innerHTML = "Solution "+ sum1;
      }else if(inputsss ==="2"){
        //πr √h2+r2
        sum4 = b**2;
        sum3 = a**2;
        sum2 = sum3 + sum4;
        sum2_5 = Math.sqrt(sum2);
        sum1 = pie * a * sum2_5;
        textBox.innerHTML = "Solution "+sum1;
      }else if(inputsss ==="3"){
        sum3 == a**2;
        sum3_5 = pie *sum3;
        sum2 = b/3;
        sum1 = sum3_5 * sum2;
        textBox.innerHTML = "Solution "+ sum1;
      }else if(inputsss ==="4"){
        sum4 = a **2;
        sum3 = pie * sum4;
        sum2 = b/sum3;
        sum1 = 3 * sum2;
        textBox.innerHTML = "Solution "+ sum1;
      }else if(inputsss ==="5"){
        sum8 = a**2;
        sum7 = pie *sum8;
        sum6 = 2*b;
        sum5 = sum7 + sum6;
        sum4 = sum5 * pie;
        sum3 = b**2;
        sum2 = sum3/sum4;
        sum1 = Math.sqrt(sum2);
        textBox.innerHTML = "Solution "+ sum1;
      }
      //πr(r+h2+r2)
    } else if(shape === "ellipse"){
      const a = parseFloat(splitQuestion[1]);
      const b = parseFloat(splitQuestion[2]);
      const pie = Math.PI;
      const inputsss = prompt("Area[1], Axis A[2], Axis B[3], Circumference[4]");
      if (inputsss ==="1"){
        area = a*b*pie;
        textBox.innerHTML = "Area: " + area;
      }else if(inputsss ==="2"){
        solution = a/pie*b;
        textBox.innerHTML = "Solution: " + solution;
      }else if(inputsss ==="3"){
        solution = a/pie*b;
        textBox.innerHTML = "Solution: " + solution;
      }else if(inputsss ==="4"){
        starting1 = a+b;
        starting = starting1 * pie;
        //multiply
        square_subtract_stuff = a-b;
        //adding
        square_add_stuff = a+b;
        //h value
        h_value3 = square_subtract_stuff/square_add_stuff;
        h_value2 = h_value3 ** 2;
        h_value1 = h_value2 *3;
        //bottom
        bottom2_1 = h_value1 * -1;
        bottom2 = bottom2_1 + 4;
        bottom1 =Math.sqrt(bottom2);
        bottom = 10+bottom1;
        //top
        solution_3 = h_value1/bottom;
        solution_2 = solution_3+1;
        solution = solution_2 * starting;
        
        textBox.innerHTML = "Solution: "+solution;
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
        sum1 = parseInt(sum3) - parseInt(sum2);
        sum = sum1/parseInt(second_one[0])
        textBox.innerHTML = "Answer: " + sum;
      }else if(special3[0]==="x"){
        sum3 = parseInt(first_one[0])*parseInt(second_one[1]);
        sum2 = parseInt(special3[1])*parseInt(first_one[1]);
        sum1 = parseInt(sum3)-parseInt(sum2);
        sum = sum1/parseInt(first_one[1]);
        textBox.innerHTML = "Answer: " + sum;
      }else if(special4[0]==="x"){
        sum3 = parseInt(first_one[1])*parseInt(second_one[0]);
        sum2 = parseInt(first_one[0])*parseInt(special4[1]);
        sum1 = sum3 - sum2;
        sum = sum1/parseInt(first_one[0]);
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