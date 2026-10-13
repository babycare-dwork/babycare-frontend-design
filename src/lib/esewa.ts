export interface EsewaPayload {
  amount: number | string;
  tax_amount: number | string;
  total_amount: number | string;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: number | string;
  product_delivery_charge: number | string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

export interface EsewaPayment {
  payment_url: string;
  transaction_uuid: string;
  payload: EsewaPayload;
}

export function redirectToEsewa(payment: EsewaPayment) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = payment.payment_url;
  form.style.display = "none";

  Object.entries(payment.payload).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
