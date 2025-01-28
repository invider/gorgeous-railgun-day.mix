function dblClick(e) {
    const platform = lab.control.tower.platformAt(e.x, e.y)

    if (platform) {
        lab.control.tower.capturePlatform(platform)
    }
}
