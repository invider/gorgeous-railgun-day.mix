class Dock {

    constructor(st) {
        extend(this, {
            x: 0,
            y: 0,
            r: 8,

            mount: {
                x: 0,
                y: 0,
            },
        }, st)
    }

    init() {
        this.team = this.__.team // inherit the team
    }

    draw() {
        const { x, y, dx, dy, r, mount } = this
        neon.circle(x, y, r, hsl(.4, .5, .5), hsl(.5, .6, .6))
        neon.line(x + dx*r, y + dy*r, mount.x, mount.y, hsl(.4, .5, .5), hsl(.5, .6, .6))
    }
}
