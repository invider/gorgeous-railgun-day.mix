function click(e) {
    const ls = []
    const last = lab.port.pick( e.x, e.y, ls )

    let platform = null
    ls.forEach(e => {
        if (e instanceof dna.space.Platform) platform = e
        console.dir(e)
    })

    if (platform) {
        lab.control.tower.capturePlatform(platform)
    }
}
