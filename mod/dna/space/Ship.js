
let id = 0

const Platform = require('dna/space/Platform')

class Ship extends Platform {

    constructor(st) {
        super( extend({
            debug: true,
            team:  0,
            scanned: true,
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

            status: '',
        }, st) )

        this.install( new dna.space.pod.Friction() )

        this.install( new dna.space.pod.Solid({
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

        super.draw()
        restore()

        // debug info
        if (this.debug) {
            let label = this.status? this.name + ': ' + this.status : this.name
            if (this.selected) label = '[' + label + ']'
            if (this.padControl && this.padControl._controllerId) label = '== ' + label + ' =='
            fill(rgb(1, 1, 1))
            font(env.style.font.main.head)
            baseTop()
            alignCenter()
            text(label, 0, r * 1.2)
        }
        restore()
    }   

    getStatus() {
        return `[${this.name}.${this.team}] HULL:${floor(this.hull)}/${this.maxHull}`
    }

}
