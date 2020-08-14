export function formatPhoneNumber(num: string) {
  const clearNum = num.replace(/[^0-9]/g, "");

  if (clearNum.length === 11) {
    return clearNum.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  const numberArray = clearNum.toString().split("");

  const ddd = numberArray.slice(0, 2).join("");
  const part1 = numberArray.slice(2, 6).join("");
  const part2 = numberArray.slice(6, 10).join("");

  return [
    ddd ? "(" : "",
    ddd,
    part1.length ? ") " : "",
    part1,
    part2.length ? "-" : "",
    part2,
  ].join("");
}

export const toNumericCharacter = (str: string) => str.replace(/\D/g, "");
