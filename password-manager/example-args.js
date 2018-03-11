var argv = require('yargs')
    .command('create', 'Create a new User Account', function(yargs){
        yargs.options({
            name: {
                demand: true,
                alias: n,
                description: 'Name from new account',
                type: string
            }
        })
    })
    .argv

console.log(argv)

