class Targeting {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'control',
            name:    'targeting',
            alias:   'control',

            target:   null,
            attitude: dry.attitude.TOWARDS,

            monitor:  null,
        }, st)
    }

    preInstall(body) {
        if (!body.attitude) throw `an attitude pod is expected in [${body.name}]!`
    }

    setMonitor(monitor) {
        this.monitor = monitor
    }

    setTarget(target) {
        const prevTarget = this.target
        if (target === prevTarget) return false

        this.target = target
        if (env.traceTargeting || env.config.traceTargeting) {
            if (!target) log(`[${this.__.name}] => no target`)
            else if (!target.name) log(`[${this.__.name}] => [annonymous@${round(target.x)}:${round(target.y)}]`)
            else log(`[${this.__.name}] => [${target.name}@${round(target.x)}:${round(target.y)}]`)
        }

        return true
    }

    turnOnTarget(dt) {
        const s = this.__
        const t = this.target

        const b = lib.math.normalizeAngle(bearing(s.x, s.y, t.x, t.y))
        this.turnAtBearing(b, dt)
    }

    turnAwayFromTarget(dt) {
        const s = this.__
        const t = this.target

        const b = lib.math.normalizeAngle(bearing(s.x, s.y, t.x, t.y) - PI)
        this.turnAtBearing(b, dt)
    }

    circleTargetLeft(dt) {
        const s = this.__
        const t = this.target

        const b = lib.math.normalizeAngle(bearing(s.x, s.y, t.x, t.y) - HALF_PI)
        this.turnAtBearing(b, dt)
    }

    circleTargetRight(dt) {
        const s = this.__
        const t = this.target

        const b = lib.math.normalizeAngle(bearing(s.x, s.y, t.x, t.y) + HALF_PI)
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
                if (tune && __.dir < b) {
                    __.dir = b
                }
                if (__.dir < 0) __.dir += TAU
            } else {
                __.attitude.right(dt)
                if (tune && __.dir > b) __.dir = b
                if (__.dir >= TAU) __.dir = __.dir % TAU
            }
            this.lastBearing = b
            this.lastHeading = __.dir
            this.lastShift   = abs(b - __.dir)
        } else {
            if (this.monitor && this.monitor.onTarget) this.monitor.onTarget()
            this.directlyOnTarget = true
        }
    }

    setAttitude(attitude) {
        this.attitude = attitude
    }

    switchAttitude() {
        this.attitude ++
        if (this.attitude > dry.attitude.MAX) {
            this.attitude = 1
        }
    }

    evo(dt) {
        if (this.__.control !== this) return // the targeting pod is not in control right now

        this.directlyOnTarget = false

        // TODO implement attitudes without targets (like anti-missile maneuvres)
        if (!this.target) return

        switch(this.attitude) {
            case dry.attitude.TOWARDS:
                this.turnOnTarget(dt)
                break
            case dry.attitude.CIRCLE_LEFT:
                this.circleTargetLeft(dt)
                break
            case dry.attitude.CIRCLE_RIGHT:
                this.circleTargetRight(dt)
                break
            case dry.attitude.AWAY:
                this.turnAwayFromTarget(dt)
                break
        }
    }
}
