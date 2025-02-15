const items = [
    {
        title: 'New Game',
        select: function() {
            log('new game handler')
        },
    },
    {
        title: 'Options',
        submenu: 'options',
    },
    {
        title: 'Second Player',
        section: true,
    },
    ['bot', 'human'],
    {
        title: 'music',
        options: ['on', 'off', 'random'],
        sync: function() {
            console.dir(this)
            log('syncing music to: ' + this.options[this.current])
        },
    },
    {
        options: [ 'one', 'two', 'three' ],
    },
    'High Score',
    'Credits',
    {
        title: 'Back',
        select: function() {
            lab.control.state.transitTo('space')
        },
    },
]
items.preservePos = true

