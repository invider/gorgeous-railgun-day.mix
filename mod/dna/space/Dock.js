const Platform = require('dna/space/Platform')

let id = 0

class Dock extends Platform {

    constructor(st) {
        super( extend({
            type:   'module',
            name:   'dock' + (++id),

            x:       0,
            y:       0,
            r:       10,
            hull:    100,
            scanned: true,

            mount: {
                x: 0,
                y: 0,
            },
        }, st) )

        this.install( new dna.space.pod.Solid({
            r: 15,
        }))
    }

    init() {
        this.team = this.__.team // inherit the team
    }

    draw() {
        const { x, y, dx, dy, r, mount } = this
        let bc = env.style.teamColor(this),
            gc = env.style.teamGlow(this)

        save()
        translate(x, y)

        neon.circle(0, 0, r, bc, gc)
        neon.line(dx*r, dy*r, mount.x - x, mount.y - y, bc, gc)

        this.drawRadius()
        super.draw()

        restore()
    }
}
