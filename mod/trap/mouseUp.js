function mouseUp(e) {
    const platform = lab.control.tower.platformAt(e.x, e.y)

    if (e.button === 2) {
        if (platform) {
            lab.control.tower.target(env.selected, platform)
        } else {
            lab.control.tower.target(env.selected, {
                x: lab.port.lx(e.x),
                y: lab.port.ly(e.y),
                r: 1,
            })
        }
    }
}
