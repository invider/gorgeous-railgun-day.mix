function click(e) {
    const platform = lab.control.tower.platformAt(e.x, e.y)

    if (platform) {
        lab.control.tower.selectPlatform(platform)
        console.dir(platform)
    }
}
