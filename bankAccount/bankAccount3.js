var accounts = []

function createAccount(account){
  accounts.push(account)
  return account
}

function getAccount(userName){
  var matchedAccount;

  for(i = 0; i < accounts.length; i++){
     if(accounts[i].username === userName){
       matchedAccount = accounts[i]
    }
  }
  return matchedAccount
}

function deposit (account, amount) {
  if(typeof amount === 'number'){
    account.balance += amount
  } else {
    console.log('Incorrect type of amount')
    throw new Error('Incorrect type of amount')
  }
}

function withdraw (account, amount) {
  if(typeof amount === 'number'){
    account.balance -= amount
  } else {
    console.log('Incorrect type of amount')
    throw new Error('Incorrect type of amount')
  }
}

function getBalance (account) {
  return account.balance
}

function createBalenceGetter(account){
  return function(){
    return account.balance
  }
}

var Guilherme = createAccount({
  username: 'Guilherme',
  balance: 0
})

deposit(Guilherme, 189)

// console.log(getBalance(Guilherme))

var Jerrey = createAccount({
  username: 'Jerrey',
  balance: 12
})

// var Jerrey = createAccount({
//   username: 'Thomas',
//   balance: 12
// })
console.log(getAccount('Guilherme'))
// console.log(accounts)