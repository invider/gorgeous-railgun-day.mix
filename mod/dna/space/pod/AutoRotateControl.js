class AutoRotateControl {

    constructor(st) {
        extend(this, {
            name:        'autoRotateControl',
            alias:       'control',
            turnVelocity: PI,
        }, st)
    }

    evo(dt) {
        if (!this.__.isActivated(this)) return

        // direct ship turn
        this.__.dir += math.normalizeAngle(this.turnVelocity * dt)
    }
}
