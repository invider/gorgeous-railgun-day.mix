function hidePort() {
    lab.port.hide()
}

function showPort() {
    lab.port.show()
}

function hideAllExcept(name) {
    if (name !== 'port') hidePort()
    lab.state._ls.forEach( state => {
        if (state.name !== name && state.hide) {
            state.hide()
        }
    })
}

function hideAll() {
    hideAllExcept('none')
}

function switchTo(name, st) {
    if (name === 'port') {
        hideAllExcept('port')
        showPort()
    } else {
        hideAllExcept(name)
        lab.state[name].show()
    }
    env.state = name
}

function transitTo(name, st) {
    if (name !== 'port' && !lab.state[name]) {
        throw `can't transit to unknown state [${name}]`
    }
    log(`fading to [${name}]`)

    const ts = {
        fadein:  2,
        keep:    0.5,
        fadeout: 2,

        onFadeOut: function() {
            switchTo(name)
            if (this.next) this.next()
        }
    }
    augment(ts, st)
    lab.vfx.transit(ts)
}
