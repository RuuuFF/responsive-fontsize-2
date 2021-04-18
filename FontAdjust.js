const Options = {
  minWidth: 420,
  maxWidth: 1365,
  measure: "rem"
}

const Fonts = [
  {
    selector: "h1",
    minFontsize: 2.2,
    maxFontsize: 5,
    minLineheight: 2.8,
    maxLineheight: 5.6
  }
]

const FontAdjust = {
  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value
    
    return value
  },

  scaler(min, max) {
    const screenWidth = Number(window.innerWidth)

    return FontAdjust.scale(screenWidth, Number(Options.minWidth), Number(Options.maxWidth), min, max)
  },

  createStyleEl() {
    const head = document.getElementsByTagName('head')[0]
    const style = document.createElement('style')
    head.appendChild(style)
  },

  adjustSize() {
    const style = document.getElementsByTagName('style')[0]

    style.innerHTML = "/* Style injected by FontAdjust ^^ */"

    Fonts.forEach((obj) => {
      const { selector, minFontsize, maxFontsize, minLineheight, maxLineheight } = obj

      const fontSize = FontAdjust.scaler(minFontsize, maxFontsize).toFixed(1)
      const lineHeight = FontAdjust.scaler(minLineheight, maxLineheight).toFixed(1)

      style.innerHTML += `
      ${selector} {
        font-size: ${String(fontSize + Options.measure)};
        line-height: ${String(lineHeight + Options.measure)};
      }
      `
    })
  },
}

FontAdjust.createStyleEl()
FontAdjust.adjustSize()
window.addEventListener('resize', FontAdjust.adjustSize)