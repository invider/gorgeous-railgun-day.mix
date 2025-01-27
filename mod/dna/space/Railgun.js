class Railgun {

    constructor(st) {
        extend(this, {
            scanned: true,
            team: 0,
            x:    0,
            y:    0,
            r:    10,
            r2:   15,
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
              color = env.style.teamColor(this),
              gcolor = env.style.teamGlow(this)

        // connector 
        neon.line(x + dx*r, y + dy*r, mount.x, mount.y, color, gcolor)

        save()
        translate(x, y)
        rotate(HALF_PI + aim)

        // body
        //neon.circle(0, 0, r, color, gcolor)
        neon.line( 1.1*r,    -r,     .7*r,   r,      color, gcolor)
        neon.line( .7*r, r,      0,      .7*r,   color, gcolor)
        neon.line( 0,    .7*r,   -.7*r,  r,      color, gcolor)
        neon.line( -.7*r,r,      -1.1*r,      -r,     color, gcolor)

        // barrel
        neon.line(0, 0, 0, -r * 1.4, color, gcolor)


        restore()
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
