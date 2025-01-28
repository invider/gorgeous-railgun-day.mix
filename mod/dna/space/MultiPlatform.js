
const Body = require('dna/space/Body')

class MultiPlatform extends Body {

    constructor(st) {
        super(st)
        this.install( new dna.space.pod.Attitude() )
    }

    pick(x, y, ls) {
        if (this.dead) return

        let last
        this._ls.forEach(e => {
            if (isFun(e.pick)) {
                const picked = e.pick(x, y, ls)
                if (picked) last = picked
            }
        })

        return last

        //const lxy = this.lxy(x, y)
        //const dist = math.length( lxy[0], lxy[1] )
        //if (dist <= this.r) {
        //    ls.push(this)
        //    return this
        //}
    }
}
