function platformAt(x, y) {
    const ls = []
    const last = lab.port.pick( x, y, ls )

    let platform = null
    ls.forEach(e => {
        if (e instanceof dna.space.Platform) platform = e
    })
    return platform
}

function selectPlatform(platform) {
    if (!platform || !(platform instanceof dna.space.Platform)) return false

    if (env.selected) {
        const prevPlatform = env.selected
        prevPlatform.selected = false
        prevPlatform.activatePod('autoRotateControl')
    }
    platform.selected = true
    env.selected = platform

    if (platform.targeting) platform.activatePod(platform.targeting)
}

function capturePlatform(platform) {
    if (!platform || !(platform instanceof dna.space.Platform) || !env.leadControllerId) return false

    if (platform._controllerId === env.leadControllerId) {
        log(`[#${env.leadControllerId}] already controlling [${platform.name}]`)
        return
    }

    log(`[#${env.leadControllerId}] capturing platform [${platform.name}]`)
    if (platform.capture) platform.capture(env.leadControllerId)
    if (platform.type === 'spacecraft') {
        platform.install( new dna.space.pod.ProximitySensor({
            name: 'basicProximitySensor',
            distance: 50,
            monitor:  {
                onProximityReached: (sensor, dist) => {
                    log(`We are here!!! distance: ${dist}`)
                    console.dir(sensor)
                },
            },
        }))
        platform.install( new dna.space.pod.DistanceSensor({
            name: 'basicDistanceSensor',
            distance: 500,
            monitor:  {
                onDistanceReached: (sensor, dist) => {
                    log(`We are here!!! distance: ${dist}`)
                    console.dir(sensor)
                }
            },
        }))
    }

    return true
}

function target(source, target) {
    if (!source || !source.targeting || !target) return
    const updated = source.targeting.setTarget(target)
    if (!updated) {
        // it is the same target - just change the attitude mode
        source.targeting.switchAttitude()
    }
}
