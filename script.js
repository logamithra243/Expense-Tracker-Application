const transactionForm = document.getElementById('transactionForm');
const transactionList = document.querySelector('.transaction'); 
let incomeTotal = 0;
let expenseTotal = 0;

transactionForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value); 
  const description = document.getElementById('description').value;
  const transactionType = document.querySelector('input[name="transactionType"]:checked').value; 
  let newBalance;

  if (transactionType === 'income') {
    incomeTotal += amount;
    newBalance = incomeTotal - expenseTotal;
    document.getElementById('inc-amt').textContent = `₹ ${incomeTotal.toFixed()}`; 
  } else {
    expenseTotal += amount;
    newBalance = incomeTotal - expenseTotal;
    document.getElementById('exp-amt').textContent = `₹ ${expenseTotal.toFixed()}`; 
  }

  document.getElementById('balance').textContent = `₹ ${newBalance.toFixed()}`;

  const balanceElement = document.getElementById('balance');
  balanceElement.textContent = `₹ ${newBalance.toFixed()}`;

  if (newBalance < 0) {
    balanceElement.style.color = 'red';
  } else {
    balanceElement.style.color = 'white';
  }

  const newTransaction = document.createElement('div');
  newTransaction.classList.add('transaction-item'); 

  if (transactionType === 'expense') {
    newTransaction.classList.add('expense');
  }

  const formattedDate = new Date(date).toLocaleDateString();

  const transactionContent = `
    <p>${formattedDate} - ${category} - ₹ ${transactionType === 'income' ? amount.toFixed() : `- ${amount.toFixed()}`} - ${description}</p>
    <button class="delete-btn">Delete</button>
  `;
  newTransaction.innerHTML = transactionContent;

  newTransaction.querySelector('.delete-btn').addEventListener('click', function() {
    transactionList.removeChild(newTransaction);
    if (transactionType === 'income') {
      incomeTotal -= amount;
    } else {
      expenseTotal -= amount;
    }
    newBalance = incomeTotal - expenseTotal;
    document.getElementById('balance').textContent = `₹ ${newBalance.toFixed()}`;
    document.getElementById('inc-amt').textContent = `₹ ${incomeTotal.toFixed()}`;
    document.getElementById('exp-amt').textContent = `₹ ${expenseTotal.toFixed()}`;

    if (newBalance < 0) {
      balanceElement.style.color = 'red';
    } else {
      balanceElement.style.color = 'white';
    }
  });

  transactionList.appendChild(newTransaction);
  transactionForm.reset();
});



