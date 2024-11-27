import { authValidationSchemas } from '@/validations/authValidationSchemas';
import useDataStore from '@/reducer/dataStore';
import { authTranslations } from '@/constants/translations/auth';
import { Formik, Form, FormikHelpers } from 'formik';
import FormInput from '@/components/component/auth-form/form-input';
import FormStatus from '@/components/component/auth-form/form-status';
import FormButton from '@/components/component/auth-form/form-button';
import { useRouter } from 'next/navigation';
import submitForm from '@/utils/form-submit-utils';
import ResetPasswordProps from '@/components/interface/auth/reset-password-dialog';
import { Language } from '@/components/enums/language';
import { PagePaths } from '@/components/enums/page-paths-enum';
import Modal from '@/components/component//modal/modal';

const INITIAL_VALUES = {
    newPassword: '',
    passwordRetype: '',
};

const ResetPasswordDialog: React.FC<ResetPasswordProps> = ({ token }) => {
    const { resetPasswordValidationSchema } = authValidationSchemas();
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
            'reset-password',
            { token, password: values.newPassword },
            t.resetError,
            setSubmitting,
            setStatus,
            lang,
            resetForm,
            PagePaths.LOGIN,
            router,
            (user) => {
                return;
            },
        );
    };

    return (
        <Modal title={t.resetPassword}>
            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={resetPasswordValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form
                        className="max-w-[30rem] mx-auto p-6 rounded-lg shadow-2xl bg-gradient-to-b
                     from-zinc-100 to-zinc-50/70 dark:bg-[#262626] relative"
                    >
                        <FormInput
                            name="newPassword"
                            label={t.newPassword}
                            type="password"
                        />
                        <FormInput
                            name="passwordRetype"
                            label={t.confirmPassword}
                            type="password"
                        />
                        <div className="flex items-center justify-center mt-4 mb-1">
                            <FormButton
                                text={isSubmitting ? t.submitting : t.reset}
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

export default ResetPasswordDialog;
