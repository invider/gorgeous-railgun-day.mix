function sector() {
    lab.port.spawn( dna.space.Outpost, {})


    for (let i = 0; i < 8; i++) {

        lab.port.spawn( dna.space.Ship, {
            x: RND(rx(1) * .8) - rx(.5) * .8,
            y: RND(ry(1) * .8) - ry(.5) * .8,
        })
    }
}
sector.Z = 21
