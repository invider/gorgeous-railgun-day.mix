class SpacecraftPadControl {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'control',
            alias:   'control',
            name:    'spacecraftPadControl',
        }, st)
    }

    preInstall(body) {
        if (!body.attitude) throw `an attitude pod is expected in [${body.name}]!`
        if (!body.thruster) throw `a thruster pod is expected in [${body.name}]!`
    }

    actuate(action) {
        const __ = this.__

        switch(action.name) {
            case 'A':
            case 'B':
                // TODO make into evolvable action to charge/animate and preserve the rate of fire
                // imediate for now
                if (__.primaryWeapon) __.primaryWeapon.trigger()
                break
        }
    }

    act(action, dt) {
        const __ = this.__

        switch(action.name) {
            case 'LEFT':
                __.attitude.left(dt)
                break
            case 'RIGHT':
                __.attitude.right(dt)
                break
            case 'UP':
                __.thruster.forward(dt)
                break
            case 'DOWN':
                __.thruster.backward(dt)
                break
        }
    }

    cutOff(action) {
        const __ = this.__

        switch(action.name) {
            case 'A':
            case 'B':
                if (__.primaryWeapon) __.primaryWeapon.stop()
                break
        }
    }
}
