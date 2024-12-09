import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PagePaths } from '@/components/enums/page-paths-enum';
import { authValidationSchemas } from '@/validations/authValidationSchemas';
import useDataStore from '@/reducer/dataStore';
import { authTranslations } from '@/constants/translations/auth';
import { Formik, Form, FormikHelpers } from 'formik';
import FormInput from '@/components/component/auth-form/form-input';
import FormStatus from '@/components/component/auth-form/form-status';
import FormButton from '@/components/component/auth-form/form-button';
import submitForm from '@/utils/form-submit-utils';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import {
    ConnectDialogProps,
    FormValues,
} from '@/components/interface/auth/connect-dialog';
import { Language } from '@/components/enums/language';
import Modal from '@/components/component/modal/modal';
import {
    credentialsSignIn,
    getAuthSession,
} from '@/services/credentials-login';
import axios from 'axios';
import useGlobalUserStore from '@/stores/global-user-store';
//import { useGlobalUserStore } from '@/stores/global-user-store';

const ConnectDialog: React.FC<ConnectDialogProps> = ({
    onForgotPasswordClick,
}) => {
    const { loginValidationSchema } = authValidationSchemas();
    const { lang } = useDataStore();
    const t = authTranslations[lang as Language];
    const router = useRouter();
    const { setLoginTutorials } = useGlobalUserStore((state: any) => ({
        setLoginTutorials: state.setLoginTutorials,
    }));

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                router.push(PagePaths.HOME);
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [router]);

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, setStatus, resetForm }: FormikHelpers<FormValues>,
    ) => {
        setSubmitting(true);
        try {
            console.log('hello');
            await credentialsSignIn({
                email: values.email,
                password: values.password,
                lang,
            });

            const tutorials = await axios.get('/api/user/fetch-accesses');

            setLoginTutorials(tutorials.data.tutorials);
        } catch (error: any) {
            if ((error.stack.split(':')[0] = 'AccessDenied')) {
                console.log(error);
                setErrorMessage(t.accessDenied);
            } else {
                setErrorMessage('BBBBBBBBB');

                console.log(error);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal title="Bonjour à nouveau !">
            <p className="text-red-500">{errorMessage}</p>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form className="space-y-4">
                        <FormInput
                            name="email"
                            label={t.email}
                            type="email"
                            placeholder="jean@hec.qc"
                        />
                        <div>
                            <FormInput
                                name="password"
                                label={t.password}
                                type="password"
                                placeholder="******"
                            />
                            <button
                                onClick={onForgotPasswordClick}
                                type="button"
                                className="my-1 text-sm font-medium text-zinc-500 underline hover:no-underline"
                            >
                                {t.forgotPassword}
                            </button>
                        </div>

                        <div className="flex flex-row justify-evenly">
                            <Button
                                buttonType={ButtonType.CANCEL}
                                type="button"
                                onClick={() => router.push(PagePaths.HOME)}
                            >
                                Annuler
                            </Button>

                            <FormButton
                                text={isSubmitting ? t.submitting : t.submit}
                                isSubmitting={isSubmitting}
                            />
                        </div>
                        <FormStatus status={status} />
                    </Form>
                )}
            </Formik>
            <div className="mt-4 text-center">
                <p className="text-black dark:text-gray-500">
                    Vous êtes nouveau ?
                    <Link
                        href="/signup"
                        className="mt-1 text-sm dark:text-gray-500 font-medium text-blue-500 underline hover:no-underline ml-2"
                    >
                        Inscrivez-vous!
                    </Link>
                </p>
            </div>
        </Modal>
    );
};

export default ConnectDialog;
