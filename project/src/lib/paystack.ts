import config from '@/config';

class PaystackService {
  private static instance: PaystackService;
  private handler: any;

  private constructor() {
    this.initializePaystack();
  }

  public static getInstance(): PaystackService {
    if (!PaystackService.instance) {
      PaystackService.instance = new PaystackService();
    }
    return PaystackService.instance;
  }

  private initializePaystack() {
    // Load Paystack inline script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    document.head.appendChild(script);
  }

  public async initializeTransaction(options: {
    email: string;
    amount: number;
    reference?: string;
    metadata?: any;
    callback: (response: any) => void;
    onClose: () => void;
  }) {
    const handler = window.PaystackPop?.setup({
      key: config.paystack.publicKey,
      email: options.email,
      amount: options.amount * 100, // Convert to kobo
      ref: options.reference || this.generateReference(),
      metadata: options.metadata || {},
      callback: options.callback,
      onClose: options.onClose,
    });

    handler?.openIframe();
  }

  private generateReference(): string {
    return `ref-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }
}

export const paystackService = PaystackService.getInstance();