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

    activate(action) {
        switch(action.name) {
            case 'A':
            case 'B':
                // TODO make into evolvable action to charge/animate and preserve the rate of fire
                // imediate for now
                this.__.primaryWeapon.fire()
                break
        }
    }

    act(action, dt) {
        switch(action.name) {
            case 'LEFT':
                this.__.attitude.left(dt)
                break
            case 'RIGHT':
                this.__.attitude.right(dt)
                break
        }
    }
}
