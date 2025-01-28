class Friction {

    constructor(st) {
        extend(this, {
            name:   'friction',
            amount: 10,
        }, st)
    }

    preInstall(body) {
        if (!body.thruster) throw `a thruster pod is expected in [${body.name}]!`
    }

    evo(dt) {
        if (this.__.thruster.speed > 0) {
            this.__.thruster.speed = max( this.__.thruster.speed - this.amount * dt, 0 )
        } else if (this.__.thruster.speed < 0) {
            this.__.thruster.speed = min( this.__.thruster.speed + this.amount * dt, 0 )
        }
    }
}
