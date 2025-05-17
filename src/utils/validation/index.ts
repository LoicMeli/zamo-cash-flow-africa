/**
 * Valide un numéro de téléphone ivoirien
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^(?:225|0)[0-9]{10}$/;
  return phoneRegex.test(phoneNumber);
};

/**
 * Valide une adresse email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un mot de passe
 * - Au moins 8 caractères
 * - Au moins une majuscule
 * - Au moins une minuscule
 * - Au moins un chiffre
 * - Au moins un caractère spécial
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Valide un montant
 * - Doit être supérieur à 0
 * - Doit être inférieur ou égal à 500 000 XOF
 */
export const validateAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 500000;
};

/**
 * Valide un numéro de pièce d'identité
 * - 2 lettres suivies de 9 chiffres
 */
export const validateIDNumber = (idNumber: string): boolean => {
  const idRegex = /^[A-Z]{2}\d{9}$/;
  return idRegex.test(idNumber);
};

/**
 * Valide un nom
 * - Au moins 2 caractères
 * - Lettres, espaces et tirets uniquement
 */
export const validateName = (name: string): boolean => {
  const nameRegex = /^[A-Za-zÀ-ÿ\s-]{2,}$/;
  return nameRegex.test(name);
};

/**
 * Valide une adresse
 * - Au moins 5 caractères
 */
export const validateAddress = (address: string): boolean => {
  return address.length >= 5;
};

/**
 * Valide un code OTP
 * - Exactement 6 chiffres
 */
export const validateOTP = (otp: string): boolean => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
}; 