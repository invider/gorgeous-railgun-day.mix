
let id = 0

const Unit = require('dna/space/Unit')

class Ship extends Unit {

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

    damage(force) {
        this.hull -= force
        if (this.hull <= 0) {
            kill(this)
        }
    }

    hit(source) {
        if (source.force) {
            if (source.source !== this && source.team !== this.team) {
                this.damage(source.force)
                kill(source)
            }
        }
    }

    evo(dt) {
        super.evo(dt)

        this.dir += math.normalizeAngle(this.turnSpeed * dt)
    }

    draw() {
        const { x, y, r, dir } = this
        save()
        translate(x, y)

        save()
        rotate(dir)

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
