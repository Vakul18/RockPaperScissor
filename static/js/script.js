let choiceByNumber = { 1: "rock", 2 : "paper", 3: "scissor" };
let rpsDecisionData = {
    "rock": {"rock":0.5,"paper":0, "scissor":1},
    "paper": {"rock":1,"paper":0.5, "scissor":0},
    "scissor": {"rock":0,"paper":1, "scissor":0.5}
};

let imgSrcById = {
    "rock":"https://img.pngio.com/rock-png-rock-png-2483_2077.png",
"paper":"https://smallimg.pngkey.com/png/small/12-122412_note-paper-png-note-paper-image-transparent.png",
"scissor":"https://img.pngio.com/blue-scissors-png-clip-art-best-web-clipart-scissors-png-clipart-5756_8000.png"
};


let lostMessage = {'message': "You Lost!" , 'color':'red'};
let winMessage = {'message': "You won!" , 'color':'green'};
let drawMessage = {'message': "Its a Draw!" , 'color':'yellow'};

let userChoiceStyle = 'box-shadow: 10px 10px 50px blueviolet';
let botChoiceStyle = 'box-shadow: 10px 10px 50px red';

function ageButtonClicked(){
    let inputAge = prompt('Enter birth year');
    ageInDays = ((new Date()).getFullYear() -  inputAge)*365;
    document.getElementById('headingAgeInDays').textContent = ageInDays;
}

function resetAge(){
    document.getElementById('headingAgeInDays').textContent = '';
}

function generateDog(){
    let img = document.createElement("img");
    img.setAttribute("src","https://media.giphy.com/media/avQKSFlrCVDqKn3rdB/giphy.gif");
    let container = document.getElementById("image-container");
    container.appendChild(img);
}

function onRpsImgClick(userSelectionElement){
    let userChoice = userSelectionElement.id;
    let botChoice = choiceByNumber[generateBotChoice()];
    result = decideWinner(userChoice,botChoice);
    message = prepareResultMessage(result);
    rpsPrepareFrontEnd(userChoice,botChoice,message);
}

function decideWinner(userChoice,botChoice){
    return rpsDecisionData[userChoice][botChoice];
}

function generateBotChoice(){
    return Math.ceil(Math.random()*3);
}

function rpsPrepareFrontEnd(userChoice,botChoice,message){
    clearChoices();

    let userChoiceDiv = document.createElement("div");
    let botChoiceDiv = document.createElement("div");
    let resultMsgDiv = document.createElement("div");

    addImageToDiv(botChoice,botChoiceDiv,userChoiceStyle);
    addImageToDiv(userChoice,userChoiceDiv,botChoiceStyle);
    createMessageElement(message,resultMsgDiv);
    addDivsToContainer(userChoiceDiv,resultMsgDiv,botChoiceDiv);

}

function addDivsToContainer(div1,div2,div3){
    let imgContainer = document.getElementById("flex-box-rps-div");
    imgContainer.appendChild(div1);
    imgContainer.appendChild(div2);
    imgContainer.appendChild(div3);
}

function clearChoices(){
    document.getElementById("flex-box-rps-div").innerHTML = "";
}

function createMessageElement(message,divElement){
    let messageElement = document.createElement('h2');
    messageElement.textContent = message.message;

    messageElement.setAttribute("style","color:"+ message.color + " ;font-size:60px;padding:30px");
    divElement.appendChild(messageElement);
}

function addImageToDiv(choice,divElement,style,setCallback=false){
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src",imgSrcById[choice]);
    imgElement.setAttribute("height","150");
    imgElement.setAttribute("width","150");
    imgElement.setAttribute("id",choice);
    if (setCallback){
        imgElement.setAttribute("onclick","onRpsImgClick(this)");
    }
    if(style!=null)
    {
        imgElement.setAttribute("style",style);
    }
    divElement.appendChild(imgElement);
}

function prepareResultMessage(result){
    if(result === 0){
        return lostMessage;
    }
    else if (result === 1){
        return winMessage;
    }
    else{
        return drawMessage;
    }
}

function resetChallenge(){
    clearChoices();
    let rockDiv = document.createElement("div");
    let paperDiv = document.createElement("div");
    let scissorDiv = document.createElement("div");

    addImageToDiv(choiceByNumber[1],rockDiv,null,true);
    addImageToDiv(choiceByNumber[2],paperDiv,null,true);
    addImageToDiv(choiceByNumber[3],scissorDiv,null,true);
    
    addDivsToContainer(rockDiv,paperDiv,scissorDiv);
}

