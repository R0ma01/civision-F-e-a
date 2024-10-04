'use client';
import ResetPassword from '@/components/component/dialogs/reset-password-dialog';
import { useState, useEffect } from 'react';
import { PagePaths } from '@/components/enums/page-paths-enum';

export default function ResetPasswordPage() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get('token');
        setToken(tokenFromUrl);
    }, []);

    const redirectHome = () => {
        window.location.href = PagePaths.HOME;
    };

    return (
        <main>
            {token ? (
                <ResetPassword token={token} />
            ) : (
                <>
                    <p className="text-m text-center">
                        Lien de réinitialisation invalide
                    </p>
                    <button
                        onClick={redirectHome}
                        className="bg-[rgb(219 225 220)] w-[100px] btn-sm mt-2 cursor-pointer transition ease-in-out duration-300 relative border border-gray-300 p-1 rounded-md hover:bg-slate-200 hover:scale-105"
                    >
                        Accueil
                    </button>
                </>
            )}
        </main>
    );
}
