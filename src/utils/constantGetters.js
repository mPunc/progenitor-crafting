import constants from "../data/constants.json";

export const getMarketTax = (havePremium) => constants.premium[String(havePremium)];

export const getSellOrderTax = () => constants.sellOrderTax;

export const getFameCoefficient = (tier, enchantment) => constants.fameCoefficient[String(tier)][String(enchantment)];

export const getJournalCapacity = (tier) => constants.journalCapacity[String(tier)];

export const getResourceTypes = () => constants.resourceTypes;

export const getResourceAmounts = (itemType) => constants.resourceAmounts[itemType];

export const getItemValueCoefficient = () => undefined;

export const getNutritionCoefficient = () => constants.nutritionCoefficient;
