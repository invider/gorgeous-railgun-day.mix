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

    activate(action) {
        const __ = this.__
        if (this.disabled || __.disabled) return

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
        if (this.disabled || this.__.disabled) return

        switch(action.name) {
            case 'LEFT':
                this.__.attitude.left(dt)
                break
            case 'RIGHT':
                this.__.attitude.right(dt)
                break
            case 'UP':
                this.__.thruster.forward(dt)
                break
            case 'DOWN':
                this.__.thruster.backward(dt)
                break
        }
    }

    deactivate(action) {
        const __ = this.__
        if (this.disabled || __.disabled) return

        switch(action.name) {
            case 'A':
            case 'B':
                if (__.primaryWeapon) __.primaryWeapon.stop()
                break
        }
    }
}
