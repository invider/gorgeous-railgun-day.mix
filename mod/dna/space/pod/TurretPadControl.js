class TurretPadControl {

    constructor(st) {
        extend(this, {
            alias: 'control',
            name:  'turretPadControl',
        }, st)
    }

    preInstall(body) {
        if (!body.attitude) throw `an attitude pod is expected in [${body.name}]!`
        if (!body.primaryWeapon) throw `a primary weapon pod is expected in [${body.name}]!`
    }

    actuate(action) {
        const __ = this.__

        switch(action.name) {
            case 'A':
            case 'B':
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
        }
    }

    cutOff(action) {
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
