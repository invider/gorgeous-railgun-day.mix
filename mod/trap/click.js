function click(e) {
    const ls = []
    const last = lab.port.pick( e.x, e.y, ls )

    ls.forEach(e => {
        if (isFun(e.damage)) {
            e.damage(20)
        }
        console.dir(e)
    })
}
