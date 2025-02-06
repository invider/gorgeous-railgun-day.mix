const MultiPlatform = require('dna/space/MultiPlatform')

class Outpost extends MultiPlatform {

    constructor(st) {
        super(
            extend({
                type:   'station',
                name:   'outpost',
                team:    1,
                r:       40,
                scanned: true,
            }, st)
        )
        this.install( new dna.space.pod.MultiSolid() )
    }

    init() {
        const {x, y, r} = this
        const R = r * 1.7

        this.attach( new dna.space.Dock({
            x:   x,
            y:   y - R,
            dx:  0,
            dy:  1,
            mount: {
                x: x,
                y: y - r,
            }
        }))

        this.attach( new dna.space.Dock({
            x:   x + R,
            y:   y,
            dx: -1,
            dy:  0,
            mount: {
                x: x + r,
                y: y,
            }
        }))

        this.attach( new dna.space.Dock({
            x:   x,
            y:   y + R,
            dx:  0,
            dy: -1,
            mount: {
                x: x,
                y: y + r,
            }
        }))

        this.attach( new dna.space.Dock({
            x:  x - R,
            y:  y,
            dx: 1,
            dy: 0,
            mount: {
                x: x - r,
                y: y,
            }
        }))
    }

    mountRailgun() {
        const { x, y, r } = this
        const R = r * 2.5,
              dir   = math.rndfi(),
              dx    = cos(dir),
              dy    = sin(dir),
              mtx    = x + dx * r,
              mty    = y + dy * r,
              gunX  = x + dx * R,
              gunY  = x + dy * R

        const railguns = this._ls.filter(e => e instanceof dna.space.RailgunTurret).length
        const railgun = new dna.space.RailgunTurret({
            name: 'gun' + (railguns + 1),
            team: 2,
            x: gunX,
            y: gunY,
            dx: -dx,
            dy: -dy,
            mount: {
                x: mtx,
                y: mty,
            }
        })
        this.attach(railgun)

        return railgun
    }

    draw() {
        let bc = env.style.teamColor(this),
            gc = env.style.teamGlow(this)

        neon.circle(this.x, this.y, this.r, bc, gc)
        super.draw()
    }
}
