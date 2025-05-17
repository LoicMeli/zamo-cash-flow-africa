
/**
 * Formats a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString();
};

/**
 * Formats a date as a string
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
