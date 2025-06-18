export function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      notNull(array[randomIndex]),
      notNull(array[currentIndex]),
    ];
  }
}

function notNull<T>(value: T, message?: string): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(message || "Value is null or undefined");
  }
  return value;
}
