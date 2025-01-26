class Outpost extends LabFrame {

    constructor(st) {
        super(
            extend({
                scanned: true,
                name: 'outpost',
                team: 1,
                x:    0,
                y:    0,
                r:    40,
            }, st)
        )
    }

    init() {
        const {x, y, r} = this
        const R = r * 1.7

        this.attach( new dna.space.Dock({
            name: 'dock1',
            x: x,
            y: y - R,
            dx:  0,
            dy:  1,
            mount: {
                x: x,
                y: y - r,
            }
        }))

        this.attach( new dna.space.Dock({
            name: 'dock2',
            x: x + R,
            y: y,
            dx: -1,
            dy:  0,
            mount: {
                x: x + r,
                y: y,
            }
        }))

        this.attach( new dna.space.Dock({
            name: 'dock3',
            x: x,
            y: y + R,
            dx:  0,
            dy: -1,
            mount: {
                x: x,
                y: y + r,
            }
        }))

        this.attach( new dna.space.Dock({
            name: 'dock4',
            x: x - R,
            y: y,
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
              dir = math.rndfi(),
              dx  = cos(dir),
              dy  = sin(dir),
              mx  = x + dx * r,
              my  = y + dy * r,
              gx  = x + dx * R,
              gy  = x + dy * R

        const railguns = this._ls.filter(e => e instanceof dna.space.Railgun).length
        const railgun = new dna.space.Railgun({
            name: 'gun' + (railguns + 1),
            team: 2,
            x: gx,
            y: gy,
            dx: -dx,
            dy: -dy,
            mount: {
                x: mx,
                y: my,
            }
        })
        this.attach(railgun)

        return railgun
    }

    evo(dt) {}

    draw() {
        let bc = env.style.teamColor(this),
            gc = env.style.teamGlow(this)

        neon.circle(this.x, this.y, this.r, bc, gc)
        super.draw()
    }
}
