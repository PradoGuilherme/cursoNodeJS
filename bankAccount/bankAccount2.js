var account = []

// Account Object -> ballance (number), userName (string)

// createAccount(account)
// push onto account arryas
// return account

// getAccount(userName) -> find using forEach

// deposit(account, amount)
function deposit (account, amount) {
  account.ballance += amount
}

// withdraw(account, amount)
function withdraw (account, amount) {
  account.ballance -= amount
}

// getBalance(account)
function getBalance (account) {
  return account.ballance
}

deposit(account, 1555)

console.log(getBalance(account))

withdraw(account, 155)

console.log(getBalance(account))
