const db = require('../db');

module.exports = {
    name: 'add',
    description: 'Create a new redirect',
    public: true, 
    execute(ctx){
        const { splitArgs } = ctx.state.command;
        splitArgs[1] = splitArgs[1].startsWith('-100') ? splitArgs[1].substring(4) : splitArgs[1];
        splitArgs[1] = splitArgs[1].replace(/\D/g,'');
        db.query({
            text: 'INSERT INTO redirect(title, origin, destination) VALUES($1, $2, $3)',
            values: splitArgs
        }, (err, res) => {
            if(err){
                ctx.reply(err.message)
            } else {
                ctx.reply('📨 Redirect added successfully');
            }
        })
    }
}