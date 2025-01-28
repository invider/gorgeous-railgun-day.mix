function mouseUp(e) {
    const platform = lab.control.tower.platformAt(e.x, e.y)
    if (e.button === 2) {
        lab.control.tower.targetPlatform(env.selected, platform)
    }
}
