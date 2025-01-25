
let id = 0

class Ship {

    constructor(st) {
        extend(this, {
            team:  0,
            name: 'ship' + (++id),
            x:     0,
            y:     0,
            r:     15,
            dir:   0,
            speed: 0,
            status: 'test',
        }, st)
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

        restore()

        if (this.status) {
            fill(rgb(1, 1, 1))
            font(env.style.font.main.head)
            baseTop()
            alignCenter()
            text(this.name, 0, r * 1.2)
        }

        restore()
    }   

}
