
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency amount in CFA Francs
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

// Format phone number
export function formatPhoneNumber(phone: string): string {
  // Strip non-digits
  const digits = phone.replace(/\D/g, "");
  
  // Format based on length
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  } else if (digits.length <= 9) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  } else {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
}

// Mask phone number (e.g., for display)
export function maskPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return digits;
  
  const visibleDigits = digits.slice(-4);
  const maskedDigits = digits.slice(0, -4).replace(/./g, "*");
  
  return `${maskedDigits}${visibleDigits}`;
}

// Generate a random transaction for demo purposes
export function generateMockTransaction() {
  const types = ["send", "receive", "payment"];
  const names = ["Marie Dupont", "Jean Mbeki", "Ali Touré", "Sara Hakimi"];
  const amounts = [500, 1000, 2000, 5000, 10000, 15000];
  
  return {
    id: Math.random().toString(36).substring(2, 10),
    type: types[Math.floor(Math.random() * types.length)],
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    name: names[Math.floor(Math.random() * names.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
  };
}

// Generate mock transactions
export function generateMockTransactions(count: number) {
  return Array(count).fill(null).map(() => generateMockTransaction());
}

// Format date in locale-specific format
export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Generate confetti for success animations
export function createConfetti(container: HTMLElement, count = 100) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'absolute animate-confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '50%';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.borderRadius = '50%';
    container.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 1500);
  }
}
