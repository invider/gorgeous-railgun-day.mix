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
    if (env.selected === platform) return false

    if (env.selected) {
        const prevPlatform = env.selected
        prevPlatform.selected = false

        if (!prevPlatform.control || !prevPlatform.control._controllerId) {
            prevPlatform.activatePod('autoRotateControl')
        }
    }
    platform.selected = true
    env.selected = platform

    if (platform.targeting) platform.activatePod(platform.targeting)
    return true
}

function capturePlatform(platform) {
    if (!platform || !(platform instanceof dna.space.Platform) || !env.leadControllerId) return false

    if (platform._controllerId === env.leadControllerId) {
        log(`[#${env.leadControllerId}] already controlling [${platform.name}]`)
        return
    }

    log(`[controller #${env.leadControllerId}] capturing platform [${platform.name}]`)
    if (platform.capture) platform.capture(env.leadControllerId)

    if (platform.type === 'spacecraft') {
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

function getRandomEnemy(platform) {
    if (!platform) return

    const team = platform.team
    const enemyList = lab.port.find( e => !e.dead
        && (e instanceof dna.space.Platform)
        && e.team !== team
        && ['spacecraft', 'module'].includes(e.type)
    )
    return lib.source.targeting.rnde(enemyList)
}
