// controllers.js
let accounts = {};

const deposit = (eventData) => {
  const accountId = eventData.destination;
  const amount = eventData.amount;

  if (!accounts[accountId]) {
    accounts[accountId] = { id: accountId, balance: 0 };
  }

  accounts[accountId].balance += amount;
  return accounts[accountId];
};

const withdraw = (eventData) => {
  const accountId = eventData.origin;
  const amount = eventData.amount;
  accounts[accountId].balance -= amount;
  return accounts[accountId];
};

const resetAccounts = () => {
  accounts = {};
};

const getBalance = (accountId) => {
  if (!accounts[accountId]) {
    return 0;
  } else {
    return accounts[accountId].balance;
  }
};

const handleEvent = (eventData) => {
  switch (eventData.type) {
    case 'deposit':
      return { destination: deposit(eventData) };
    case 'withdraw':
      if (!accounts[eventData.origin] || accounts[eventData.origin].balance < eventData.amount) {
        return 0;
      } else {
        return { origin: withdraw(eventData) };
      }
    case 'transfer':
      const originId = eventData.origin;
      const destinationId = eventData.destination;
      const amount = eventData.amount;

      if (!accounts[destinationId]) {
        accounts[originId].balance -= amount;
        return { origin: accounts[originId], destination: deposit(eventData) };
      } else {
        return 0;
      }
    default:
      return { error: 'Invalid event type' };
  }
};

module.exports = { resetAccounts, getBalance, handleEvent };
