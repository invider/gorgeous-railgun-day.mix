class Outpost extends LabFrame {

    constructor(st) {
        super(
            extend({
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
        const R = r * 1.8

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

    evo(dt) {}

    draw() {
        neon.circle(this.x, this.y, this.r, hsl(.4, .5, .5), hsl(.5, .6, .6))
        super.draw()
    }
}
