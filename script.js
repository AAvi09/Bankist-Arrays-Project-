'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = movements => {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i, arr) => {
    const type = mov > 0 ? `deposit` : `withdrawal`;

    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  
    <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => mov + acc, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};
calcDisplayBalance(account1);

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}💶`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}💶`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}💶`;
};

// calcDisplaySummary(account1.movements);
const createUsernames = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = acc => {
  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};
console.log(accounts);

let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `wlecome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, Map) {
  console.log(`${key} : ${value}`);
});

const currency = new Set(['usd', 'eur', 'gbp', 'usd', 'eur', 'eur']);
currency.forEach(function (value, key, set) {
  console.log(`${key}:${value}`);
});

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
const lastWithDrawal = movements.findLast(mov => mov < 0);
console.log(lastWithDrawal);

const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000
);
console.log(
  `your latest large movement was ${
    movements.length - latestLargeMovementIndex
  } movements ago`
);
const anyDeposits = movements.some(mov => mov > 0);
console.group('*--*-*--*--*--*-*FOR-EACH-----**-*--*-*-*-*-*-*-*-*-*-*');
movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1} : You deposited ${mov}`);
  } else {
    console.log(`Movemet ${i + 1} : You withdrew ${Math.abs(mov)}`);
  }
});
/////////////////////////////////////////////////

//SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

//SPLICE
// arr.splice(2);
// console.log(arr);

//REVERSE
let arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT
const letters = arr.concat(arr2);
console.log(letters);

console.log(letters.join('-'));
// function createStudent(name) {
//   // name parameter is in function scope
//   let score = 0; // private variable in function scope

//   return {
//     getName: function () {
//       return name; // lexically bound to parent scope
//     },
//     updateScore: function (newScore) {
//       score = newScore; // can access parent's score
//     },
//     getScore: function () {
//       return score; // can access parent's score
//     },
//   };
// }

// let student = createStudent('Raj');
// console.log(student.getName()); // "Raj"
// student.updateScore(95);
// console.log(student.getScore()); // 95

// function disclaimer(message) {
//   let x = message + ' ***yeh kewal darane ke liye demand he***';

//   return function content(pooraMessage) {
//     let y = x + pooraMessage + ' ***ye poori dhamki huiii*** ';
//     console.log(y);
//   };
// }

// let dhamki1 = disclaimer('paise jldi nikal💲💵💶💷💳💸💰💴💱🧧');
// dhamki1(
//   ' wrna goli🔫💣 maar maar kar tambaa bhrr dunga shareer ke andrr🔥🧨👩‍🚒'
// );

// function createBankAccount(initialBalance) {
//   let balance = initialBalance;
//   let transactions = [];

//   return {
//     deposit: function (amount) {
//       balance += amount;
//       transactions.push({ type: 'deposit', amount });
//       return `Balance : ${balance}`;
//     },
//     withdraw: function (amount) {
//       if (amount > balance) {
//         return `not sufficient funds available in the account`;
//       }
//       balance -= amount;
//       transactions.push({ type: 'withdraw', amount });
//       return `Balance: ${balance}`;
//     },
//     getBalance: function () {
//       return balance;
//     },
//     getTransactionHistory: function () {
//       return transactions;
//     },
//   };
// }
// let account = createBankAccount(1000);
// console.log(account.deposit(500)); // Balance: 1500
// console.log(account.withdraw(200)); // Balance: 1300
// console.log(account.getTransactionHistory());

// function showName() {
//   this.name = 'john';
//   this.showName = () => {
//     console.log(this.name);
//   };
// }

// const result = new showName();
// const output = result.showName;
// output();

const names = ['rocko', 'paulie', 'jimmy', 'tommy', 'adrian'];
console.log(names.slice(2, 4));
console.log(names.splice(2, 2));

const numbers = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const numbers2 = numbers.reverse();
console.log(numbers2);

const euroToUsd = 1.1;

const movementUSD = movements.map(mov => mov * euroToUsd);
console.log(movements);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1} : You ${mov > 0 ? 'deposited ' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription);

const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
console.log(deposits);
console.log(withdrawals);

//MAXIMUM VALUE
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

console.log(max);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
