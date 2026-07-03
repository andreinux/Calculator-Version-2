const numbers = document.querySelectorAll(".nButton");
const operators = document.querySelectorAll(".operatorButton");
const currDisplay = document.querySelector(".curr-display");
const operatorDisplay = document.querySelector(".operator-display");
const equals = document.querySelector("#calcBtn");

const reset = document.querySelector("#reset");
const erase = document.querySelector("#erase");

//state

let state = "idle";
let firstNumber = null;
let secondNumber = null;
let operator = null;

//button event handler 


   for(let i=0 ; i<numbers.length ; i++) {
    numbers[i].addEventListener("click" , (e)=> {

        if (state === "idle") {
            currDisplay.textContent="";
            state = "enteringfnum";
        }
        if (state === "operatorSelected"){
            state = "enteringsnum";
            currDisplay.textContent = "";   
        }
             currDisplay.textContent += (e.target.textContent);
    
   })
}

//operator listener 

      for (let i=0 ; i<operators.length ; i++) {
        operators[i].addEventListener("click" , (e)=> {
            state = "operatorSelected";
            firstNumber = currDisplay.textContent;
            operatorDisplay.textContent = "";
            operatorDisplay.textContent = e.target.textContent;
        })
      }


//= button listener
       equals.addEventListener("click" , ()=>{
    if (state === "enteringsnum") {
        state = "showingResult";
        operator = operatorDisplay.textContent;
        secondNumber = currDisplay.textContent;
        console.log(state);
        console.log(firstNumber);
        console.log(operator);
        console.log(secondNumber);
        }
     })

