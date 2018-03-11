const storage = require('node-persist')
const crypto = require('crypto-js')
var argv = require('yargs')
    .command('create', 'Create a new User Account', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Name from new account',
                type: 'string'
            },
            username: {
                demand: true,
                alias: 'u',
                description: 'Username from new account',
                type: 'string'
            },
            password: {
                demand: true,
                alias: 'p',
                description: 'Password from new account',
                type: 'string'
            }, masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master Password from new account',
                type: 'string'
            }
        }).help('help')
    })
    .command('get', 'Get accounts users', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Name from new account',
                type: 'string'
            }, masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master Password from new account',
                type: 'string'
            }
        })
    })
    .help('help')
    .argv
var command = argv._[0]


storage.initSync()

//storage.clear();

function getAccounts(masterPassword) {
    var encriptedAccounts = storage.getItemSync('accounts')
    var accounts = []

    if (typeof encriptedAccounts !== 'undefined') {
        var bytes = crypto.AES.decrypt(encriptedAccounts, masterPassword)
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8))
    }
    return accounts
}

function saveAccounts(accounts, masterPassword) {
    var encriptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword)

    storage.setItem('accounts', encriptedAccounts.toString())

    return accounts
}

function createAccount(account, masterPassword) {
    var accounts = getAccounts(masterPassword)
    accounts.push(account)

    saveAccounts(accounts, masterPassword)

    return account
}

function getAccount(accountName, masterPassword) {
    var accounts = getAccounts(masterPassword)
    var machedAccount;

    accounts.forEach(function (account) {
        if (accountName === account.name) {
            machedAccount = account
        }
    })

    return machedAccount
}

if (command === 'create') {
    try {
        var CreateAccount = createAccount({
            name: argv.name,
            userName: argv.username,
            password: argv.password
        }, argv.masterPassword)
        console.log('Account created: ', CreateAccount)
    } catch (e) {
        console.log('Unable to create account. Message error: ', e.message)
    }
} else if (command === 'get') {
    try {
        var fetchedAccount = getAccount(argv.name, argv.masterPassword)
        if (typeof fetchedAccount === 'undefined') {
            console.log('Account not found');
        } else {
            console.log('Account found: ', fetchedAccount)
        }
    } catch (e) {
        console.log('Unable to find account. Message error: ', e.message)
    }
}

// var newUserAccount = {
//     name: 'Guilherme',
//     userName: 'guilherme.prado',
//     password: '123mudar'
// }

// //createAccount(newUserAccount)

// var account = getAccount('Guilherme')
// console.log(account)
