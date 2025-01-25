
let id = 0

class Ship extends LabFrame {

    constructor(st) {
        super( extend({
            debug: true,
            team:  0,
            name: 'ship' + (++id),
            x:     0,
            y:     0,
            r:     15,
            dir:   0,
            speed: 0,
            hull:  50,

            // stats
            maxSpeed:     100,
            acceleration: 10,
            maxHull:      100,
            turnSpeed:    0,

            status: '',
        }, st) )

        this.attach( new dna.space.pod.Solid({
            x: 0,
            y: 0,
            r: 15,
        }))
    }

    lxy(gx, gy) {
        const cdir = -this.dir,
              lx = gx - this.x,
              ly = gy - this.y
        return [
            lx * (cos(cdir) - sin(cdir)),
            ly * (sin(cdir) + cos(cdir)),
        ]
    }

    gxy(lx, ly) {
        const { x, y, dir } = this
        const gx = lx * (cos(dir) - sin(dir)),
              gy = ly * (sin(dir) + cos(dir))
        return [
            x + gx,
            y + gy,
        ]
    }

    pick(x, y, ls) {
        if (this.dead) return

        const lxy = this.lxy(x, y)
        const dist = math.length( lxy[0], lxy[1] )
        if (dist <= this.r) {
            ls.push(this)
            return this
        }
    }

    hit(source) {
        this.hull -= source.force
        if (this.hull <= 0) {
            kill(this)
        }
    }

    evo(dt) {
        this.dir += math.normalizeAngle(this.turnSpeed * dt)
    }

    draw() {
        const { x, y, r, dir } = this
        save()
        translate(x, y)

        save()
        rotate(HALF_PI + dir)

        let c = hsl(.7, .7, .6)

        neon.line( 0,    -r,     .7*r,   r,      c, c)
        neon.line( .7*r, r,      0,      .7*r,   c, c)
        neon.line( 0,    .7*r,   -.7*r,  r,      c, c)
        neon.line( -.7*r,r,      0,      -r,     c, c)

        super.draw()
        restore()

        // debug info
        if (this.debug) {
            const label = this.status? this.name + ': ' + this.status : this.name
            fill(rgb(1, 1, 1))
            font(env.style.font.main.head)
            baseTop()
            alignCenter()
            text(label, 0, r * 1.2)
        }
        restore()
    }   

    getStatus() {
        return `[${this.name}] HULL:${floor(this.hull)}/${this.maxHull}`
    }

}
