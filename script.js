const boxes = document.getElementsByClassName("box");
let resetbtn = document.querySelector("#rst-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//playerX,playerO
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    turnO = true;
    count=0;
    enabledBoxes();
    msgcontainer.classList.add("hide");
}
const boxArr = Array.from(boxes);
boxArr.forEach(el => {
    el.addEventListener("click",()=>{
        
        if(turnO){//playerO
            el.innerText="O";
            turnO=false;

        }else{//playerX
            el.innerText="X";
            turnO=true;
        } 
        el.disabled = true;
        count++;
        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
});
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disabledBoxes();
}
const disabledBoxes = () =>{
    for(let box of boxes) {
        box.disabled = true;
    }
}
const enabledBoxes = () =>{
    for(let box of boxes) {
        box.disabled = false;
        box.innerText="";
    }
}

const showWinner = (winner) =>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledBoxes();
}

const checkWinner = () => {
  for(let patterns of winPatterns) {
 
    let pos1 = boxes[patterns[0]].innerText;
    let pos2 = boxes[patterns[1]].innerText;
    let pos3 = boxes[patterns[2]].innerText;

    if(pos1 != "" && pos2 != "" && pos3 != ""){
        if(pos1 === pos2 && pos2 === pos3){
           
            showWinner(pos1);
            return true;
        }
    }
  
}
}

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click",resetGame);
