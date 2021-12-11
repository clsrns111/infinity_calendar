export function _filter(
  dates: NodeListOf<HTMLElement> | any,
  predi: (date: HTMLElement) => boolean | null
) {
  let newarr: NodeListOf<HTMLElement>[] = [];
  for (let i = 0; i < dates.length; i++) {
    if (predi(dates[i])) {
      newarr.push(dates[i]);
    }
  }
  return newarr;
}
