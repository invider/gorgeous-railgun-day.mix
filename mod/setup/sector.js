function sector() {
    lab.port.spawn( dna.space.Outpost, {})


    for (let i = 0; i < 16; i++) {
        lab.port.spawn( dna.space.Ship, {
            team: lib.source.traffic.rndi( env.style.teams.length ),
            x: lib.source.traffic.rndi(rx(1) * .8) - rx(.5) * .8,
            y: lib.source.traffic.rndi(ry(1) * .8) - ry(.5) * .8,
            turnSpeed: .1 + lib.source.traffic.rndf() * PI,
        })
    }
}
sector.Z = 21
