function dblClick(e) {
    const ls = []
    const last = lab.port.pick( e.x, e.y, ls )

    let platform = null
    ls.forEach(e => {
        console.dir(e)
        if (e instanceof dna.space.Platform) platform = e
    })

    if (platform) {
        lab.control.tower.capturePlatform(platform)
    }
}
