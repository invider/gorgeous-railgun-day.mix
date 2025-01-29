class Railgun {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'weapon',
            name:    'railgun',
            alias:   'primaryWeapon',

            triggered:    false,
            charge:       0,

            // spec
            rechargeTime: .25,
        }, st)
    }

    fire() {
        const { x, y, r2, dir } = this.__
        const dx = cos(dir),
              dy = sin(dir)

        lab.port.spawn( dna.space.Projectile, {
            team:   this.__.team,
            source: this.__,
            x:      x + dx * r2,
            y:      y + dy * r2,
            dir:    dir,
        })
    }

    trigger() {
        this.triggered = true
    }

    stop() {
        this.triggered = false
    }

    evo(dt) {
        this.charge += dt

        if (this.triggered) {
            if (this.charge >= this.rechargeTime) {
                this.fire()
                this.charge = 0
            }
        }
    }
}
