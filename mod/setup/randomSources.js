function randomSources() {
    lib.touch('source')
    lib.source.attach( math.createRandomGenerator(), 'events')
    lib.source.events.setSeed( env.tune.source.events )
    lib.source.attach( math.createRandomGenerator(), 'traffic')
    lib.source.traffic.setSeed( env.tune.source.traffic )
    lib.source.attach( math.createRandomGenerator(), 'background')
    lib.source.background.setSeed( env.tune.source.background )
}
randomSources.Z = 1
