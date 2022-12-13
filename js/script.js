let card = document.getElementsByClassName("card");
let front = document.getElementsByClassName("front");
let back = document.getElementsByClassName("back");
let arrImage = [
  "cat",
  "chamelon",
  "deer",
  "elephant",
  "elk",
  "frog",
  "hippopotamus",
  "horse",
  "ostrich",
  "parrot",
  "rat",
  "rhinoceros",
  "seal",
  "sloth",
  "whale"
];

//********************Kartların*Rastgele*Dağıtılması***************** */
var arrImgRndNum = [];//birbirinden farklı random sayı dizisi
var arrDoubleImgRndNum = [];//birbirinden farklı random sayı dizisi

function random(oArrLength, oArr) {
  for (var i = 0; i < oArrLength; i++) {

    var randomnumber = Math.floor(Math.random() * oArrLength); //0ile30 arası rakam

    if (oArr.indexOf(randomnumber) == -1) {
      // dizideki indexine bakıyorum -1 ise yani yoksa

      oArr.push(randomnumber); // diziye ekle
    } else {
      //varsa i yi bir azaltarak tekrar random sayı çek
      i--;
    }
  }
  return oArr;
}
random(arrImage.length, arrImgRndNum)
let arrRandomImage = []; //15 resmimden rastgele 10 tanesini seçiyorum

for (let i = 0; i < 10; i++) {
  arrRandomImage.push(arrImage[arrImgRndNum[i]])
}
let arrDoubleImage = arrRandomImage.concat(arrRandomImage);

let arrRandomCard = [];// arrDoubleImage dizimin içindki elemanların her seferinde karıstırılmasını sağlar
let arrRandomCardNum = [];
random(arrDoubleImage.length, arrRandomCardNum)

function randomCard() {
  for (let i = 0; i < 20; i++) {
    arrRandomCard.push(arrDoubleImage[arrRandomCardNum[i]])
  }
}

//************************CREATE*CARD*START**********************************


function createCard(oIndex) {
  var oCard = render(oIndex);

  var mainDiv = document.createElement("div");
  mainDiv.classList.add("card");
  mainDiv.innerHTML = oCard.trim();

  document.getElementsByClassName("main-container")[0].appendChild(mainDiv);
}
function render(oIndex) {
  const newCard = `
        <div class="front" onclick="myTimeoutFront(${oIndex})">
        </div>

        <div style="display: none;" class="back"">
            <img src="icons/${arrRandomCard[oIndex]}.svg" alt="">
        </div>
    `;

  return newCard;
}
//************************CREATE*CARD*END**********************************

//************************FRONT*CLİCK*START**********************************
let frontCounter = 0;
let arrIndex = [];
var trueCounter = 0;

function control(oIndex) {
  frontCounter == 2 ? (frontCounter = 1) : frontCounter++;
  arrIndex.push(oIndex);
  if(frontCounter == 2) {
    document.getElementById('tusEngelle').style.zIndex = 99999999999;

    setTimeout(function() {
      document.getElementById('tusEngelle').style.zIndex = 0;
    },2000)

  } 


  if (frontCounter == 2) {//çevrilen kartların aynı olup olmama kontrolü
    if (document.querySelectorAll('.card>.back>img')[arrIndex[0]].src == document.querySelectorAll('.card>.back>img')[arrIndex[1]].src) {
      trueCounter++;
      if (trueCounter == 10) {
        document.getElementById('tusEngelle').style.zIndex = 0;
        document.getElementsByClassName('main-container')[0].remove();
        saniyeDurdur();
        document.getElementById('win').play();
        setTimeout(createWin, 2000)

      }
      setTimeout(function () {
        document.getElementById('right').play();
        document.getElementsByClassName('card')[arrIndex[0]].style.cssText = "visibility: hidden;"
        document.getElementsByClassName('card')[arrIndex[1]].style.cssText = "visibility: hidden;"

        for (let i = 0; i < 2; i++) {
          arrIndex.pop(i);
        }
      }, 1300)

    } else {
      setTimeout(function () {
        document.getElementById('negative').play()

        myTimeoutBack(arrIndex[0]);
        myTimeoutBack(arrIndex[1]);

        for (let i = 0; i < 2; i++) {
          arrIndex.pop(i);
        }
      }, 2000);
    }
  }
}

function myTimeoutFront(oIndex) {
  control(oIndex)  //*********************burda frontu döndürüyor*************** */

  document.getElementById('whoos').play();

  front[oIndex].style.cssText = "transform:rotateY(90deg);";
  setTimeout(function () {
    frontRemove(oIndex);
  }, 100);
}
function frontRemove(oIndex) {
  front[oIndex].style.cssText = "display: none";
  back[oIndex].style.cssText = "transform: rotateY(-90deg);";
  setTimeout(function () {
    frontFlipBack(oIndex);
  }, 100);
}
function frontFlipBack(oIndex) {
  back[oIndex].style.cssText = "transition:1s; transform: rotateY(0deg);";
}
//************************FRONT*CLİCK*END**********************************
//************************BACK*CLİCK*START**********************************
function myTimeoutBack(oIndex) {
  back[oIndex].style.cssText = "transform:rotateY(-90deg)";
  setTimeout(function () {
    backRemove(oIndex);
  }, 100);
}
function backRemove(oIndex) {
  back[oIndex].style.cssText = "display: none";
  front[oIndex].style.cssText = "transform: rotateY(90deg);";
  setTimeout(function () {
    backFlipFront(oIndex);
  }, 100);
}
function backFlipFront(oIndex) {
  front[oIndex].style.cssText = "transition:1s; transform: rotateY(0deg);";
}
//********************************BACK*CLİCK*END*******************************
//******************************ALL*FLİP*CARD*START******************************
bonusCounter = 4;
function flipAll() {
  
  document.getElementById('bonus').play();

  bonusCounter--;
  document.getElementById('bonusCounter').innerHTML = bonusCounter;
  if (bonusCounter == 0) {
    document.getElementById('bonus').removeAttribute('onclick');
  }

  for (let index = 0; index < 20; index++) {

    front[index].style.cssText = "transform:rotateY(90deg);";
    setTimeout(function () {
      frontRemove(index);
    }, 100);
  }
  for (let index = 0; index < 20; index++) {

    front[index].style.cssText = "transform:rotateY(90deg);";
    setTimeout(function () {
      myTimeoutBack(index);
    }, 2500);
  }
}
//*******************************ALL*FLİP*CARD*END******************************
//******************************START*GAME*******************************

randomCard()
for (let index = 0; index < 20; index++) {
  createCard(index);
}
flipAll();
//************************************************************************
//*******************************KRONOMETRE*START********************************
var deger;
var saniye = 120;
function saniyeDurdur() {
  window.clearInterval(deger);
}
let starCounter = 0;
function saniyeBaslat() {
  saniye--;
  if (saniye <= 120) {
    document.getElementById('saniye').innerHTML = saniye;
    starCounter = 3;
  }
  if (saniye <= 80) {
    document.querySelectorAll('.header > ul')[0].getElementsByClassName('star')[2].style.visibility = 'hidden'
    starCounter = 2;
  }
  if (saniye <= 60) {
    document.querySelectorAll('.header > ul')[0].getElementsByClassName('star')[1].style.visibility = 'hidden'
    starCounter = 1;

  }
  if (saniye <= 10) {
    document.getElementById('sayacColor').style.background = "tomato"
    document.getElementById('sayacColor').style.borderColor = "tomato"
  }
  if (saniye <= 0) {
    document.querySelectorAll('.header > ul')[0].getElementsByClassName('star')[0].style.visibility = 'hidden'
    // window.location.href = 'file:///C:/Users/kemal/Desktop/detay%20%C3%B6dev/Grup4/endGame.html';
    saniyeDurdur();
    endGame();
    document.getElementById('tusEngelle').style.zIndex = 0;
    document.getElementById('gameOver').play();
    createGameOver();
  }
  document.getElementById('sayacColor').style.width = `${(saniye * 100) / 120}%`
}
setTimeout(function () {
  deger = window.setInterval('saniyeBaslat()', 1000)
}, 2500)

//********************************KRONOMETRE*END*********************************



// ***********************************ENDGAME--PAPER********************************************************

function endGame() {
  document.getElementById('background').style.display = "none";
}

function createGameOver() {
  var newBackground = renderGameOver();
  var backgroundDiv = document.createElement("div");
  backgroundDiv.classList.add("backgroundBody");
  backgroundDiv.innerHTML = newBackground.trim();

  document.getElementById("endGame").appendChild(backgroundDiv);
}
function renderGameOver() {
  const newBackground = `
  <style>
  *,
  html,
  body {
      padding: 0px;
      margin: 0px;
      box-sizing: border-box;
      text-decoration: none;
      list-style: none;
      color: white;
  }
  body {
     
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
  }
  .title {
      position: relative;
      font-family: 'Aclonica';
      font-size: 4rem;
      color: white;
      top: 30%;
    
  }
.image {
  position:absolute;
  top:1rem;
  right:-36.2rem;
}
  section ul {
      text-align: center;
  }
  section ul li {
      font-size: 1.4rem;
      margin-top: 10px;
  }
  .restart {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: aliceblue;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      border-radius: 25px;
      cursor: pointer;
      position: relative;
      scale: 1.3;
      margin-top: 2rem;
      width:100px;
      position: relative;
      left:8.7rem;
  }
  .restart .restart-btn {
      border: none;
      background-color: transparent;
      color: blue;
      font-size: 1rem;
      cursor: pointer;
      padding: 4px;
  }
  .restart i {
      display:flex;
      justfy-contend: start;
      margin-right: 5px; 
      font-size: 0.8rem;
      color: blue;            
  }
</style>
  <div class="title">GAME OVER</div>
    
    <section>
        <ul>
        <li>
              SCORE: <strong> ${(30 * starCounter) + (saniye) + (3 * trueCounter)} point </strong>
            </li>
            <li class="titleLi"> Find Rate: <strong id="score">% ${trueCounter }</strong></li>
            <li class="section">Remeaning Time : <strong id="time">0 s</strong></li>
            <li class="star"> received star : <strong id="star"> 0 </strong></li>
            <li>
                <div class="restart">
                    <i class="fa-solid fa-arrow-rotate-right"></i>
                    <input style="z-index:99999999999;" class="restart-btn" type="button" value="Try Again" onclick="restart()">
                </div>
            </li>
        </ul>
        <div class="image">
      <img src="assets/game-over.png" height="500px" width="500px"  alt="">
    </div>
    </section>`

  return newBackground;
}
function createWin() {
  var newBackground = renderWin();
  var backgroundDiv = document.createElement("div");
  backgroundDiv.classList.add("backgroundBody");
  backgroundDiv.innerHTML = newBackground.trim();

  document.getElementById("endGame").appendChild(backgroundDiv);
}
function renderWin() {
  const newBackground = `
  <style>
  *,
  html,
  body {
      padding: 0px;
      margin: 0px;
      box-sizing: border-box;
      text-decoration: none;
      list-style: none;
      color: white;
  }
  body {
     
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
  }
  .title {
      position: relative;
      font-family: 'Aclonica';
      font-size: 4rem;
      color: white;
      top: 30%;
    
  }
 
  section ul {
      text-align: center;
  }
  section ul li {
      font-size: 1.4rem;
      margin-top: 10px;
  }
  #restart {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: aliceblue;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      border-radius: 25px;
      cursor: pointer;
      position: relative;
      scale: 1.3;
      margin-top: 2rem;
      width:100px;
      position: relative;
      left:4.7rem;
  }
  #restart-btn {
      border: none;
      background-color: transparent;
      color: blue;
      font-size: 1rem;
      cursor: pointer;
      padding: 4px;
  }
  #restart i {
      display:flex;
      justfy-contend: start;
      margin-right: 5px; 
      font-size: 0.8rem;
      color: blue;            
  }
</style>
  <div class="title">You Won</div>
  
    <section>
        <ul>
            <li>
              SCORE: <strong> ${(30 * starCounter) + (saniye) + (3 * trueCounter)} point </strong>
            </li>
            <li >Couples Found
            : <strong id="score">${trueCounter}</strong></li>
            <li class="section">Remeaning Time : <strong id="time">${saniye} s</strong></li>
            <li class="star"> received star : <strong id="star"> ${starCounter} </strong></li>
            <li>
                <div id="restart" class="restart">
                    <i class="fa-solid fa-arrow-rotate-right"></i>
                  <input style="z-index:9999999;" id="restart-btn" class="restart-btn" type="button" value="Try Again" onclick="restart()">
                </div>
            </li>
        </ul>
    </section>`

  return newBackground;
}

function restart() {
  window.location.href = 'file:///C:/Users/kemal/Desktop/detay%20%C3%B6dev/Grup4/startGame.html';
}




