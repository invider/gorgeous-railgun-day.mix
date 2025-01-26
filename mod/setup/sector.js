function sector() {
    lab.port.spawn( dna.space.Outpost, {})


    for (let i = 0; i < 16; i++) {
        lab.port.spawn( dna.space.Ship, {
            team: RND( env.style.teams.length - 1 ),
            x: RND(rx(1) * .8) - rx(.5) * .8,
            y: RND(ry(1) * .8) - ry(.5) * .8,
            turnSpeed: .1 + rnd(PI),
        })
    }
}
sector.Z = 21
