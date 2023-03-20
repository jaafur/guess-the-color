let container = document.querySelector(".container")
let win = document.querySelector(".win")
let submit = document.querySelector(".submit")
let guess = document.querySelector(".guess")
let words = [
    "AMBER",
    "ASHEN",
    "AZURE",
    "BEIGE",
    "BERYL",
    "BlACK",
    "BLOND",
    "BROWN",
    "CREAM",
    "FLAME",
    "GREEN",
    "LEMON",
    "PEARL",
    "SMOKY",
    "SNOWY",
    "SOOTY",
    "STEEL",
    "STRAW",
    "SWART",
    "TAUPE",
    "TAWNY",
    "TOPAZ",
    "UMBER",
    "VIRID",
    "WHEAT",
    "WHITE",
  ]
  id = -1
let startGame = async()=>{
for (let index = 0; index < 6; index++) {
    let x=1
    let inputRow = document.createElement("div")
    inputRow.classList.add("input-row")
    for (let j = 0; j < 5; j++) {
        inputRow.innerHTML += `<input type="text" class="input-box" id=${id+=1}
                                onkeyup="checker(event)" maxlength="1" disabled>`
     
    }
    container.appendChild(inputRow)
      
}
inputBoxes = document.querySelectorAll(".input-box")
inputRows = document.querySelectorAll(".input-row")
inputCount = 0
 tryCount = 0
 finalWord = ""
 random = getRandomWord()
 
disabilityStatus(inputRows[tryCount].firstChild,false)
 
}

let disabilityStatus = (element,disability)=>{
    element.disabled = disability
    if (!disability) {
        element.focus()
    }
}
let isTouchDevice = ()=>{
    try {
        document.createEvent('TouchEvent')
        return true
    } catch (error) {
        return false
    }
}
let getRandomWord = ()=>{

    return words[Math.floor(Math.random()*words.length)]
}
let checker = (e)=>{
   
if (e.target.value.length ==1) {
    if (inputCount<4) {
        inputCount +=1
        finalWord+=e.target.value.toUpperCase()
        disabilityStatus(e.target.nextSibling,false)
    }else if (inputCount ==4) {
        inputCount +=1
        finalWord+=e.target.value.toUpperCase()
        disabilityStatus(inputRows[tryCount].lastChild,true)
        compare(finalWord,random)
        tryCount+=1 
        if (tryCount > 5) {
            win.classList.remove("hide")
            win.innerHTML = `<p>Ooops , You Can Do Better...</p>`
            guess.classList.add("hide")
            submit.classList.remove("hide")
            submit.disabled = false
            tryCount = 0 
        } 
        disabilityStatus(inputRows[tryCount].firstChild,false)
        inputCount = 0
        finalWord ="" 
        
    }
}else if (e.target.value.length ==0) {

if (e.key =="Backspace") {
     finalWord = finalWord.substring(0,finalWord.length - 1)
       if (inputCount != 0) {
        inputCount -=1
        e.target.previousSibling.value = ""
        disabilityStatus(e.target.previousSibling , false)
       }else if (tryCount == 0 && inputCount ==0) {
        disabilityStatus(e.target ,false)
       }
    //    }else if (inputCount == 0 && tryCount !=0) {
    //     tryCount -=1
    //     inputRows[tryCount].lastChild.value = ""
    //     disabilityStatus(inputRows[tryCount].lastChild,false)
    //    }
     
}
}
}
compare = (finalWord,random)=>{
    let successfulTry = 0
    let currentInput = inputRows[tryCount].querySelectorAll(".input-box")
    for (let index = 0; index < random.length; index++) {
        if (finalWord[index]==random[index]) {
           currentInput[index].classList.add("correct")
           successfulTry+=1
           if (successfulTry == 5) {
            guess.classList.add("hide")
            win.classList.remove("hide")
            win.innerHTML = `<p>Great Job The Word Is " ${finalWord} "</p>`
           }
           
        }else if (finalWord[index]!=random[index] && random.includes(finalWord[index])) {
            currentInput[index].classList.add("existed")
        }else{
            currentInput[index].classList.add("incorrect")
        }
        
    }
}
reload =()=>{
    window.location.reload()
}
window.onload = ()=>{startGame()}
