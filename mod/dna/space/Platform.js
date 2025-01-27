const Body = require('dna/space/Body')

class Platform extends Body {

    constructor(st) {
        super(st)
        this.install( new dna.space.pod.Attitude() )
    }

}
