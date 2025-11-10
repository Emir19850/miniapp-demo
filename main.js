let queue = [];
const maxQueue = 10;
let currentBet = 1;
let balance = 100;
let ranking = [];

const joinBtn = document.getElementById('joinBtn');
const queueList = document.getElementById('queueList');
const resultDiv = document.getElementById('result');
const winnerText = document.getElementById('winnerText');
const newGameBtn = document.getElementById('newGameBtn');
const playerNameInput = document.getElementById('playerName');
const profileName = document.getElementById('profileName');
const profileBalance = document.getElementById('profileBalance');
const walletBalance = document.getElementById('walletBalance');
const depositBtn = document.getElementById('depositBtn');
const depositAmount = document.getElementById('depositAmount');
const rankingList = document.getElementById('rankingList');

const gameOptionBtns = document.querySelectorAll('.gameOption');
const customBetInput = document.getElementById('customBet');

const tabs = document.querySelectorAll('.tab');
const navButtons = document.querySelectorAll('.bottomNav button');

function switchTab(tabId){
  tabs.forEach(t=>t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}
navButtons.forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.tab)));

gameOptionBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    currentBet=parseInt(btn.dataset.bet);
    customBetInput.value='';
    alert(`Вы выбрали ставку ${currentBet} TON`);
  });
});

customBetInput.addEventListener('input',()=>{
  const val=parseInt(customBetInput.value);
  if(val>0) currentBet=val;
});

function updateQueueUI(){
  queueList.innerHTML='';
  queue.forEach((p,i)=>{
    const li=document.createElement('li');
    li.textContent=`${i+1}. ${p} (ставка ${currentBet} TON)`;
    queueList.appendChild(li);
  });
}

function updateProfile(){
  profileName.textContent=playerNameInput.value||'-';
  profileBalance.textContent=balance+' TON';
  walletBalance.textContent=balance+' TON';
}

function updateRanking(){
  rankingList.innerHTML='';
  ranking.forEach(r=>{
    const li=document.createElement('li');
    li.textContent=`${r.name} - ${r.balance} TON`;
    rankingList.appendChild(li);
  });
}

function finishQueue(){
  const loserIndex=Math.floor(Math.random()*maxQueue);
  const loser=queue[loserIndex];
  const winners=queue.filter((_,i)=>i!==loserIndex);
  winnerText.innerHTML=`❌ Проиграл: ${loser}<br>🎉 Победители: ${winners.join(', ')} (1.1× ставки)`;
  
  if(playerNameInput.value===loser) balance-=currentBet;
  else if(winners.includes(playerNameInput.value)) balance+=currentBet*1.1;

  ranking.push({name:playerNameInput.value,balance});
  updateRanking();
  resultDiv.style.display='block';
  queue=[];
  updateQueueUI();
  updateProfile();
}

joinBtn.addEventListener('click',()=>{
  const name=playerNameInput.value.trim();
  if(!name) return alert('Введите имя');
  if(queue.length>=maxQueue) return alert('Очередь заполнена');
  queue.push(name);
  updateQueueUI();
  updateProfile();
  if(queue.length===maxQueue) finishQueue();
});

newGameBtn.addEventListener('click',()=>{
  resultDiv.style.display='none';
  queue=[];
  updateQueueUI();
});

depositBtn.addEventListener('click',()=>{
  const val=parseFloat(depositAmount.value);
  if(isNaN(val)||val<=0) return alert('Введите сумму');
  balance+=val;
  updateProfile();
  depositAmount.value='';
});
