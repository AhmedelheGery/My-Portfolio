// TYPE WRITER FUNCTION 
const typeWriter = function (txtElement , words , wait = 3000){
    // TEXT ELEMENT THAT PASSED IN 
    this.txtElement = txtElement;
    // WORDS THAT PASSEF IN
    this.words = words;
    // WAIT TIME THAT PASSEF IN
    this.wait = parseInt ( wait , 10 );
    // TXT YOU WILL SEE AT RELOAD
    this.txt = '';
    // ARRAY OF WORDS
    this.indexOfTheWord = 0;
    // THE MAIN METHOD THAT WILL BE WORK WITH TYPE WRITER
    this.type();
    // REPRESENT THE STATE IF IT DELETING OR NOT 
    this.isDeleteing = false ;
}

// CREATE OUR TYPE METHOD
typeWriter.prototype.type = function() {
    // GET THE CURRNET INDEX OF THE WORD
    const currnet = this.indexOfTheWord % this.words.length ;
    // console.log(currnet);
    // GET THE FULL TEXT OF A CURRNET WIRD
    const fullTxt = this.words[currnet];
    // console.log(fullTxt);
    // CHECK IF DELETING
    if(this.isDeleteing){
        // REMOVE CHAR
        this.txt = fullTxt.substring(0 , this.txt.length -1);
    }
    else {
        // ADD CHAR
        this.txt = fullTxt.substring(0 , this.txt.length +1);
    }
    // INSERT TXT INTO TXTELEMENT
    this.txtElement.innerHTML = `<span class="txt"> ${this.txt} </span>`;
    // LETS MAKE THE TYPE SPEED
    let typeSpeed = 300 ;
    if (this.isDeleteing){
        typeSpeed /= 2;
    }
    // CHECK IF THE WORD IS COMPELETE GO TO THE OTHER WORD
    if(!this.isDeleteing && this.txt === fullTxt){
        // MAKE THE COMPELETE WORD PAUSE 
        typeSpeed = this.wait;
        // SET ISDELETING VARIABLE TO TRUE
        this.isDeleteing = true ;
        console.log('Pasue');

    }  if(this.isDeleteing && this.txt ===''){
        this.isDeleteing = false ;
        // MOVE TO THE NEXT WORD
        this.indexOfTheWord++;
        // PAUSE BEFORE START TYPING
        typeSpeed = 500 ;
        console.log('Delete');
    }

    setTimeout( () => this.type() , typeSpeed);
}

// ON LOAD MAKE INIT
document.addEventListener('DOMContentLoaded' , init);
// INIT FUNCTION           DOMContentLoaded 
function init(){
    // GRAP ALL ELEMENT & ATTRIBUTE
    const txtElement = document.querySelector('.type');
    // GET THE ATTRIBUTES OF TXT ELEMENT AND PARSE ITS DATA & REMEMBER JSON DATA SHOULD BE ON "" NOT ''
    const words = JSON.parse(txtElement.getAttribute('data-words')) ;
    const wait = txtElement.getAttribute('data-wait');
    console.log(txtElement);
    console.log(words);
    console.log(wait);
    // INITILIZE TYPE WRITER & WE MAKE IT BY NEW
    new typeWriter(txtElement , words , wait);
}
// START ABOUT-ME SECTION
window.addEventListener('load' , function(){
    let container = document.getElementById('container');
    let topLayer = document.querySelector('.top');
    let handle = document.querySelector('.handle');
    // console.log(container);
    // console.log(topLayer);
    // console.log(handle);
    let skew  = 0 ;
    let delta = 0 ;

    if (container.className.indexOf('skewed') != -1){
        skew = 1000;
    }
    
    container.addEventListener('mousemove' , function(e){
        delta = (e.clientX - window.innerWidth / 2) * 0.5;
        handle.style.left = e.clientX + delta + 'px';
    
        topLayer.style.width = e.clientX + skew + delta + 'px';
    
    })
});

