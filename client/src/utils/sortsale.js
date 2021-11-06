const compareKey = key =>
  (a, b) => {
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }
    return 0
  }

// one liner
// const compareKey = key => (a, b) => a[key] == b[key]? (a[key] < b[key] ? -1 : 1) : 0

export const AZ = arr => arr.sort(compareKey('buyer'))
export const ZA = arr => arr.sort(compareKey('buyer')).reverse()
export const lowestFirst = arr => arr.sort((a, b) => parseInt(a.product.profit) - parseInt(b.product.profit))
export const highestFirst = arr => arr.sort((a, b) => parseInt(b.product.profit) - parseInt(a.product.profit))
