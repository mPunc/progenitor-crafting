import constants from "../data/constants.json";

export const formatNumber = (num) => Math.floor(Number(num)).toLocaleString();

export const getFameCoefficient = (tier, enchantment) => constants.fame[String(tier)][String(enchantment)];

export const getJournal = (tier) => constants.journal[String(tier)];

export const getTax = (havePremium) => constants.premium[String(havePremium)];
