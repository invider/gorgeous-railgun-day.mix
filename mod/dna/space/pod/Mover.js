class Mover {

    constructor(st) {
        extend(this, {
            name:     'mover',
        }, st)
    }

    evo(dt) {
        this.__.x += cos(this.__.dir) * this.__.speed * dt
        this.__.y += sin(this.__.dir) * this.__.speed * dt
    }

}
