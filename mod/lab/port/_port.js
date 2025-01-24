const _port = {
    Z:   11,
    DNA: 'SlideCamera',
    name: 'port',

    onEnable: function() {
        log('showing port, hud and overlay')
        lab.overlay.enable()
        lab.hud.enable()
    },

    onDisable: function() {
        log('hiding port, hud and overlay')
        lab.overlay.disable()
        lab.hud.disable()
    },
}
