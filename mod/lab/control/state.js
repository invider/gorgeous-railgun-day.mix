const stateDir  = {}
const stateList = []

class GroupState {

    constructor(st) {
        extend(this, st)

        if (!isString(this.name)) throw new Error('Group state MUST have a name')
        if (!isArray(this.states) || this.states.length === 0) throw new Error('Group state MUST have a states list')
    }

    activate() {
        this.states.forEach(state => activateState(state))
    }

    deactivate() {
        this.states.forEach(state => deactivateState(state))
    }
}

// include new state into the state controller
//
// The state object will be deactivated by default
//
// @param {object} - state node
function include(state) {
    if (!state || !isObj(state) || !state.name) throw new Error('Wrong state node!')

    if (stateDir[state.name]) {
        log.warn(`The state is already included: [${state.name}]`)
    }
    stateDir[state.name] = state
    stateList.push(state)

    deactivateState( state )
}

function includeAll(states) {
    if (!states || !isArray(states)) throw `Array of states is expected!`
    states.forEach(state => include(state))
}

function group(name, states) {
    this.include(new GroupState({
        __: this,
        name,
        states,
    }))
}

function setup() {
    // include all in /lab/state by default if present
    if (lab.state) lab.state._ls.forEach(state => {
        include(state)
    })
}

function deactivateState(state) {
    if (isFun(state.deactivate)) {
        // direct deactivation
        state.deactivate()
    } else {
        // staged deactivation
        state.deactivated = true
        if (isFun(state.hide)) {
            state.hide()
        } else {
            state.hidden = true
            if (state.onHide) state.onHide()
        }
        if (isFun(state.pause)) {
            state.pause()
        } else {
            state.paused = true
            if (state.onPause) state.onPause()
        }
        if (isFun(state.disable)) {
            state.disable()
        } else {
            state.disabled = true
            if (state.onDisable) state.onDisable()
        }
    }
}

function deactivateAllExcept(name) {
    stateList.forEach( state => {
        if (state.name !== name) {
            deactivateState(state)
        }
    })
}

function deactivateAll() {
    deactivateAllExcept('')
}

function activateState(state) {
    if (!state) throw `Missing state entity!`

    if (isFun(state.activate)) {
        state.activate()
    } else {
        state.deactivated = false
        if (isFun(state.show)) {
            state.show()
        } else {
            state.hidden = false
            if (isFun(state.onShow)) state.onShow()
        }
        if (isFun(state.resume)) {
            state.resume()
        } else {
            state.paused = false
            if (isFun(state.onResume)) state.onResume()
        }
        if (isFun(state.enable)) {
            state.enable()
        } else {
            state.disabled = false
            if (state.onEnable) state.onEnable()
        }
    }
}

function switchTo(target, force) {
    const targetStates = [],
          targetNames  = []

    function addTarget(name, state) {
        if (!name && !state) throw `Unknown annonymous state!`

        if (name && !state) {
            state = stateDir[name]
            if (!state) throw `Can't switch to unknown state: [${name}]`
        }

        targetStates.push(state)
        if (name) targetNames.push(name)
    }

    if (isString(target)) {
        addTarget(target)
    } else if (isArray(target)) {
        target.forEach(subTarget => {
            if (isString(subTarget)) {
                addTarget(subTarget)
            } else if (isObject(subTarget)) {
                addTarget(subTarget.name, subTarget)
            } else {
                throw `Can't switch - wrong state list entry: [${subTarget}]`
            }
        })
    } else if (isObj(target)) {
        addTarget(target.name, target)
    } else {
        throw `Can't switch - wrong state entry: [${target}]`
    }

    const name = targetNames.join(',')
    if (name === env.state && !force) return // ignore request, we're already at this state

    deactivateAll()

    env.state = name
    env.transition = 'none'
    log(`=== state: ${name} ===`)
    targetStates.forEach(state => activateState(state))
}

function transitTo(name, st) {
    /*
    const nextState = stateDir[name]
    if (!nextState) {
        throw `Can't transit to unknown state: [${name}]`
    }
    */

    env.transition = env.state + ' -> ' + name
    log(`transiting ${env.transition}`)

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
