function evo(dt) {
    this.__.collide(
        (source, target) => {
            if (target.hit) {
                const contact = source.solid.testContact( target.solid )
                if (contact) {
                    target.hit(source)
                    /*
                    if (env.debugSolids) {
                        log(source.name + ' <*contact*> ' + target.name)
                        console.dir(source)
                        console.dir(target)
                        console.dir(contact)
                        log(contact.info)
                    }
                    */
                }
            }
        }, 
        e => (e.solid && !e.dead)
    )
}
