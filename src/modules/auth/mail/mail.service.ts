import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendVerificationEmail(email: string, verificationLink: string) {
    await this.resend.emails.send({
      from: 'AlterVía <onboarding@resend.dev>',
      to: email,
      subject: 'Verificá tu cuenta en AlterVía',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h1 style="color: #14213D; font-size: 24px; margin-bottom: 8px;">
            Bienvenido a <span style="color: #FCA311;">AlterVía</span>
          </h1>
          <p style="color: #64748b; font-size: 15px; line-height: 1.6;">
            Gracias por registrarte. Solo falta un paso — verificá tu correo electrónico para activar tu cuenta.
          </p>
          <a href="${verificationLink}"
            style="display: inline-block; margin-top: 24px; padding: 12px 28px;
                   background-color: #FCA311; color: #14213D; font-weight: 700;
                   border-radius: 8px; text-decoration: none; font-size: 15px;">
            Verificar mi cuenta
          </a>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 24px;">
            Si no creaste una cuenta en AlterVía, ignorá este email.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">
            AlterVía · La Paz, Bolivia · UMSA 2026
          </p>
        </div>
      `,
    });
  }

  async sendResendVerificationEmail(email: string, verificationLink: string) {
    await this.resend.emails.send({
      from: 'AlterVía <onboarding@resend.dev>',
      to: email,
      subject: 'Reenvío — Verificá tu cuenta en AlterVía',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h1 style="color: #14213D; font-size: 24px; margin-bottom: 8px;">
            Verificá tu cuenta en <span style="color: #FCA311;">AlterVía</span>
          </h1>
          <p style="color: #64748b; font-size: 15px; line-height: 1.6;">
            Recibimos tu solicitud para reenviar el email de verificación.
          </p>
          <a href="${verificationLink}"
            style="display: inline-block; margin-top: 24px; padding: 12px 28px;
                   background-color: #FCA311; color: #14213D; font-weight: 700;
                   border-radius: 8px; text-decoration: none; font-size: 15px;">
            Verificar mi cuenta
          </a>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 24px;">
            Si no solicitaste esto, ignorá este email.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">
            AlterVía · La Paz, Bolivia · UMSA 2026
          </p>
        </div>
      `,
    });
  }
}
