class Friction {

    constructor(st) {
        extend(this, {
            type:   'pod',
            name:   'friction',
            amount: 10,
        }, st)
    }

    preInstall(body) {
        if (!body.thruster) throw `a thruster pod is expected in [${body.name}]!`
    }

    evo(dt) {
        if (this.__.thruster.velocity > 0) {
            this.__.thruster.velocity = max( this.__.thruster.velocity - this.amount * dt, 0 )
        } else if (this.__.thruster.velocity < 0) {
            this.__.thruster.velocity = min( this.__.thruster.velocity + this.amount * dt, 0 )
        }
    }
}
