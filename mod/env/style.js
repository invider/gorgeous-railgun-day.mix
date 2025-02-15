const style = {

    color: {
        title: hsl(.62, .7, .7),
    },

    font: {
        main: {
            family: 'pixel-operator',
            size:   24,
        },
        menu: {
            family: 'pixel-operator',
            size:   32,
        },
        title: {
            family: 'pixel-operator',
            size:   32,
        },
    },

    teams: [
        {
            name:  'neutral',
            color: hsl(.01, 0, 1),
            glow:  hsl(.01, 0, 1),
        },
        {
            name:  'friendly',
            color: hsl(.4, .5, .5),
            glow:  hsl(.5, .6, .6),
        },
        {
            name:  'security',
            color: hsl(.6, .5, .5),
            glow:  hsl(.65, .6, .6),
        },
        {
            name:  'enemy',
            color: hsl(.01, .5, .5),
            glow:  hsl(.05,  .6, .6),
        },
        {
            // 4
            name:  'unknown',
            color: hsl(.2, .5, .5),
            glow:  hsl(.25, .6, .6),
        },
    ],

    teamColor: function(e) {
        if (e.scanned) {
            return this.teams[e.team].color
        } else {
            return this.team['unknown'].color
        }
    },

    teamGlow: function(e) {
        if (e.scanned) {
            return this.teams[e.team].glow
        } else {
            return this.team['unknown'].glow
        }
    },

    normalizeStyle: function() {
        const style = this

        // classify fonts
        for (let id in style.font) {
            const font = style.font[id]
            font.id = id
            font.head = font.size + 'px ' + font.family
        }

        // catalog teams
        style.team = {}
        style.teams.forEach((team, i) => {
            team.id = i
            style.team[team.name] = team
        })
    },

    onUpdate: function() {
        this.normalizeStyle()
    }
};

(function setupStyles() {
    style.onUpdate()
})()
