import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  private getEmailTemplate(
    title: string,
    body: string,
    link: string,
    linkText: string,
  ): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h1 style="color: #14213D; font-size: 24px; margin-bottom: 8px;">
          ${title}
        </h1>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6;">
          ${body}
        </p>
        <a href="${link}"
          style="display: inline-block; margin-top: 24px; padding: 12px 28px;
                 background-color: #FCA311; color: #14213D; font-weight: 700;
                 border-radius: 8px; text-decoration: none; font-size: 15px;">
          ${linkText}
        </a>
        <p style="color: #94a3b8; font-size: 13px; margin-top: 24px;">
          Si no solicitaste esto, ignorá este email.
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">
          AlterVía · La Paz, Bolivia · UMSA 2026
        </p>
      </div>
    `;
  }

  async sendVerificationEmail(email: string, verificationLink: string) {
    try {
      await this.transporter.sendMail({
        from: `"AlterVía" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Verificá tu cuenta en AlterVía',
        html: this.getEmailTemplate(
          'Bienvenido a <span style="color: #FCA311;">AlterVía</span>',
          'Gracias por registrarte. Solo falta un paso — verificá tu correo electrónico para activar tu cuenta.',
          verificationLink,
          'Verificar mi cuenta',
        ),
      });
      console.log(`Email de verificación enviado a ${email}`);
    } catch (error) {
      console.error('Error enviando email:', error);
      throw new InternalServerErrorException(
        'Error al enviar el email de verificación',
      );
    }
  }

  async sendResendVerificationEmail(email: string, verificationLink: string) {
    try {
      await this.transporter.sendMail({
        from: `"AlterVía" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Reenvío — Verificá tu cuenta en AlterVía',
        html: this.getEmailTemplate(
          'Verificá tu cuenta en <span style="color: #FCA311;">AlterVía</span>',
          'Recibimos tu solicitud para reenviar el email de verificación.',
          verificationLink,
          'Verificar mi cuenta',
        ),
      });
      console.log(`Email de reverificación enviado a ${email}`);
    } catch (error) {
      console.error('Error enviando email:', error);
      throw new InternalServerErrorException(
        'Error al reenviar el email de verificación',
      );
    }
  }
}
