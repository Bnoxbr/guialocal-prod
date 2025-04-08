// MercadoPago - Free tier with transaction fees
import { loadMercadoPago } from "@mercadopago/sdk-js";

export const initializePayment = async () => {
  await loadMercadoPago();
  const mp = new window.MercadoPago(
    import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY,
  );
  return mp;
};

export const createPayment = async (data: {
  amount: number;
  description: string;
  paymentMethod: "pix" | "card";
}) => {
  // Implementation will depend on your backend
  // For MVP, you can use MercadoPago's transparent checkout
};
