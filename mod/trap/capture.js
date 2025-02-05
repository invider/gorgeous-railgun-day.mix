function capture(st) {
    if (env.state !== 'space') return

    log(`trying to capture controller #${st.action.controllerId}`)
    const railgun = lab.port.outpost.mountRailgun()

    lab.monitor.controller.bind(st.action.controllerId, railgun.control)
    if (st.action.pushable) lab.monitor.controller.push(st.action, st.dt, st.source)
    else lab.monitor.controller.act(st.action, st.source)

    if (!env.leadControllerId) env.leadControllerId = st.action.controllerId
}
