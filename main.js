console.log('MiniApp loaded');

let queue = [];
const maxQueue = 10;

const buyBtn = document.getElementById('buyTicketBtn');
const queueList = document.getElementById('queueList');
const resultDiv = document.getElementById('result');
const winnerText = document.getElementById('winnerText');
const newGameBtn = document.getElementById('newGameBtn');
const playerNameInput = document.getElementById('playerName');

function updateQueueUI() {
  queueList.innerHTML = '';
  queue.forEach((player, i) => {
    const li = document.createElement('li');
    li.textContent = `Место ${i + 1}: ${player}`;
    queueList.appendChild(li);
  });
}

function finishQueue() {
  const loserIndex = Math.floor(Math.random() * maxQueue);
  const loser = queue[loserIndex];
  const winners = queue.filter((_, i) => i !== loserIndex);
  winnerText.innerHTML = `
    ❌ Проиграл: ${loser} <br>
    🎉 Победители (получают 1.1 TON): ${winners.join(', ')}
  `;
  resultDiv.style.display = 'block';
  queue = [];
  updateQueueUI();
}

buyBtn.addEventListener('click', () => {
  const userName = playerNameInput.value.trim();
  if (!userName) return alert('Введите имя!');

  if (queue.length >= maxQueue) {
    alert('Очередь заполнена, ждите следующего раунда');
    return;
  }

  queue.push(userName);
  updateQueueUI();

  playerNameInput.value = '';

  if (queue.length === maxQueue) {
    finishQueue();
  }
});

newGameBtn.addEventListener('click', () => {
  resultDiv.style.display = 'none';
  queue = [];
  updateQueueUI();
});
