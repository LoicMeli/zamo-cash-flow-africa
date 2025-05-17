import { Platform, Alert } from 'react-native';

export interface PDFReceipt {
  reference: string;
  date: string;
  recipient: {
    name: string;
    phone: string;
  };
  amount: number;
  fee: string;
}

/**
 * Utility class for generating transaction receipt PDFs
 * Note: This is a simplified version for Expo Go compatibility
 */
export class PDFGenerator {
  /**
   * Captures a view as an image and save as a PDF (simulated for Expo Go)
   * @param viewRef React ref to the view to capture
   * @param receipt Receipt data
   * @returns Promise resolving to the path of the saved PDF file
   */
  static async captureAndSavePDF(viewRef: any, receipt: PDFReceipt): Promise<string | null> {
    try {
      // Simulate PDF generation (mock implementation for Expo Go)
      const filename = `Zamo-Receipt-${receipt.reference}.pdf`;
      
      // Simulate success
      Alert.alert(
        "Receipt Generated (Simulated)",
        `Your receipt would be saved as ${filename}\n\nNote: Actual PDF generation requires a development build`,
        [{ text: "OK" }]
      );
      
      return "file://simulated-path/" + filename;
    } catch (error) {
      console.error('Error generating PDF (simulated)', error);
      Alert.alert(
        "Error",
        "Failed to generate receipt. Please try again later.",
        [{ text: "OK" }]
      );
      return null;
    }
  }
  
  /**
   * Share the generated PDF receipt (simulated for Expo Go)
   * @param filePath Path to the PDF file
   */
  static async sharePDF(filePath: string): Promise<void> {
    try {
      Alert.alert(
        "Share PDF (Simulated)",
        "Sharing receipt is not available in Expo Go.\n\nNote: This feature requires a development build.",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error('Error sharing PDF (simulated)', error);
      Alert.alert(
        "Error",
        "Failed to share receipt. Please try again later.",
        [{ text: "OK" }]
      );
    }
  }
  
  /**
   * Format currency with commas
   * @param value Number to format
   */
  static formatCurrency(value: number): string {
    return value.toLocaleString();
  }
} 