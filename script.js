const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");


let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

transactionFormEl.addEventListener('submit', addTrasaction);


function addTrasaction(e){
  e.preventDefault();


  const description = descriptionEl.value.trim();
  const amount =  parseFloat( amountEl.value);

  transactions.push ({
    id: Date.now(), 
    description,
    amount
  });

  localStorage.setItem('transaction', JSON.stringify(transactions));

  updateTransactionList();
  // updateSummary();

  transactionFormEl.reset();
}

function updateTransactionList(){
  transactionListEl.innerHTML = '';

  const sortedTransactions = [...transactions].reverse();

  sortedTransactions.forEach((transaction) => {
    const transactionEl = createTransactionElement(transaction);
    transactionListEl.appendChild(transactionEl);
  });
}

function createTransactionElement(transaction){
  const li = document.createElement('li');
  li.classList.add('transaction');
  li.classList.add(transaction.amount > 0 ? 'income' : 'expenses')

  li.innerHTML =`
    <span>${transaction.description}</span>
    <span>${transaction.amount}
      <button class="delete-btn" onclick="removeTransanction(${transaction.id})">x</button>
    </span>
  `


  return li;
}