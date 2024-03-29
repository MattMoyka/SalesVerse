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

export const AZ = arr => arr.sort(compareKey('name'))
export const ZA = arr => arr.sort(compareKey('name')).reverse()
export const lowestFirst = arr => arr.sort((a, b) => parseInt(a.profit) - parseInt(b.profit))
export const highestFirst = arr => arr.sort((a, b) => parseInt(b.profit) - parseInt(a.profit))
export const lowestCostFirst = arr => arr.sort((a, b) => parseInt(a.cost) - parseInt(b.cost))
export const highestCostFirst = arr => arr.sort((a, b) => parseInt(b.cost) - parseInt(a.cost))