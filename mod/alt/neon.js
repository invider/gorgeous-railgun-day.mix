function neon(x1, y1, x2, y2, lcolor, ncolor) {
    ctx.lineCap = 'round'

    let glow = .05
    let width = 12
    let steps = 5

    for (let i = 0; i < steps; i++) {
        alpha(glow);
        lineWidth(width);
        stroke(ncolor);
        line(x1, y1, x2, y2)

        glow += .02
        width -= 1.5
    }

    lineWidth(3)
    stroke(lcolor)
    alpha(1)
    stroke(lcolor)
    line(x1, y1, x2, y2)
}
