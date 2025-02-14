const name = 'menu'

const DNA = 'hud/Menu'

const items = [
    {
        title: 'New Game',
        select: function() {
            log('new game handler')
        },
    },
    'Options',
    {
        title: 'Second Player',
        section: true,
    },
    ['bot', 'human'],
    {
        option: true,
        title: 'music',
        options: ['on', 'off', 'random'],
        sync: function() {
            console.dir(this)
            log('syncing music to: ' + this.options[this.current])
        },
    },
    'High Score',
    'Credits',
]

const _trap_ = {

    onShow: function() {
        log('showing menu')
    },

    onSelect: function(item, i, menu) {
        // catch all selecting events
        log('selected: ' + menu.itemTitle(item))
    },

    onSwitch: function(item, i, menu) {
        log('switching to: ' + menu.itemTitle(item))
    },

    onIdle: function() {
        log('user is idle')
    },

    onHide: function() {
        log('hiding menu')
    }, 

    select: function(item, i, menu) {
        // handle select event
        log('handling: ' + menu.itemTitle(item))
    },
}

function init() {
    this.trap = _trap_
}

