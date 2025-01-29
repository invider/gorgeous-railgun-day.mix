
let id = 0

const Platform = require('dna/space/Platform')

class Ship extends Platform {

    constructor(st) {
        super( extend({
            type:   'spacecraft',
            name:   'ship' + (++id),
            r:      15,

            hull:   50,
            scanned: true,

            // stats
            maxHull:      100,

            status:  '',
            debug:   true,
        }, st) )

        this.install([
            new dna.space.pod.Solid({
                x: 0,
                y: 0,
                r: 15,
            }),
            new dna.space.pod.Attitude(),
            new dna.space.pod.Thruster(),
            new dna.space.pod.Friction(),
            new dna.space.pod.Targeting(),
        ])
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
