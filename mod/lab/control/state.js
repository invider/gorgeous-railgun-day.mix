const stateDir  = {}
const stateList = []

// include new state into the state controller
//
// The state object is going to be supplemented by the stateTrait if present
// and dllisabled by default.
//
// @param {object} - top state node
function include(state) {
    if (!state || !isObj(state) || !state.name) throw 'Wrong state node!'

    if (stateDir[state.name]) {
        log.warn(`State already included: [${state.name}]`)
    }

    if (dna.trait.stateTrait) supplement(state, dna.trait.stateTrait)
    stateDir[state.name] = state
    stateList.push(state)

    state.disable()
}

function setup() {
    // include all in /lab/state by default if present
    if (lab.state) lab.state._ls.forEach(state => {
        include(state)
    })
}

function disableAllExcept(name) {
    stateList.forEach( state => {
        if (state.name !== name && state.disable) {
            state.disable()
        }
    })
}

function disableAll() {
    disableAllExcept('')
}

function switchTo(name, force) {
    if (name === env.state && !force) return // ignore request, we're already at this state

    const nextState = stateDir[name]
    if (!nextState) throw `Can't switch to unknown state: [${name}]`

    disableAll()
    nextState.enable()

    env.state = name
    env.subState = name
    log(`=== ${name} state ===`)
}

function transitTo(name, st) {
    const nextState = stateDir[name]
    if (!nextState) {
        throw `Can't transit to unknown state: [${name}]`
    }

    env.subState = env.state + ' -> ' + name
    log(`transiting ${env.subState}`)

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
