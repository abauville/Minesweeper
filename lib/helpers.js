// Helpers
export function randomUniqueArray(max, n, forbiddenIndex = null) {
  n += 1; // account for forbiddenIndex
  const out = [forbiddenIndex];
  let counter = 0;
  console.log("uniqueArray -- ", out);
  while (out.length < n && counter <= n * 10) {
    const num = Math.floor(Math.random() * max);
    if (!out.includes(num)) {
      out.push(num);
    }
    // console.log(max, num);
    counter += 1;
  }
  out.shift(); // remove the forbiddenIndex
  return out;
}
