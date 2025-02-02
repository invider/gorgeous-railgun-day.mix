function capture(action) {
    if (env.state !== 'space') return

    log(`trying to capture controller #${action.controllerId}`)
    const railgun = lab.port.outpost.mountRailgun()

    lab.monitor.controller.bind(action.controllerId, railgun.control)
    lab.monitor.controller.act(action)

    if (!env.leadControllerId) env.leadControllerId = action.controllerId
}
