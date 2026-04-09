import constants from "../data/constants.json";

// just a number formatter
export const formatNumber = (num) => Math.floor(Number(num)).toLocaleString();

export const getMarketTax = (havePremium) => constants.premium[String(havePremium)];

export const getSellOrderTax = () => constants.sellOrderTax;

export const getFameCoefficient = (tier, enchantment) => constants.fameCoefficient[String(tier)][String(enchantment)];

export const getJournalCapacity = (tier) => constants.journalCapacity[String(tier)];

export const getResourceTypes = () => constants.resourceTypes;

export const getResourceAmounts = (itemType) => constants.resourceAmounts[itemType];

export const getItemValueCoefficient = () => undefined;

export const getNutritionCoefficient = () => constants.nutritionCoefficient;
