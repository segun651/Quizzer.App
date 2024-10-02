let triviaamount = document.getElementById("trivia_amount")
let triviacategory = document.getElementById("trivia_category")
let triviadifficulty = document.getElementById("trivia_difficulty")
let triviatype = document.getElementById("trivia_type")
let hrs = document.getElementById("hrs")
let mins = document.getElementById("mins")
let secs = document.getElementById("secs")
let questionui = document.querySelector(".questionui")
let timeui = document.getElementById("timeui")
let questionnumberui = document.querySelector(".questionnumberui")
let hr = ''
let min = ''
let sec = ''
let x = ''
let amountCorrect = 0;
     let startpage = document.querySelector(".startpage")
let welcomepage = document.querySelector(".welcomepage")
let isElapsed = false
let scorepage = document.querySelector(".scorepage")
let score = document.querySelector(".score")
let myform = document.getElementById("myform");
myform.addEventListener("submit", StartPage);

 async function StartPage(e){
  e.preventDefault()
  try{
    if(hrs.value == "" && secs.value == "" && mins.value == "" || triviaamount.value == 0 ){
      alert("No Input")
      return
    }
   else  if(hrs.value == 0 && secs.value == 0 && mins.value == 0   || triviaamount.value == 0){
      alert("No Input")
      return
    }
   
  
   let res = await fetch(`https://opentdb.com/api.php?amount=${triviaamount.value}&category=${triviacategory.value}&difficulty=${triviadifficulty.value}&type=${triviatype.value}`)
   let data =  await res.json()
   startpage.style.display = "block"
   welcomepage.style.display = "none"
   console.log(data)
   setTime()
    displayQuestions(data)
    displayNumber(data)
  }
  catch(error){
   alert(`${error}
      Please kindly connect to the internet. `)
  }
 
  
}

function shuffle(options) {
  return options.sort(()=> Math.random() - 0.5)
 
   }

  function displayQuestions(data){
    data.results.map((question, index) => {
      options = shuffle([
        { id:index, text: question.correct_answer, isCorrect: true },
        ...question.incorrect_answers.map((answer) => ({ id: index, text: answer, isCorrect: false })),
 ])
      
    return(
    questionui.innerHTML += `
     <div class ="quizcontainer">
     <div class="questionbox" id=${index}>
     ${index + 1} ${question.question}
     </div>
     <div class="options">
     ${
      options.map((option, indexs)=> {
        if(option.isCorrect){
          return(
           ` <div class="option">
              <input type="radio" id="html" name=${index} value="correct">
             <label for="html">${option.text}</label>
             
             <div>
            `
        )
        }
        

        else{
          return(
            `<div class="option">
              <input type="radio" id="html" name=${index} value="wrong">
             <label for="html">${option.text}</label>
             </div>
             
            `
        )
        }
       
     }).join("")
     }
     </div>
       <div class="correctAnswer">Correct Answer: ${question.correct_answer}</div>
    ` 
    )  
   })
  }
         
  function TakeAgain(){
    //Reset Time
    hrs.value= ""
 mins.value = ""
 secs.value = ""
  timeui.innerHTML = ""
  questionui.innerHTML = ""
  questionnumberui.innerHTML = ""
 clearInterval(x)
 startpage.style.display = "none"
 welcomepage.style.display = "block"
//Remove ScorePage
 scorepage.style.transform = `translateY(100%)`
  }

    function Submit(){
    if(isElapsed){
      alert(`Time Elapsed and Submitted Successfully`) 
    }
    else{
    if(confirm("Are you sure you want to submit ")){
      submitaction()
    }
   return
  }
  submitaction()
      }

      function submitaction(){
 //Display ScorePage
 
scorepage.style.transform = `translateY(0%)`
clearInterval(x)
  //CORRECT ANSWERS
 
let questionbox = document.getElementsByClassName("questionbox")

    
  // LOOP FOR GOING THROUGH ALL QUESTIONS
    for(i = 0; i <questionbox.length; i++) {
      let radiosName = document.getElementsByName(i);
  
      
  //LOOP FOR CHECKING ANSWERS INSIDE EACH RADIO
      for( j = 0; j < radiosName.length; j++) {
        for(var j = 0; j < radiosName.length; j++) {
          let radiosValue = radiosName[j];
         
          if(radiosValue.value == "correct" && radiosValue.checked) {
            amountCorrect++;
            radiosValue.style.accentColor = "green"
          
          }
      }
    }
    }
  score.innerHTML = `Your score is ${amountCorrect}/${triviaamount.value}`
      }
    
    
      function displayNumber(data){
        data.results.map((element,index) => {
          return(
          
          
 questionnumberui.innerHTML +=  `<div class="numberbox">
             
             <a href= #${index}>
             <button>
             ${index + 1}
             </button>
             </a>
           
            </div>
            `
          )
        });
      }

function setTime(){
 
 x = setInterval(()=>{


          
  if(hrs.value == 0 && secs.value == 0 && mins.value == 0 ){
    hrs.value  = 0
    mins.value= 0
    secs.value = 0
    clearInterval(x)
    isElapsed = true
    Submit()
  }
    
    else if(secs.value != 0){
      secs.value--
 
    }
    
     
    else if(mins.value != 0 && secs.value == 0){
      secs.value = 59
      mins.value--
      
    }
     else if(hrs.value != 0 && mins.value == 0){
      mins.value = 60
       hrs.value--
      
     }

     hr = hrs.value
     min = mins.value
     sec = secs.value
     hr = (hr<10) ? `0${hr}` : hr
     min = (min<10) ? `0${min}` : min
     sec = (sec<10) ? `0${sec}` : sec
    timeui.innerHTML = `Time Left: ${hr} : ${min} : ${sec}`
     return
    },1000)

   
}





