class Bot {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'ai',
            name:    'bot',
        }, st)
    }

    preInstall(body) {
        if (!body.targeting) throw `a targeting pod is expected in [${body.name}]!`
    }

    evo(dt) {
    }


}
