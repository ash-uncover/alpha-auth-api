export const nextToken = () => {
  return next ('xx xx xx')
}

export const next = (format) => {
  return format.split('').map((c) => {
    switch (c) {
      case 'x': {
        return Math.floor(Math.random() * 10)
      }
      default: {
        return c
      }
    }
  }).join('')
}