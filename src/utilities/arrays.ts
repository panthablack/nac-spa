export type Array2D = any[][]

export const transposeArray = (a: Array2D) => {
  // if no rows, throw error
  if (!a.length) throw new Error('No rows passed to transposeArray.')
  // throw error if rows not all arrays
  const rowsAllArrays = a.reduce((acc, row) => {
    if (acc === false) return false
    else return Array.isArray(row)
  }, true)
  if (!rowsAllArrays) throw new Error('Rows passed to transposeArray must be arrays.')
  // throw error if row length not greater than 0
  const firstRowLength: number = a[0].length
  if (firstRowLength <= 0) throw new Error('Rows passed to transposeArray must be of length > 0.')
  // throw error if rows not all same length
  const rowsSameLength = a.reduce((acc, row) => {
    if (acc === false) return false
    else return firstRowLength === row.length
  }, true)
  if (!rowsSameLength) throw new Error('Rows passed to transposeArray must be the same length.')
  // return the transposed array
  return Object.keys(a[0]).map((colIndex: string) => a.map(row => row[parseInt(colIndex)]))
}

export const someRowHasAllElementsEqualToValue = (a: Array2D, v: any) => {
  return a.reduce((ra, rv) => {
    if (ra === true) return true
    else
      return rv.reduce((ca, cv) => {
        if (ca === false) return false
        else return cv === v
      }, true)
  }, false)
}
