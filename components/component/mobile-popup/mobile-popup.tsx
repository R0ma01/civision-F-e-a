import React, { useEffect, useState } from 'react';

const MobileWarningPopup: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            const mobileQuery = window.matchMedia('(max-width: 768px)');
            setIsMobile(mobileQuery.matches);
            mobileQuery.addEventListener('change', (e) =>
                setIsMobile(e.matches),
            );
        };

        checkMobile();
        return () => {
            const mobileQuery = window.matchMedia('(max-width: 768px)');
            mobileQuery.removeEventListener('change', (e) =>
                setIsMobile(e.matches),
            );
        };
    }, []);

    const handleClose = () => setIsVisible(false);

    if (!isMobile || !isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Attention!</h2>
                <p className="mb-4">
                    Cette plateforme est optimisée pour une utilisation sur
                    grand écran. Veuillez utiliser la plateforme{' '}
                    <i>Familles en Affaires</i> sur ordinateur pour une
                    meilleure experience.
                </p>
                <button
                    onClick={handleClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default MobileWarningPopup;
