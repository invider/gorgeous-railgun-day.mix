const FORWARD  = 1,
      BACKWARD = 2,
      LEFT     = 3,
      RIGHT    = 4

class Attitude {

    constructor(st) {
        extend(this, {
            name: 'attitude',

            speed:        0,
            turnSpeed:    PI,

            acceleration: 20,
            deceleration: 10,
            maxSpeed:     100,
            setSpeed:     100,
            maxRevSpeed:  -50,
            setRevSpeed:  -50,
        }, st)
    }

    forward(dt) {
        if (this.__.speed >= this.setSpeed) return
        this.__.speed = min( this.__.speed + this.acceleration * dt, this.setSpeed )
    }

    backward(dt) {
        if (this.__.speed <= this.setRevSpeed) return
        this.__.speed = max( this.__.speed - this.deceleration * dt, this.setRevSpeed )
    }

    left(dt) {
        this.__.dir -= this.turnSpeed * dt
    }

    right(dt) {
        this.__.dir += this.turnSpeed * dt
    }
}
