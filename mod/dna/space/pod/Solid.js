class Solid {

    constructor(st) {
        extend(this, {
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
        return this.__.gx(lx + this.x, ly + this.y)
    }

    draw() {
        if (!env.debugSolids) return
        lineWidth(1)
        stroke('#b0b020')
        circle(this.x, this.y, this.r)
    }

}
