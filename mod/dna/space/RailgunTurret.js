
const Platform = require('dna/space/Platform')

class RailgunTurret extends Platform {

    constructor(st) {
        super( extend({
            type:   'turret',
            r:       10,
            r2:      8,

            hull:    100,
            dir:     math.rndfi(),
            scanned: true,

            // specs
            turnVelocity: PI,
            maxHull:      100,

            mount: {
                x: 0,
                y: 0,
            },
        }, st) )

        this.install([
            new dna.space.pod.Solid({
                r: 15,
            }),
            new dna.space.pod.Attitude(),
            new dna.space.pod.Railgun(),
            new dna.space.pod.TurretPadControl(),
        ])
    }

    capture(controllerId) {
        this.activatePod('turretPadControl')
        lab.monitor.controller.bind(controllerId, this.turretPadControl)
    }

    draw() {
        const { x, y, dx, dy, r, r2, dir, mount } = this
        const bx = cos(dir),
              by = sin(dir),
              color = env.style.teamColor(this),
              gcolor = env.style.teamGlow(this)

        // connector 
        neon.line(x + dx*r, y + dy*r, mount.x, mount.y, color, gcolor)

        save()
        translate(x, y)
        rotate(HALF_PI + dir)

        // body
        //neon.circle(0, 0, r, color, gcolor)
        neon.line( 1.1*r,    -r,     .7*r,   r,      color, gcolor)
        neon.line( .7*r, r,      0,      .7*r,   color, gcolor)
        neon.line( 0,    .7*r,   -.7*r,  r,      color, gcolor)
        neon.line( -.7*r,r,      -1.1*r,      -r,     color, gcolor)

        // barrel
        neon.line(0, 0, 0, -r * 1.4, color, gcolor)

        this.drawRadius()
        super.draw()

        restore()
    }

    getStatus() {
        return `[${this.name}.${this.team}] HULL:${floor(this.hull)}/${this.maxHull}`
    }
}
