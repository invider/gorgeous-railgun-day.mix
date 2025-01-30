const IDLE        = 0,
      APPROACH    = 1,
      DISTANTIATE = 2

class Bot {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'ai',
            name:    'bot',

            state:   IDLE,
            timeout: 0,
        }, st)
    }

    preInstall(body) {
        if (!body.targeting) throw `a targeting pod is expected in [${body.name}]!`
    }

    selectNextTarget() {
        const __ = this.__
        const nextTarget = lab.control.tower.getRandomEnemy(__)
        if (nextTarget) {
            log(`[${__.name}]: selecting next target -> [${nextTarget.name}]`)
            __.targeting.setTarget(nextTarget, {
                attitude: dry.attitude.TOWARDS,
            })
            __.thruster.fullAhead()
            this.state = APPROACH

            this.timeout = 30 + lib.source.targeting.rndi(60)
        }
    }

    resetTarget() {
        const __ = this.__
        __.targeting.setTarget(null)
        __.thruster.setTargetVelocity(0)
        __.primaryWeapon.stop()

        this.state = IDLE 
    }

    evo(dt) {
        const __ = this.__
        this.timeout -= dt

        if (!this.state) {
            this.selectNextTarget()
        } else {
            if (__.targeting.directlyOnTarget) {
                __.primaryWeapon.trigger()
            } else if (__.targeting.lastShift < .05) {
                __.primaryWeapon.trigger()
            } else {
                __.primaryWeapon.stop()
            }

            const target = __.targeting.getTarget()
            if (this.timeout < 0 || target.dead) this.resetTarget()
        }
    }

}
