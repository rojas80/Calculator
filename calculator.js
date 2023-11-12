const  displayScreen = document.getElementById('cal-display');
const buttons = document.querySelectorAll('.btn');
let hasEqualBeenClick = false;
let isCurrentNumberNegetive = false;
let calculatorInput =  new Array();

function buttonClickHandler(event) {
    if(hasEqualBeenClick){
        displayScreen.textContent = '';
        hasEqualBeenClick = false;
    }

   if((parseInt(event.target.value)>= 0 && parseInt(event.target.value) <= 9 ) || event.target.value =="."){
        updateDisplay(event.target.value);
   }

   switch(event.target.value){
    case 'ac':{
        clearAllData();
        break;
    }
    case 'del':{
        deleteInputDigitDisplay();
        break;
    }
    case '~':{
        addDeleteNegetiveSign();
        break;
    }
    case '%':{
        percentage();
        break;
    }
    case '=':{ 
        result();
        break;
    }
    case '+':
    case '-':
    case '*':
    case '/':
        //add operation and display value to the arraylist 
        let  lastIndexValue = calculatorInput.length - 1;

        if(displayScreen.textContent ==''){
            if(calculatorInput[lastIndexValue] == '+' || calculatorInput[lastIndexValue ] == '-' ||
                calculatorInput[lastIndexValue] == '*' || calculatorInput[lastIndexValue] == '/' ){
                    calculatorInput[lastIndexValue] = event.target.value;
            }
        }
        else{
            calculatorInput.push(displayScreen.textContent);
            calculatorInput.push(event.target.value);
            displayScreen.textContent = '';
        }
        break;
   }
   console.log(calculatorInput);
   
   
}

buttons.forEach(button => {
    button.addEventListener('click', buttonClickHandler);
});
function updateDisplay(value){
    displayScreen.textContent += value;
}
function deleteInputDigitDisplay(){
    let newValue = displayScreen.textContent.slice(0,-1);
    displayScreen.textContent = newValue;
}
function addDeleteNegetiveSign(){
    let temp = displayScreen.textContent;
    if(isCurrentNumberNegetive){
        temp =temp.slice(1);
        displayScreen.textContent = temp;
        isCurrentNumberNegetive = false; 
    }   
    else{
        temp = "-" + temp;
        displayScreen.textContent = temp;
        isCurrentNumberNegetive = true;
    }
}

function percentage(){
    let displayValue = displayScreen.textContent;
    displayValue = parseFloat(displayValue);
    displayValue = displayValue / 100;
    displayScreen.textContent = displayValue.toString();
    
}

function clearAllData(){
    displayScreen.textContent = '';
    calculatorInput.length =  0;
}

function result(){
    let total = 0;
    let searchForOperates = ['*','/','+','-'];
    let operatesIndex = 0;
    let currentInputOperateIndex = 0;
    let currentOperate = '';

    hasEqualBeenClick  = true
    calculatorInput.push(displayScreen.textContent);
   
    while(calculatorInput.length >1){
        if(calculatorInput.indexOf(searchForOperates[operatesIndex]) == -1){
            operatesIndex++;
            continue;
        }
        currentInputOperateIndex  = calculatorInput.indexOf(searchForOperates[operatesIndex]);
        currentOperate = searchForOperates[operatesIndex];

        switch(currentOperate){
            case '*':{
                total  = multiply(calculatorInput[currentInputOperateIndex - 1], calculatorInput[currentInputOperateIndex + 1]);
                break;
            }
            case '/':{
                total  = divide(calculatorInput[currentInputOperateIndex - 1], calculatorInput[currentInputOperateIndex + 1]);
                break;
            }
            case '+':{
                total  = add(calculatorInput[currentInputOperateIndex - 1], calculatorInput[currentInputOperateIndex + 1]);
                break;
            }
            case '-':{
                total  = subtract(calculatorInput[currentInputOperateIndex - 1], calculatorInput[currentInputOperateIndex + 1]);
                break;
            }
        }
        calculatorInput.splice(currentInputOperateIndex);
        calculatorInput.splice(currentInputOperateIndex + 1);
        calculatorInput.splice(currentInputOperateIndex - 1);
        calculatorInput.length = 0;
    
    }
    displayScreen.textContent = total;
}

function add(firstNumber, secondNumber){    
    return parseFloat(firstNumber) + parseFloat(secondNumber);

}
function subtract(firstNumber, secondNumber){
    return parseFloat(firstNumber) - parseFloat(secondNumber);

}
function multiply(firstNumber,secondNumber){
    return parseFloat(firstNumber) * parseFloat(secondNumber);

}
function divide(firstNumber,secondNumber){
    return  parseFloat(firstNumber) / parseFloat(secondNumber);
}