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
        env.selected.selected = false
    }
    platform.selected = true
    env.selected = platform
}

function capturePlatform(platform) {
    if (!platform || !(platform instanceof dna.space.Platform) || !env.leadControllerId) return false

    if (platform._controllerId === env.leadControllerId) {
        log(`[#${env.leadControllerId}] already controlling [${platform.name}]`)
        return
    }

    log(`[#${env.leadControllerId}] capturing platform [${platform.name}]`)
    if (!platform.padControl) {
        // install pad control pod
        platform.install( new dna.space.pod.PadControl() )
    }
    lab.monitor.controller.bind(env.leadControllerId, platform.padControl)

    return true
}

function target(source, target) {
    if (!source || !source.targeting || !target) return
    source.targeting.setTarget(target)
}
