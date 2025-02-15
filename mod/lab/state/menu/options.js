const options = [
    {
        section: true,
        title: 'music',
        onShow: function() {
            log('syncing in MUSIC')
        },
        onHide: function() {
            log('preserving MUSIC settings')
        },
    },
    [ 'on', 'off' ],

    {
        section: true,
        title: 'sound',
    },
    [ 'on', 'off' ],

    {
        title: 'Back',
        select: function() {
            this.__.returnBack(true)
            this.__.focusOn('Credits')
        },
    }
]
options.preservePos = true

