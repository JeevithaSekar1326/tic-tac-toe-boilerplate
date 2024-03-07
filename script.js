// Iteration 1: Declaring variables
const boxElement=document.querySelectorAll(".cube");
var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
var xAttempts = [];
var oAttempts = [];
var click=0;
var wonTheGame = 0;
const message= document.getElementById("message");
const gameResult=document.getElementById("result");
const restart=document.getElementById("button");

// Iteration 2: Onclick function
boxElement.forEach(box=>{
    console.log(box);
    box.onclick  = handleClick;
})
function handleClick(e){
    console.log(e.target);//
    console.log(e.target.getAttribute('id'));//getAttribute will get the id from the e.target
    const i=e.target.getAttribute('id');//stores the id 
    const text = document.createElement('p');//create element p for storing text
    text.setAttribute('id','text');//set the attribute id and value for text variable 
    boxElement[i-1].appendChild(text);//append the newly created element text to the boxElement
    console.log(boxElement[i-1]);
    if(click%2 == 0){//the value for click initially is 0
        xAttempts.push(parseInt(i-1));//push the value in the xAttempts array which is intially empty.
        console.log(xAttempts);
        text.innerHTML="X";//set "X" for "text" element 
        text.style.color = '#FAB201';//apply style i.e the color to the text element
        result(winningCombinations,xAttempts,"X");//function result is invoked and three parameters are passed.
    }
    else{
        oAttempts.push(parseInt(i-1));
        console.log(oAttempts)
        text.innerHTML="O";
        text.style.color = '#FAB201';
        result(winningCombinations,oAttempts,"O");
    }
    click++;// the value gets incremented by 1
    if(click == 9 && wonTheGame == 0){ //if the condition is fullfilled the following code will run and the message is printed 
            gameResult.style.visibility="visible";
            message.innerHTML = "It's a tie ";
    }
}

// Iteration 3: Result function
function result(winningCombinations, attempts, player){
    let flag = 0;
    let checker = [];
    for (var i = 0; i < winningCombinations.length; i++) {
        console.log(winningCombinations[i]);
        if (Array.isArray(winningCombinations[i])){//it will check whether the winningCombinations is array or not if it is array
                                                   //it will set the parameters for result.
            result(winningCombinations[i],attempts,player);
        }else{
            if(attempts.includes(winningCombinations[i])){ //if the attempts includes the array the desired combination
                checker.push(true); //checker will have the boolean value as true
                flag++;//flag gets increament by 1
            } else {
                checker.push(false);//when the condition fails the checker will have the boolean value as false
            }
        }
    }
    if (checker.every(check => check === true)&&flag>2){//the condition is true the message is printed 
            gameResult.style.visibility="visible";
            message.innerHTML ="'"+ player +"'" + " Won the game!";  
            wonTheGame=1;   
    }
}

// Iteration 4: Restart function

restart.onclick=()=>{ //restarts the game when the user clicks on the button restart i.e play again
    history.go(0);
}