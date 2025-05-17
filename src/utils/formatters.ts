/**
 * Formate un montant en FCFA
 * @param amount Montant à formater
 * @returns Montant formaté avec séparateurs de milliers
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR').format(amount);
};

/**
 * Convertit un montant en FCFA vers une autre devise
 * @param amount Montant en FCFA
 * @param currency Devise cible (USD, EUR, etc.)
 * @returns Montant converti avec symbole de la devise
 */
export const convertCurrency = (amount: number, currency: string = 'USD'): string => {
  const rates = {
    USD: 0.0017,
    EUR: 0.0015,
  };

  const rate = rates[currency as keyof typeof rates] || 1;
  const converted = amount * rate;

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
  }).format(converted);
};

/**
 * Formate un numéro de téléphone
 * @param phone Numéro de téléphone à formater
 * @returns Numéro formaté (ex: +237 6XX XXX XXX)
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return `+237 ${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
};

/**
 * Formate une date
 * @param date Date à formater
 * @returns Date formatée (ex: 01 Jan 2024)
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}; 