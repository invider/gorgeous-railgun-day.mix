function bot(args, line, con) {
    if (!env.selected || env.selected.type !== 'spacecraft') {
        con.print('Select a ship first!')
    } else {
        const craft = env.selected
        con.print(`Passing control to bot for [${craft.name}]`)
        craft.install( new dna.space.pod.Bot() )
        con.hide()
    }
}

bot.info = 'Pass control over a selected ship to a bot'
