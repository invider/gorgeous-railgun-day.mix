function evo(dt) {
    this.__.collide(
        (hitter, target) => {
            //if (hitter instanceof dna.space.Projectile && target instanceof dna.space.Outpost) debugger

            if (!hitter.solid.noContact) {
                target.solid.contact( hitter, hitter.solid, (contactTarget, contactSolid, contactPoint) => {
                    if (contactTarget.hit) {
                        contactTarget.hit(hitter)
                    }
                })
            }
            /*
            if (env.debugSolids) {
                log(source.name + ' <*contact*> ' + target.name)
                console.dir(source)
                console.dir(target)
                console.dir(contact)
                log(contact.info)
            }
            */
        }, 
        e => (e.solid && !e.dead)
    )
}
