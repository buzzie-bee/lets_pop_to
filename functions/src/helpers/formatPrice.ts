import { CurrencyType } from '../types';

export const formatPrice = (amount: number, currency: CurrencyType): string => {
  // Not using code as symbol present in every case, not using rounding coefficient as always 0
  const {
    symbol,
    thousandsSeparator,
    decimalSeparator,
    symbolOnLeft,
    spaceBetweenAmountAndSymbol,
    // decimalDigits,
  } = currency;

  // Looks like skyscanner never send prices with decimal digits
  // Just in case there are some currencies which have it and I need to reenable the decimal places
  // I am keeping it in

  const decimalDigits = 0;

  const millions =
    amount / Math.pow(10, 6 + decimalDigits) > 1
      ? Math.floor(amount / Math.pow(10, 6 + decimalDigits))
      : 0;

  const thousands =
    amount / Math.pow(10, 3 + decimalDigits) > 1
      ? Math.floor(amount / Math.pow(10, 3 + decimalDigits)) % Math.pow(10, 3)
      : 0;

  const hundreds = decimalDigits
    ? Math.floor(amount / Math.pow(10, decimalDigits)) % Math.pow(10, 3)
    : amount % Math.pow(10, 3);

  const decimals = decimalDigits ? amount % Math.pow(10, decimalDigits) : null;

  // Seperated this out to make formattedPrice cleaner
  const formattedDecimals = decimalDigits
    ? `${decimalSeparator}${decimals?.toString().padStart(decimalDigits, '0')}`
    : '';

  const formattedPrice = `${symbolOnLeft ? symbol : ''}${
    spaceBetweenAmountAndSymbol ? ' ' : ''
  }${millions ? `${millions}${thousandsSeparator}` : ''}${
    thousands ? `${thousands}${thousandsSeparator}` : ''
  }${hundreds}${formattedDecimals}${!symbolOnLeft ? symbol : ''}`;

  // Prettier forces literal to be multiline so need to remove newlines
  return formattedPrice.replace(/\n|\r/g, '');
};
