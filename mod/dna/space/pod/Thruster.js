class Thruster {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'propulsion',
            name:    'thruster',

            velocity:        0,
            keepVelocity:    false,
            targetVelocity:  0,

            // specs
            acceleration:    40,
            deceleration:    25,
            maxVelocity:     80,
            maxRevVelocity: -80,
        }, st)
    }

    preInstall(body) {
        if (!body.attitude) throw `an attitude pod is expected in [${body.name}]!`
    }

    forward(dt) {
        if (this.velocity >= this.maxVelocity) return
        this.velocity = min( this.velocity + this.acceleration * dt, this.maxVelocity )
    }

    backward(dt) {
        if (this.velocity <= this.maxRevVelocity) return
        this.velocity = max( this.velocity - this.deceleration * dt, this.maxRevVelocity )
    }

    evo(dt) {
        if (this.keepVelocity) {
            // adjust velocity
            if (this.velocity < this.targetVelocity) {
                this.velocity = this.velocity + this.acceleration * dt
                if (this.velocity > this.targetVelocity) {
                    this.velocity = this.targetVelocity
                }
            } else if (this.velocity > this.targetVelocity) {
                this.velocity = this.velocity - this.deceleration * dt
                if (this.velocity < this.targetVelocity) {
                    this.velocity = this.targetVelocity
                }
            }
        }

        // move
        this.__.x += cos(this.__.dir) * this.velocity * dt
        this.__.y += sin(this.__.dir) * this.velocity * dt
    }

    setTargetVelocity(targetVelocity) {
        this.keepVelocity = true
        this.targetVelocity = clamp(targetVelocity, this.maxRevVelocity, this.maxVelocity)
    }

    fullAhead() {
        this.setTargetVelocity(this.maxVelocity)
    }

    resetTargetVelocity() {
        this.keepVelocity = false
        this.targetVelocity = 0
    }
}
