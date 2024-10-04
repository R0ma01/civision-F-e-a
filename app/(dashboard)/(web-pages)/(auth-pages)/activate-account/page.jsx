'use client';
import ActivateAccount from '@/components/component/dialogs/activate-account-dialog';
import { useState, useEffect } from 'react';

export default function ActivateAccountPage() {
    const [token, setToken] = useState(null);

    function onBackToLogin() {
        router;
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get('token');
        setToken(tokenFromUrl);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <ActivateAccount token={token} />
        </main>
    );
}
