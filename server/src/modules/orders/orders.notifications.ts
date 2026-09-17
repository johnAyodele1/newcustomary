export interface OrderNotifier {
  sendOrderReceived(reference: string, customer: { fullName: string; phone: string }): Promise<void>;
}

export const orderNotifier: OrderNotifier = {
  async sendOrderReceived(_reference, _customer) {
    // Integration point for branded email and WhatsApp delivery notifications.
  },
};
