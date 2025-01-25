class Railgun {

    constructor(st) {
        extend(this, {
            x:   0,
            y:   0,
            r:   10,
            r2:  15,
            aim: 0,

            mount: {
                x: 0,
                y: 0,
            },
        }, st)
    }

    draw() {
        const { x, y, dx, dy, r, r2, aim, mount } = this
        const bx = cos(aim),
              by = sin(aim)

        // body
        neon.circle(x, y, r, hsl(.4, .5, .5), hsl(.5, .6, .6))
        // connector 
        neon.line(x + dx*r, y + dy*r, mount.x, mount.y, hsl(.4, .5, .5), hsl(.5, .6, .6))
        // barrel
        neon.line(x, y, x + bx*r2, y + by*r2, hsl(.4, .5, .5), hsl(.5, .6, .6))
    }

}
