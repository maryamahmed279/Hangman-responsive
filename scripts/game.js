let divkeyboard=document.querySelector('.keyboards');
let div_score=document.querySelector('.score');
let type=document.getElementById('type');//the span to display the type
let spaces=document.getElementById('spaces');//the span to display the spaces
// array for indexing the letters and the ids 
let index=[];
let count=0;
let score=0;//how many points  the user get 
let live=7;//the lives that are left
function gen_btn()
{
    // the indixing of the id for each item
     for(let i=97;i<=122;i++)
     {
         index[count]=String.fromCharCode(i);
         creation();
         count++;
     }
     count=0;
}
// the creation of the divs and the buttons for the keyboard items
function creation()
{
    let div=document.createElement('div');
    div.id=index[count];
    div.innerHTML=`<button id="${index[count]}" onclick="btn(${count})">${index[count]}</button>`;
    div.classList.add('btn');
    divkeyboard.appendChild(div);
}
gen_btn();//generat the btns
  div_score.innerHTML = `Lives ❤️: ${live} &nbsp;&nbsp;Score: ${score}`;
// array of objects for the words
let words=[{type:'animal',name:'cat'},
    {type:'sport',name:'swimming'},
    {type:'animal',name:'dog'},
    {type:'animal',name:'horse'},
    {type:'animal',name:'lion'},
    {type:'sport',name:'boxing'},
    {type:'sport',name:'baseball'},
    {type:'sport',name:'golf'}
];
//to display the number of spaces accoring the letters and type of word
let s=0;//to display the spaces numbers
let item=[];//to put the - sign 

words=shuffleArray(words);//to shuffel the array 
function display_spaces_type()
{
    type.innerText=words[count].type;
    s=words[count].name.length;
    for(let i=0;i<s;i++)
    {
        item[i]='-';
    }
   spaces.innerText = item.join('');//remove the , with the join 
}
display_spaces_type();
//select all the buttons in the keyboard 
let btns=document.querySelectorAll('.btn');
//select the clicked button 
//get the indexof the button from the array 
function btn(c){
    console.log(c);
    console.log(index[c]);
    console.log(btns[c]);
    //disable the button
    btns[c].querySelector(`#${index[c]}`).disabled = true;
    check(index[c]);
}
//function to check the value with the key
let string;//the value that will be dis
function check(value)
{
    //if the enterd value "letter is not found "
    if(!words[count].name.includes(value))
    {
        console.log("in fallseeeee");
        live--;
        div_score.innerHTML = `Lives ❤️: ${live} &nbsp;&nbsp;  Score: ${score}`;
        dis_body();
    }
    else{
        console.log("in tureeeee");
        for(let i=0;i<words[count].name.length;i++)
        {
            console.log(words[count].name[i]);
            if(words[count].name[i]==value)
            {
                item[i]=value;
            }
        }
        spaces.innerText = item.join('');
        score++;
        div_score.innerHTML = `Lives ❤️: ${live} &nbsp;&nbsp;  Score: ${score} `;
    }
    next_qus();
}
//the elemnts that have the body ids
let head=document.getElementById("head");
let stomach=document.getElementById("stomach");
let right_hand=document.getElementById("right-hand");
let left_hand=document.getElementById("left-hand");
let right_leg=document.getElementById("left-leg");
let left_leg=document.getElementById("right-leg");
//diplsay the body with each live dec
function dis_body()
{
    if(live==6)
    {
        head.style.display='flex';

    }
    else if(live==5)
    {
        stomach.style.display='block';
    }
    else if(live==4)
    {
        right_hand.style.display='block';
    }
    else if(live==3)
    {
        left_hand.style.display='block';
    }
    else if(live==2)
    {
        right_leg.style.display='block';
    }
    else if(live==1)
    {
        left_leg.style.display='block';
    }
}
//function to upload next question 
//--> check the lives they are not 0
//-->make sure that the list is all full with the letters
function next_qus()
{
    //the player is dead
    if(live==0 && item.includes('-'))
    {
        disable_btn();
        localStorage.setItem('the score',score);
        window.location.href = "gameover.html";
    }
    else if(live!=0 && !item.includes('-'))
    {
        count=(count+1)%words.length;
        item=[];
        display_spaces_type();
        enable_btn();
    }
}
//set all the buttons enable again
function enable_btn()
{
    index.forEach((e)=>{
        console.log(e);
    document.getElementById(`${e}`).querySelector('button').disabled = false;
    });
}
//set all the buttons disable
function disable_btn()
{
    index.forEach((e)=>{
        console.log(e);
    document.getElementById(`${e}`).querySelector('button').disabled = true;
    });
}
//shuffel the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
