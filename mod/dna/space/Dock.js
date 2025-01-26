class Dock {

    constructor(st) {
        extend(this, {
            scanned: true,
            x: 0,
            y: 0,
            r: 10,

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
        let bc = env.style.teamColor(this),
            gc = env.style.teamGlow(this)

        neon.circle(x, y, r, bc, gc)
        neon.line(x + dx*r, y + dy*r, mount.x, mount.y, bc, gc)
    }
}
