class Friction {

    constructor(st) {
        extend(this, {
            name:   'friction',
            amount: 10,
        }, st)
    }

    evo(dt) {
        if (this.__.speed > 0) {
            this.__.speed = max( this.__.speed - this.amount * dt, 0 )
        } else if (this.__.speed < 0) {
            this.__.speed = mix( this.__.speed + this.amount * dt, 0 )
        }
    }
}
