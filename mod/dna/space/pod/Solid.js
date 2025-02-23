// solid circle
class Solid {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'solid',
            name:    'solid',

            x:        0,
            y:        0,
            r:        1,
        }, st)
    }

    lxy(wx, wy) {
        const vec2 = this.__.lxy(wx, wy)
        // translate from body/parent coordinates to the local ones
        vec2[0] -= this.x
        vec2[1] -= this.y
        return vec2
    }

    wxy(lx, ly) {
        return this.__.pxy(lx + this.x, ly + this.y)
    }

    contact(hitter, hitterSolid, resolveContact) {
        const wxy = hitterSolid.wxy(0, 0)
        const lxy = this.lxy( wxy[0], wxy[1] )
        const dist = math.length(lxy[0], lxy[1])
        if (dist <= this.r + hitterSolid.r) {
            resolveContact(
                this.__,
                this,
                {
                    dist,
                    lxy,
                    wxy,
                    info: `[${this.__.name}@${round(this.__.x)}:${round(this.__.y)}]`
                        + ` <=> [${hitterSolid.__.name}@${round(hitterSolid.__.x)}:${round(hitterSolid.__.y)}]`
                        + ` rel::${round(lxy[0])}:${round(lxy[1])}`,
                }
            )
        }
    }

    draw() {
        if (!env.showSolids) return
        lineWidth(1)
        stroke('#b0b020')
        circle(0, 0, this.r)
    }
}
