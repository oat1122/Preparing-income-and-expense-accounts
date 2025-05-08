const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];

function init() {
  list.innerHTML = "";
  transactions.forEach(addDataToList);
  calculateMoney();
}

function addDataToList(transactions) {
  const symbol = transactions.amount < 0 ? "-" : "+";
  const status = transactions.amount < 0 ? "minus" : "plus";
  const item = document.createElement("li");
  result = numberWithCommas(Math.abs(transactions.amount));
  item.classList.add(status);
  item.innerHTML = `${transactions.text} <span>${symbol} ${result}</span> <button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;

  list.appendChild(item);
}
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function calculateMoney() {
  const amounts = transactions.map((transactions) => transactions.amount);
  // คำนวณยอดรวม
  const total = amounts
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);

  // คำนวณรายรับรวม
  const income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  // คำนวณรายจ่ายรวม
  const expense = (
    amounts
      .filter((item) => item < 0)
      .reduce((result, item) => (result += item), 0) * -1
  ).toFixed(2);

  // แสดงผล
  balance.innerText = `${numberWithCommas(total)} ฿`;
  money_plus.innerText = `+${numberWithCommas(income)} ฿`;
  money_minus.innerText = `${numberWithCommas(expense)} ฿`;
}
function autoID() {
  return Math.floor(Math.random() * 1000000);
}

function removeData(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  init();
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  } else {
    const data = {
      id: autoID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(data);
    addDataToList(data);
    calculateMoney();
    text.value = "";
    amount.value = "";
  }
}

form.addEventListener("submit", addTransaction);
init();
