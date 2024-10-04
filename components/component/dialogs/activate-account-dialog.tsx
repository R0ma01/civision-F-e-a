import useDataStore from '@/reducer/dataStore';
import { authTranslations } from '@/constants/translations/auth';
import FormStatus from '@/components/component/auth-form/form-status';
import { PagePaths } from '@/components/enums/page-paths-enum';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import submitForm from '@/utils/form-submit-utils';
import ActivateAccountProps from '@/components/interface/auth/activate-account';
import { Language } from '@/components/enums/language';
import FormStatusType from '@/components/interface/auth/form-status-type';
import Modal from '@/components/component//modal/modal';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import useGlobalUserStore from '@/stores/global-user-store';

const ActivateAccountDialog: React.FC<ActivateAccountProps> = ({ token }) => {
    const [status, setStatus] = useState<FormStatusType>({});

    const { setUser, updateCompletedTutorials } = useGlobalUserStore(
        (state: any) => ({
            setUser: state.setUser,
            updateCompletedTutorials: state.updateCompletedTutorials,
        }),
    );

    const { lang } = useDataStore();
    const t = authTranslations[lang as Language];
    const router = useRouter();

    const handleActivateAccount = async () => {
        await submitForm(
            'activate-account',
            { token },
            t.failedToActivate,
            () => {},
            setStatus,
            lang,
            null,
            PagePaths.LOGIN,
            router,
            setUser,
            updateCompletedTutorials,
        );
    };

    function backToLogin() {
        router.push(PagePaths.LOGIN);
    }

    return (
        <Modal title={t.feaWelcome}>
            <div
                className="max-w-[25rem] mx-auto p-6 rounded-lg shadow-2xl bg-gradient-to-b from-zinc-100 
            to-zinc-50/70 relative before:absolute before:-top-12 before:-left-16 before:w-96 before:h-96 
            before:bg-zinc-900 before:opacity-[.15] before:rounded-full before:blur-3xl before:-z-10"
            >
                <div className="relative text-sm text-zinc-800 font-medium mb-2">
                    <div className="mb-4">{t.activationInstructions}</div>
                    <Button
                        buttonType={ButtonType.CONFIRM}
                        onClick={handleActivateAccount}
                        className="mt-2 mb-2"
                    >
                        {t.activationButton}
                        <span
                            className="tracking-normal text-[#089596] group-hover:translate-x-0.5 transition-transform 
                        duration-150 ease-in-out ml-1"
                        >
                            -&gt;
                        </span>
                    </Button>
                    <Button onClick={backToLogin} className="mt-2 mb-2">
                        <span
                            className="tracking-normal px-1 text-[#089596] group-hover:translate-x-0.5 transition-transform 
                duration-150 ease-in-out"
                        >
                            &lt;-
                        </span>
                        {t.backToLogin}
                    </Button>

                    <FormStatus status={status} />
                </div>
            </div>
        </Modal>
    );
};

export default ActivateAccountDialog;
