import EmailType from '@/components/interface/email-type';
import sgMail from '@sendgrid/mail'; // sgMail: max de 100 e-mails par jour

const { SENDGRID_API, CIVGEO_URL } = process.env;

if (!SENDGRID_API) {
    throw new Error('SENDGRID_API environment variable is not set');
}

sgMail.setApiKey(SENDGRID_API);

type EmailTypeKey = 'password_reset' | 'account_activation';

const EMAIL_TYPES: Record<EmailTypeKey, EmailType> = {
    password_reset: {
        subject: 'Lien pour réinitialiser le mot de passe',
        message: 'reset your password',
        path: 'reset-password',
    },
    account_activation: {
        subject: 'Lien pour activer le compte',
        message: 'activate your account',
        path: 'activate-account',
    },
    // ...
};

export async function sendNoReplyEmail(
    email: string,
    token: string,
    emailType: EmailTypeKey,
): Promise<number> {
    const { subject, message, path } = EMAIL_TYPES[emailType];

    const emailInfo = {
        from: 'noreply@civision.org', // TO DO: À CHANGER
        to: email,
        subject: subject,
        html: `
      <p>
        Please use the link below to ${message}:<br />
        <a href="${CIVGEO_URL}/${path}?token=${token}">${CIVGEO_URL}/${path}</a>
      </p>
      <hr />
      <p>
        This email may contain sensitive information.<br />
        </p>`,
        // Visit us at: <a href="https://www.civision.org/">https://www.civision.org/</a>
    };

    try {
        const response = await sgMail.send(emailInfo);
        return response[0].statusCode;
    } catch (error: any) {
        console.error(`Error sending ${message} email:`, error.message);
        throw new Error(`Failed to send ${message} email`);
    }
}
