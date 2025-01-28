class PadControl {

    constructor(st) {
        extend(this, {
            alias: 'control',
            name:  'padControl',
        }, st)
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
