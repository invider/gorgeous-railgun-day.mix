class Solid {

    constructor(st) {
        extend(this, {
            name: 'solid',
            x: 0,
            y: 0,
            r: 10,
        }, st)
    }

    lxy(gx, gy) {
        const vec2 = this.__.lxy(gx, gy)
        vec2[0] -= this.x
        vec2[1] -= this.y
        return vec2
    }

    gxy(lx, ly) {
        return this.__.gxy(lx + this.x, ly + this.y)
    }

    testContact(targetSolid) {
        const gxy = targetSolid.gxy(0, 0)
        const lxy = this.lxy( gxy[0], gxy[1] )
        const dist = math.length(lxy[0], lxy[1])
        if (dist <= this.r + targetSolid.r) {
            return {
                dist,
                lxy,
                gxy,
                info: `[${this.__.name}@${round(this.__.x)}:${round(this.__.y)}]`
                    + ` <=> [${targetSolid.__.name}@${round(targetSolid.__.x)}:${round(targetSolid.__.y)}]`
                    + ` rel::${round(lxy[0])}:${round(lxy[1])}`,
            }
        }
        return null
    }

    draw() {
        if (!env.debugSolids) return
        lineWidth(1)
        stroke('#b0b020')
        circle(this.x, this.y, this.r)
    }
}
