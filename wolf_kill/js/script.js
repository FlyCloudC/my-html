var cards;

function add(x, n){
  if(!n) n = 1;
  for(var i = 0; i < n; ++i) cards.push(x);
}

function newGame(){
  cards = new Array();
  add("狼人", 3);
  add("村民", 3);
  add("预言家");
  add("女巫");
  add("猎人");
 }
 
 function nextCard(){
   if(!cards.length) return alert("没牌了");
   var c = Math.floor(Math.random() * cards.length);
   alert(cards[c]);
   cards.splice(c, 1);
 }