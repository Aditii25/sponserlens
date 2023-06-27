function formatNumber(number) {
  if (number >= 9999) {
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor(("" + number).length / 3);
    let shortNum = parseFloat(
      (suffixNum !== 0
        ? number / Math.pow(1000, suffixNum)
        : number
      ).toPrecision(3)
    );
    if (shortNum % 1 !== 0) {
      shortNum = shortNum.toFixed(2); // Use 2 decimal places
    }
    return shortNum + suffixes[suffixNum];
  }
  return number.toString();
}

export default formatNumber;
