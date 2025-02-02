
let id = 0

const Platform = require('dna/space/Platform')

class Ship extends Platform {

    constructor(st) {
        super( extend({
            type:   'spacecraft',
            name:   'ship' + (++id),
            r:      15,
            r2:     25,

            hull:   50,
            scanned: true,

            // stats
            maxHull:      100,

            status:  '',
            debug:   true,
        }, st) )

        this.install([
            new dna.space.pod.Solid({
                r: 15,
            }),
            new dna.space.pod.Attitude({
                turnVelocity: HALF_PI + lib.source.traffic.rndf() * PI,
            }),
            new dna.space.pod.Thruster(),
            new dna.space.pod.Friction(),
            new dna.space.pod.Targeting(),
            new dna.space.pod.Railgun(),
            new dna.space.pod.SpacecraftPadControl(),
        ])
    }

    capture(controllerId) {
        this.activatePod('spacecraftPadControl')
        lab.monitor.controller.bind(controllerId, this.spacecraftPadControl)

        // sensor test
        this.install( new dna.space.pod.ProximitySensor({
            name: 'basicProximitySensor',
            distance: 50,
            monitor:  {
                onProximityReached: (sensor, dist) => {
                    log(`We are here!!! distance: ${dist}`)
                    console.dir(sensor)
                },
            },
        }))
        this.install( new dna.space.pod.DistanceSensor({
            name: 'basicDistanceSensor',
            distance: 500,
            monitor:  {
                onDistanceReached: (sensor, dist) => {
                    log(`We are here!!! distance: ${dist}`)
                    console.dir(sensor)
                }
            },
        }))
    }

    evo(dt) {
        super.evo(dt)
    }

    draw() {
        const { x, y, r, dir } = this
        save()
        translate(x, y)

        save()
        rotate(HALF_PI + dir)

        let bc = env.style.teamColor(this),
            gc = env.style.teamGlow(this)

        neon.line( 0,    -r,     .7*r,   r,      bc, gc)
        neon.line( .7*r, r,      0,      .7*r,   bc, gc)
        neon.line( 0,    .7*r,   -.7*r,  r,      bc, gc)
        neon.line( -.7*r,r,      0,      -r,     bc, gc)

        this.drawRadius()
        super.draw()
        restore()


        // debug info
        if (this.debug) {
            let label = this.status? this.name + ': ' + this.status : this.name
            if (this.targeting.target) label += ' => ' + this.targeting.target.name
            if (this.selected) label = '[' + label + ']'
            if (!this.targeting.deactivated && this.targeting.directlyOnTarget) label = '>>' + label + '<<'
            if (this.spacecraftPadControl && this.spacecraftPadControl._controllerId) label = '=== ' + label + ' ==='

            fill(rgb(1, 1, 1))
            font(env.style.font.main.head)
            baseTop()
            alignCenter()
            text(label, 0, r * 1.2)
        }
        restore()
    }   

    getStatus() {
        let label = `[${this.name}.${this.team}] HULL:${floor(this.hull)}/${this.maxHull}`

        const target = this.targeting.getTarget()
        if (target) {
            if (!target.name) label += ` => [annonymous@${round(target.x)}:${round(target.y)}]`
            else label += ` => [${target.name}@${round(target.x)}:${round(target.y)}]`
        }

        return label
    }

}
