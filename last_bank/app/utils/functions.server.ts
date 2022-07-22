export function sumTotals(array: any) {
  let subTotal = array.reduce(
    (acc: number, curr: any) => (acc += curr.amount),
    0
  );
  return Number(subTotal.toFixed(2));
}

export function sumUp(total: number) {
  return Number(total.toFixed(2));
}

export function dateRange() {
  let currentMonth: number = new Date().getMonth();
  const year: number = new Date().getFullYear();
  const now = new Date(year, currentMonth);
  const then = new Date(year, currentMonth + 1, 0);
  return { now, then };
}
