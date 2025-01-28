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
    }

    act(action, dt) {
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
    }
}
