class Railgun {

    constructor(st) {
        extend(this, {
            type:  'weapon',
            name:  'railgun',
            alias: 'primaryWeapon',
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
}
