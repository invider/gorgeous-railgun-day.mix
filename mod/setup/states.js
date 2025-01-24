function states() {
    extend(lab.port, dna.trait.screenTrait)
    lab.state._ls.forEach(state => {
        extend(state, dna.trait.stateTrait)
    })

    lab.control.state.hideAllExcept('port')
}
states.Z = 11
