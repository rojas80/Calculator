const  displayScreen = document.getElementById('cal-display');
const buttons = document.querySelectorAll('.btn');
let isCurrentNumberNegetive = false;

function buttonClickHandler(event) {
   if((parseInt(event.target.value)>= 0 && parseInt(event.target.value) <= 9 ) || event.target.value =="."){
        updateDisplay(event.target.value);
   }
   switch(event.target.value){
    case 'ac':{
        displayScreen.textContent = '';
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
   }
   
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