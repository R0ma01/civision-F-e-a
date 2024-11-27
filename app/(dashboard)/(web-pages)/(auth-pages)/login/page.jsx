'use client';

import { useState } from 'react';
import ConnectDialog from '@/components/component/dialogs/connect-dialog';
import ForgotPasswordDialog from '@/components/component/dialogs/forgot-password-dialog';

export default function LoginPage() {
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    return (
        <main className="flex min-h-screen flex-col items-center gap-5 p-24">
            {!showForgotPassword ? (
                <ConnectDialog
                    onForgotPasswordClick={() => setShowForgotPassword(true)}
                />
            ) : (
                <ForgotPasswordDialog
                    onBackToLoginClick={() => setShowForgotPassword(false)}
                />
            )}
        </main>
    );
}
