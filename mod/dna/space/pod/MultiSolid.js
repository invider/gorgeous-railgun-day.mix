class MultiSolid {

    constructor(st) {
        extend(this, {
            name:      'multiSolid',
            alias:     'solid',
            noContact: true,
        }, st)
    }

    contact(hitter, hitterSolid, resolveContact) {
        const ls = this.__._ls
        for (let i = 0; i < ls.length; i++) {
            const module = ls[i]
            if (!module.dead && module.solid) {
                module.solid.contact(hitter, hitterSolid, resolveContact)
            }
        }
    }

}
