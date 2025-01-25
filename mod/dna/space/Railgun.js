class Railgun {

    constructor(st) {
        extend(this, {
            x:   0,
            y:   0,
            r:   10,
            r2:  15,
            aim: math.rndfi(),
            turnSpeed: PI,

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

    turnLeft(dt) {
        this.aim -= this.turnSpeed * dt
        if (this.aim < 0) this.aim += TAU
    }

    turnRight(dt) {
        this.aim += this.turnSpeed * dt
        if (this.aim >= TAU) this.aim -= TAU
    }

    activate(action) {
        switch(action.name) {
            case 'A':
            case 'B':
                break
        }
    }

    act(action, dt) {
        switch(action.name) {
            case 'LEFT':
                this.turnLeft(dt)
                break
            case 'RIGHT':
                this.turnRight(dt)
                break
        }
    }

}
