function states() {
    lab.control.state.includeAll([ lab.hud, lab.overlay, lab.port ])
    //lab.control.state.switchTo('port')
    
    lab.control.state.group('space', [ lab.hud, lab.overlay, lab.port ])
    lab.control.state.group('end',   [ lab.state.title, lab.state.gameover ])

    lab.control.state.switchTo('space')
}
states.Z = 11
