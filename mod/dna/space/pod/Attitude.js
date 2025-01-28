const FORWARD  = 1,
      BACKWARD = 2,
      LEFT     = 3,
      RIGHT    = 4

class Attitude {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'propulsion',
            name:    'attitude',

            turnSpeed:    PI,
        }, st)
    }

    left(dt) {
        this.__.dir -= this.turnSpeed * dt
    }

    right(dt) {
        this.__.dir += this.turnSpeed * dt
    }
}
