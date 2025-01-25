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
              by = sin(aim),
              color = hsl(.7, .7, .6),
              gcolor = hsl(.7, .7, .6)

        // body
        neon.circle(x, y, r, color, gcolor)
        // connector 
        neon.line(x + dx*r, y + dy*r, mount.x, mount.y, color, gcolor)
        // barrel
        neon.line(x, y, x + bx*r2, y + by*r2, color, gcolor)
    }

    turnLeft(dt) {
        this.aim -= this.turnSpeed * dt
        if (this.aim < 0) this.aim += TAU
    }

    turnRight(dt) {
        this.aim += this.turnSpeed * dt
        if (this.aim >= TAU) this.aim -= TAU
    }

    shot() {
        const { x, y, r2, aim } = this
        const dx = cos(aim),
              dy = sin(aim)

        lab.port.spawn( dna.space.Projectile, {
            team: this.team,
            x: this.x + dx * r2,
            y: this.y + dy * r2,
            dir: aim,
        })
    }

    activate(action) {
        switch(action.name) {
            case 'A':
            case 'B':
                this.shot()
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
