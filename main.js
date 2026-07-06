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
        const clickedValue = e.target.textContent;
        console.log(state);

       //0 to decimal UI
       if (state === "idle" && currDisplay.textContent === "0" && clickedValue === "."){
        state = "enteringfnum";
        currDisplay.textContent = "0.";
       }else if (state === "enteringfnum" && currDisplay.textContent === "0" && clickedValue === "."){
        currDisplay.textContent = "0.";
       }else if (state === "enteringsnum" && currDisplay.textContent === "0" && clickedValue === "."){
        currDisplay.textContent = "0.";
       }else if (state === "enteringfnum" && currDisplay.textContent === "-0" && clickedValue === "."){
        currDisplay.textContent = "-0.";
       }else if (state === "enteringsnum" && currDisplay.textContent === "-0" && clickedValue === "."){
        currDisplay.textContent = "-0."
       }

        //for error
        if (currDisplay.textContent === "error") {
            state = "idle";
            firstNumber = null;
            secondNumber = null;
            operator = null;
            currDisplay.textContent ="0";
            operatorDisplay.textContent = "";
        }

        //added this to fix bugs due to new feature: erase
        if (currDisplay.textContent === "0"){
            currDisplay.textContent = "";
        }
         
        

        if (state === "idle") {
            if (clickedValue != "."){
              currDisplay.textContent="";
            }
            state = "enteringfnum";
        }
     

        if (state === "operatorSelected"){
            if (clickedValue === "."){
             currDisplay.textContent = "0."
            }else{
             currDisplay.textContent = "";
            }  
            state = "enteringsnum";
        }

        if (state === "showingResult"){
            operator = null;
            firstNumber = null;
            secondNumber = null;
            currDisplay.textContent = "";
            operatorDisplay.textContent = "";
            state = "enteringfnum";
        }

        if (state === "enteringsnum" && currDisplay.textContent === "-0"){
            currDisplay.textContent = "-";
        } 

        if (state === "enteringfnum" && currDisplay.textContent === "-0"){
            currDisplay.textContent = "-";            
        }
         

        //preventing double decimals
          

         if (clickedValue === "." && currDisplay.textContent.includes(".")) {
            return;
         }
         //input limit 
         if (currDisplay.textContent.length >= 12) return;

             currDisplay.textContent += (e.target.textContent);
    
             updateDisplay();
   })
}

//operator listener 

      for (let i=0 ; i<operators.length ; i++) {
        operators[i].addEventListener("click" , (e)=> {
             if (currDisplay.textContent === "error") return;

            if (state === 'enteringsnum') {
                secondNumber = currDisplay.textContent;
                operator = operatorDisplay.textContent;
                performCalculation();
                state = "showingResult";
            }

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

        performCalculation();
        }

        if (state === "showingResult"){
            operatorDisplay.textContent ="";
        }
         
     })



//math function


function performCalculation () {
    let a = Number(firstNumber);
    let b = Number(secondNumber);
    let result;


    if (operator === "+") {
        result =  a + b;
    }else if (operator === "-") {
        result =  a - b;
    }else if (operator === "÷") {
        if (b === 0) {
            result =  "error";
        }else {
            result = a/b;
        }
    }else if (operator === "X") {
        result = a * b;
    }

    if (result === "error") {
        currDisplay.textContent = "error";
    }else if (Number.isInteger(result)){ 
        currDisplay.textContent = result;
    }else {
        currDisplay.textContent = result.toFixed(3);
    }
     updateDisplay();
}


//clear listener

reset.addEventListener("click" , ()=> {
    operator = null;
    firstNumber = null;
    secondNumber = null;
    currDisplay.textContent = "0";
    operatorDisplay.textContent = "";
    state = "idle";

    updateDisplay();
    console.log(state);
})


//erase handling

erase.addEventListener("click" , ()=> {
     if (currDisplay.textContent === "error") {
        operator = null;
        firstNumber = null;
        secondNumber = null;
        currDisplay.textContent = "0";
        operatorDisplay.textContent = "";
        state="idle";
        return;
     }

    if (state === "showingResult"){
        state = "enteringfnum";
        operator = null;
        firstNumber = null;
        secondNumber = null;
        operatorDisplay.textContent = "";
    }

     if (currDisplay.textContent.length === 1){
        currDisplay.textContent = "0";
    } else if (currDisplay.textContent === "0") {
        return;
    }
    else {
       currDisplay.textContent = currDisplay.textContent.slice(0,-1);
    }
    console.log(state);
     updateDisplay();  
})



function updateDisplay () { 
    if (currDisplay.textContent.length >= 18) {
        currDisplay.style.fontSize="50px";
    }else if (currDisplay.textContent.length >= 13) {
        currDisplay.style.fontSize="60px";
    }else if (currDisplay.textContent.length >= 8){
        currDisplay.style.fontSize="80px";
    }else {
        currDisplay.style.fontSize="100px";
    }
}

//sign change button implementation 

let signChange = document.querySelector("#sign-change") 

signChange.addEventListener("click" , ()=> {
    console.log(state);
    if (state === "operatorSelected"){
        state = "enteringsnum";
        currDisplay.textContent = "-0";
    }else if (state === "idle") {
        currDisplay.textContent = "-0"
        state = "enteringfnum";
    }else if (state === "enteringsnum" && currDisplay.textContent === "0"){
        currDisplay.textContent = "-0";
    }else if (state === "enteringfnum" && currDisplay.textContent === "0"){
        currDisplay.textContent = "-0";
    }else if (state === "enteringfnum" && currDisplay.textContent === "0."){
        currDisplay.textContent = "-0.";
    }else if (state === "enteringsnum" && currDisplay.textContent === "0."){
        currDisplay.textContent = "-0.";
    }
    
    else {
    currDisplay.textContent = String(-Number(currDisplay.textContent));
    }
})

//c .