import { useEffect } from 'react';
import Button from '@/components/component/buttons/button';
import { useRouter } from 'next/navigation';
import { PagePaths } from '@/components/enums/page-paths-enum';
import axios from 'axios';
import DisconnectDialogProps from '@/components/interface/auth/disconnect-confirmation-dialog';
import Modal from '@/components/component/modal/modal';
import useGlobalUserStore from '@/stores/global-user-store';
import { UserType } from '@/components/enums/user-type-enum';
import {
    SharedPromptsTranslations,
    ConnexionDialogPromptsTranslations,
} from '@/constants/translations/page-prompts';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';
import { credentialsLogout } from '@/services/credentials-login';

const DisconnectDialog: React.FC<DisconnectDialogProps> = ({ closeDialog }) => {
    const router = useRouter();
    const lang: Language = useDataStore((state) => state.lang);

    const { setLoginTutorials } = useGlobalUserStore((state: any) => ({
        setLoginTutorials: state.setLoginTutorials,
    }));

    function clearZustandStore() {
        // Replace 'zustand_store_key' with the actual key used by Zustand in localStorage
        console.log('i am called');
        localStorage.removeItem('global-data-store');
        localStorage.removeItem('global-page-store');
        localStorage.removeItem('global-user-store');
    }

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                closeDialog();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [closeDialog]);

    const handleDisconnect = async (e: any) => {
        e.preventDefault();

        try {
            // credentialsLogout

            await credentialsLogout();

            clearZustandStore();
            router.push(PagePaths.HOME);
            setLoginTutorials([]);
        } catch (e: any) {
            console.log(e);
        } finally {
            router.push(PagePaths.HOME);
            closeDialog();
        }
    };

    return (
        <Modal
            title={
                ConnexionDialogPromptsTranslations.disconnect_confirmation[lang]
            }
        >
            <div className="flex flex-row justify-evenly">
                <Button onClick={closeDialog}>
                    {SharedPromptsTranslations.cancel[lang]}
                </Button>
                <Button onClick={handleDisconnect}>
                    {SharedPromptsTranslations.confirm[lang]}
                </Button>
            </div>
        </Modal>
    );
};

export default DisconnectDialog;
// Helper to clear cookies
