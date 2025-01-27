class Targeting {

    constructor(st) {
        extend(this, {
            name: 'targeting',
            alias: 'control',
        }, st)
    }

    turnOnTarget(dt) {
        const h = this.head
        const t = this.target

        const b = lib.math.normalizeAngle(bearing(h.x, h.y, t.x, t.y))
        this.turnAtBearing(b, dt)
    }

    turnAtBearing(b, dt) {
        const h = this.head
        if (this.fi !== b) {
            let left = true
            let tune = true
            if (this.fi < b) {
                if (b - this.fi < PI) left = false
                else tune = false
            } else {
                if (this.fi - b > PI) {
                    left = false
                    tune = false
                }
            }

            if (left) {
                this.fi -= this.turnSpeed * dt
                if (tune && this.fi < b) this.fi = b
                if (this.fi < 0) this.fi += TAU
            } else {
                this.fi += this.turnSpeed * dt
                if (tune && this.fi > b) this.fi = b
                if (this.fi > TAU) this.fi -= TAU
            }
            h.bearing = b
            h.heading = this.fi
        }
    }
}
