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
        if (this.disabled || this.__.disabled) return

        switch(action.name) {
            case 'A':
            case 'B':
                // TODO make into evolvable action to charge/animate and preserve the rate of fire
                // imediate for now
                if (this.__.primaryWeapon) {
                    this.__.primaryWeapon.fire()
                }
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
        if (this.disabled || this.__.disabled) return
    }
}
