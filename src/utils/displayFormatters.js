
export const formatNumber = (num) => Math.floor(Number(num)).toLocaleString();

export const capitalize = (str) => typeof str === "string" && str.length > 0 ? str[0].toUpperCase() + str.slice(1) : str;
