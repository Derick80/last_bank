export function sumTotals(array: any) {
  let subTotal = array.reduce(
    (acc: number, curr: any) => (acc += curr.amount),
    0
  )
  return Number(subTotal.toFixed(2))
}

export function sumUp(total: number) {
  return Number(total.toFixed(2))
}
