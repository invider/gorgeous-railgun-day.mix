function click(e) {
    const ls = []
    const last = lab.port.pick( e.x, e.y, ls )

    ls.forEach(e => {
        if (e instanceof dna.space.Ship) {
            e.hit({
                force: 20,
            })
        }
        console.dir(e)
    })
}
