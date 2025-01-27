class AutoRotateControl {

    constructor(st) {
        extend(this, {
            name:      'autoRotateControl',
            alias:     'control',
            turnSpeed: PI,
        }, st)
    }

    evo(dt) {
        // direct ship turn
        this.__.dir += math.normalizeAngle(this.turnSpeed * dt)
    }
}
