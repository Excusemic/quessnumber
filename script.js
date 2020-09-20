//Neccessary Vars
let cardBoard = document.querySelector('.cards')
let tryNumber = document.querySelector('.pokusaj');
let tryLeft = document.querySelector('.preostalo-pokusaja');
let instruction = document.querySelector('.instrukcija');
let percent = document.querySelector('.percent');
let failed = Number(localStorage.getItem('failed'));
let successPlays = Number(localStorage.getItem('success'));


//Generate random number 
function randomNo(){
    let randomBr=Math.floor(Math.random() * 100);
    return randomBr;
}


//PRINT 100 CARDS
for (let i = 1; i<=100; i++) {
    let brDiv = document.createElement('div');
    brDiv.classList.add('oneCard')
    brDiv.innerHTML=`${i}`
    cardBoard.appendChild(brDiv);
}

//Calculate success percentage
function calcPercent() {
    let succ = localStorage.getItem('success')
    let fail = localStorage.getItem('failed');
    let ukupno = Number(succ)+Number(fail);
    let onePerc = ukupno/100
    let res = succ/onePerc;
    if (isNaN(res)) {
        res = 0;
    }
    return res;
    
}
//Footer html will be current percentage of success
percent.innerHTML=`Procenat uspesnosti: ${calcPercent().toFixed(2)}%`;

//Get all cards after printing
let sveKarte = document.querySelectorAll('.oneCard');

//every time page loads, brKlikova is reset to 0, preostaloKlokova to 7 and
let brKlikova = 0;
let preostaloKlikova = 7;



//Generate correct card
function placeRandom() {
    tacnaKarta = sveKarte[randomNo()];
    tacnaKarta.setAttribute('name', 'correct')
    console.log(tacnaKarta);
}
//On page load, generate new correct card
placeRandom();

sveKarte.forEach((karta, i) => {
    //Get index of correct card
    if (karta.getAttribute('name') == 'correct') {
        index = i;
    }

    karta.addEventListener('click', () => {

        //If the card clicked is wrong 
        if (karta.getAttribute('name') == null) {
            brKlikova++;
            preostaloKlikova--;

            //If the card clicked is post correct card
            if (i < index) {
                tryNumber.innerHTML+=`<p>${brKlikova}.</p>`
                instruction.innerHTML+=`<p>Broj je veci od ${i+1}</p>`
                tryLeft.innerHTML+=`<p>${preostaloKlikova} pokusaja</p>`
                karta.classList.add('missedCardBefore')
            }
            //If the card clicked is pre correct card
            else if (i > index) {
                tryNumber.innerHTML+=`<p>${brKlikova}.</p>`
                instruction.innerHTML+=`<p>Broj je manji od ${i+1}</p>`
                tryLeft.innerHTML+=`<p>${preostaloKlikova} pokusaja</p>`
                karta.classList.add('missedCardAfter')
            }
        }
        //If the card clicked is correct!
        else {
            karta.classList.add('correctCard')
            if (localStorage.getItem('success') == 0) {
                localStorage.setItem('success', 1)
            }
            else {
                currentSuccess = localStorage.getItem('success');
                currentSuccess++;
                localStorage.setItem('success', currentSuccess);
            }
            setTimeout(() => {
                if (!alert('Cestitamo, pogodili ste broj')) {
                    window.location.reload();
                }
            }, 300);
            
        }
        //If player excedes 7 clicks, tha game ends
        if(brKlikova==7) {
            if (localStorage.getItem('failed') == null) {
                localStorage.setItem('failed', 1)
            } else {
                currentFails = localStorage.getItem('failed')
                currentFails++;
                localStorage.setItem('failed', currentFails);
            }
            setTimeout(() => {
                if (!alert('Niste pogodili broj u 7 pokusaja')) {
                    window.location.reload();

                }
            }, 50);

        }
    })
})
