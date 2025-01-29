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

            turnVelocity:    PI,
        }, st)
    }

    left(dt) {
        this.__.dir -= this.turnVelocity * dt
    }

    right(dt) {
        this.__.dir += this.turnVelocity * dt
    }
}
