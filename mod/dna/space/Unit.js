class Unit extends LabFrame {

    constructor(st) {
        super( extend({ 
            x:   0,
            y:   0,
            r:   1,
            dir: 0,
        }, st) )
    }

    lxy(gx, gy) {
        const cdir = -this.dir,
              lx = gx - this.x,
              ly = gy - this.y
        return [
            lx * cos(cdir) - ly * sin(cdir),
            lx * sin(cdir) + ly * cos(cdir),
        ]
    }

    gxy(lx, ly) {
        const { x, y, dir } = this
        const gx = lx * cos(dir) - ly * sin(dir),
              gy = lx * sin(dir) + ly * cos(dir)
        return [
            x + gx,
            y + gy,
        ]
    }

    pick(x, y, ls) {
        if (this.dead) return

        const lxy = this.lxy(x, y)
        const dist = math.length( lxy[0], lxy[1] )
        if (dist <= this.r) {
            ls.push(this)
            return this
        }
    }

}
