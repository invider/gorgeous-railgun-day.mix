class ProximitySensor {

    constructor(st) {
        extend(this, {
            type:     'pod',
            subtype:  'sensor',
            name:     'proximitySensor',

            paused:   true,
            reached:  false,
            distance: 0,

            monitor:  null,
        }, st)

        if (this.distance && this.monitor) this.set(this.distance)
    }

    preInstall(body) {
        if (!body.targeting) throw `a targeting pod is expected in [${body.name}]!`
    }

    setMonitor(monitor) {
        this.monitor = monitor
    }

    set(distance) {
        this.distance = distance
        this.reached  = false
        this.paused   = false
    }

    evo(dt) {
        if (!this.monitor) return

        const __ = this.__
        const target = this.__.targeting.getTarget()
        if (!target) return
        
        const distance = dist(__.x, __.y, target.x, target.y)

        if (distance <= this.distance) {
            if (!this.reached) {
                if (this.monitor.onProximityReached) this.monitor.onProximityReached(this, distance)
                this.reached = true
            }
            if (this.monitor.proximityAlarm) this.monitor.proximityAlarm(this, distance, dt)
        }
    }

}
