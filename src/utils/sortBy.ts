export const sortMethod = <T extends unknown>(
  arr: T[],
  sortBy: string,
  isAsc = true
): T[] => {
  if (isAsc) {
    return [...arr].sort((a, b) =>
      a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0
    );
  } else {
    return [...arr].sort((a, b) =>
      a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0
    );
  }
};
