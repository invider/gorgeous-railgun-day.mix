function capture(action) {
    if (env.state !== 'port') return

    log(`trying to capture controller #${action.controllerId}`)
    const railgun = lab.port.outpost.mountRailgun()

    lab.monitor.controller.bind(action.controllerId, railgun)
    lab.monitor.controller.act(action)

    if (!env.leadControllerId) env.leadControllerId = action.controllerId
}
