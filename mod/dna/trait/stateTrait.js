function init() {
    // name MUST be removed to avoid augmentation collision
    delete this.name
}

function disable() {
    this.hidden = true
    this.paused = true
    this.disabled = true
    if (this.onDisable) this.onDisable()
    /*
    if (this.control) {
        lab.control.global.release(this.control)
    }
    */
}

function enable() {
    this.hidden = false
    this.paused = false
    this.disabled = false
    if (this.onEnable) this.onEnable()
    /*
    if (this.control) {
        lab.control.global.capture(this.control)
    }
    */
}

/*
captureControl(control) {
    if (!control) return
    this.control = control
    lab.control.global.capture(this.control)
}
*/

