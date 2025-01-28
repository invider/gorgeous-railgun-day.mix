class Thruster {

    constructor(st) {
        extend(this, {
            type:    'solid',
            subtype: 'propulsion',
            name:    'thruster',

            speed:        0,

            // specs
            acceleration: 40,
            deceleration: 25,
            maxSpeed:     100,
            setSpeed:     100,
            maxRevSpeed:  -100,
            setRevSpeed:  -100,
        }, st)
    }

    preInstall(body) {
        if (!body.attitude) throw `an attitude pod is expected in [${body.name}]!`
    }

    forward(dt) {
        if (this.speed >= this.setSpeed) return
        this.speed = min( this.speed + this.acceleration * dt, this.setSpeed )
    }

    backward(dt) {
        if (this.speed <= this.setRevSpeed) return
        this.speed = max( this.speed - this.deceleration * dt, this.setRevSpeed )
    }

    evo(dt) {
        this.__.x += cos(this.__.dir) * this.speed * dt
        this.__.y += sin(this.__.dir) * this.speed * dt
    }
}
