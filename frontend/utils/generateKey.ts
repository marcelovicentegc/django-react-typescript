const dec2hex = (dec: number) => {
  return ("0" + dec.toString(16)).substr(-2);
};

export const generateKey = (length: number) => {
  var array = new Uint8Array((length || 40) / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
};
