class Targeting {

    constructor(st) {
        extend(this, {
            name:   'targeting',
            alias:  'control',
            target:  null,
        }, st)
    }

    setTarget(target) {
        this.target = target
        if (env.traceTargeting || env.config.traceTargeting) {
            if (!target) log(`[${this.__.name}] no target`)
            else if (!target.name) log(`[${this.__.name}] -> target [annonymous]`)
            else log(`[${this.__.name}] -> target [${target.name}]`)
        }
    }

    turnOnTarget(dt) {
        const s = this.__
        const t = this.target

        const b = lib.math.normalizeAngle(bearing(s.x, s.y, t.x, t.y))
        this.turnAtBearing(b, dt)
    }

    circleTarget(dt) {
        const s = this.__
        const t = this.target

        const b = lib.math.normalizeAngle(bearing(s.x, s.y, t.x, t.y) - HALF_PI)
        this.turnAtBearing(b, dt)
    }

    turnAtBearing(b, dt) {
        const __ = this.__

        if (__.dir !== b) {
            let left = true
            let tune = true
            if (__.dir < b) {
                if (b - __.dir < PI) left = false
                else tune = false
            } else {
                if (__.dir - b > PI) {
                    left = false
                    tune = false
                }
            }

            if (left) {
                __.attitude.left(dt)
                if (tune && __.dir < b) __.dir = b
                if (__.dir < 0) __.dir += TAU
            } else {
                __.attitude.right(dt)
                if (tune && __.dir > b) __.dir = b
                if (__.dir >= TAU) __.dir = __.dir % TAU
            }
            __.attitude.lastBearing = b
            __.attitude.lastHeading = __.dir
        }
    }

    evo(dt) {
        if (this.__.control !== this) return // the targeting pod is not in control right now

        if (!this.target) return

        this.turnOnTarget(dt)
    }
}
