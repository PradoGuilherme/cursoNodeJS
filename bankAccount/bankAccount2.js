var accounts = []

// Account Object -> ballance (number), userName (string)

// createAccount(account)
// push onto account arryas
// return account
function createAccount(account){
  accounts.push(account)
  return account
}
// getAccount(userName) -> find using forEach
function getAccount(userName){
  var matchedAccount;
  accounts.forEach(function(account){
    if(account.username === userName){
      matchedAccount = account
    }
  })
  return matchedAccount
}
// deposit(account, amount)
function deposit (account, amount) {
  account.balance += amount
}

// withdraw(account, amount)
function withdraw (account, amount) {
  account.balance -= amount
}

// getBalance(account)
function getBalance (account) {
  return account.balance
}

var Guilherme = createAccount({
  username: 'Guilherme',
  balance: 0
})

deposit(Guilherme, 100)

console.log(getBalance(Guilherme))
console.log(getAccount('Guilherme'))

var Jerrey = createAccount({
  username: 'Jerrey',
  balance: 12
})

console.log(accounts)