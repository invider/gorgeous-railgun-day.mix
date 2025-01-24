const style = {
    color: {
        title: hsl(.62, .7, .7),
    },

    font: {
        main: {
            family: 'pixel-operator',
            size:   24,
        },
        title: {
            family: 'pixel-operator',
            size:   32,
        },
    },
};

(function classifyFonts() {
    // classify fonts
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
})()
