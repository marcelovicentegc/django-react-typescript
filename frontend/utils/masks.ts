export function phoneMask(phoneNumber: string) {
  const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");

  if (cleanPhoneNumber.length === 11) {
    return cleanPhoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  const numbers = cleanPhoneNumber.toString().split("");

  const ddd = numbers.slice(0, 2).join("");
  const firstPart = numbers.slice(2, 6).join("");
  const secondPart = numbers.slice(6, 10).join("");

  return [
    ddd ? "(" : "",
    ddd,
    firstPart.length ? ") " : "",
    firstPart,
    secondPart.length ? "-" : "",
    secondPart,
  ].join("");
}
