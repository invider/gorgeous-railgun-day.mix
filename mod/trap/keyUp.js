function keyUp(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return

    switch(e.code) {
        case 'Escape':
            trap('state/menu')
            break
    }
}
