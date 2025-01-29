function randomSources() {
    lib.touch('source')
    const events = lib.source.attach( math.createRandomGenerator(), 'events')
    events.setSeed( env.tune.source.events )
    const traffic = lib.source.attach( math.createRandomGenerator(), 'traffic')
    traffic.setSeed( env.tune.source.traffic )
    const targeting = lib.source.attach( math.createRandomGenerator(), 'targeting')
    targeting.setSeed( env.tune.source.targeting )
    const background = lib.source.attach( math.createRandomGenerator(), 'background')
    background.setSeed( env.tune.source.background )
}
randomSources.Z = 1
