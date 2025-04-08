// EmailJS - Free tier: 200 emails/month
import emailjs from "@emailjs/browser";

export const initEmailService = () => {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
};

// Templates de email recomendados para configurar no EmailJS:
/*
Template Cliente (template_cliente):
Assunto: Reserva Confirmada - {{local_tour}}
Corpo:
Olá {{cliente_nome}}!

Sua reserva foi confirmada com sucesso!

Detalhes da reserva:
- Guia: {{guia_nome}}
- Data: {{data}}
- Local: {{local_tour}}
- Valor: {{preco_total}}

Template Guia (template_guia):
Assunto: Nova Reserva - {{local_tour}}
Corpo:
Olá {{guia_nome}}!

Você recebeu uma nova reserva!

Detalhes:
- Cliente: {{cliente_nome}}
- Data: {{data}}
- Local: {{local_tour}}
- Valor: {{preco_total}}
*/

export const sendNotification = async ({
  to_email,
  template_id,
  template_params,
}: {
  to_email: string;
  template_id: string;
  template_params: any;
}) => {
  return emailjs.send("service_6f42yrm", template_id, {
    to_email,
    ...template_params,
  });
};
