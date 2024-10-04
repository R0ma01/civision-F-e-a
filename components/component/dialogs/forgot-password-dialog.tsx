import { authValidationSchemas } from '@/validations/authValidationSchemas';
import useDataStore from '@/reducer/dataStore';
import { authTranslations } from '@/constants/translations/auth';
import { Formik, Form, FormikHelpers } from 'formik';
import FormInput from '@/components/component/auth-form/form-input';
import FormStatus from '@/components/component/auth-form/form-status';
import FormButton from '@/components/component/auth-form/form-button';
import submitForm from '@/utils/form-submit-utils';
import { useRouter } from 'next/navigation';
import ForgotPasswordProps from '@/components/interface/auth/forgot-password-dialog';
import { Language } from '@/components/enums/language';
import Modal from '@/components/component/modal/modal';
import Button from '@/components/component/buttons/button';

const INITIAL_VALUES = { email: '' };

const ForgotPasswordDialog: React.FC<ForgotPasswordProps> = ({
    onBackToLoginClick,
}) => {
    const { forgotPasswordValidationSchema } = authValidationSchemas();
    const { lang } = useDataStore();
    const t = authTranslations[lang as Language];

    const router = useRouter();

    const handleSubmit = async (
        values: typeof INITIAL_VALUES,
        {
            setSubmitting,
            setStatus,
            resetForm,
        }: FormikHelpers<typeof INITIAL_VALUES>,
    ) => {
        await submitForm(
            'forgot-password',
            { email: values.email },
            t.errorSendingResetEmail,
            setSubmitting,
            setStatus,
            lang,
            resetForm,
            null,
            router,
            (user) => {
                return;
            },
        );
    };

    return (
        <Modal title={t.newPassword}>
            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={forgotPasswordValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form
                        className="max-w-[30rem] mx-auto p-6 rounded-lg shadow-2xl bg-gradient-to-b from-zinc-100
                     to-zinc-50/70 relative"
                    >
                        <FormInput
                            name="email"
                            label="E-mail"
                            type="email"
                            placeholder={t.enterEmail}
                        />
                        <div className="flex items-center justify-evenly mt-4 mb-1">
                            <Button
                                onClick={onBackToLoginClick}
                                className="mt-2 mb-2"
                            >
                                <span
                                    className="tracking-normal px-1 text-[#089596] group-hover:translate-x-0.5 transition-transform 
                duration-150 ease-in-out"
                                >
                                    &lt;-
                                </span>
                                {t.backToLogin}
                            </Button>
                            <FormButton
                                text={t.send}
                                isSubmitting={isSubmitting}
                            />
                        </div>
                        <FormStatus status={status} />
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default ForgotPasswordDialog;
