import { useRouter } from 'next/navigation';
import { authValidationSchemas } from '@/validations/authValidationSchemas';
import useDataStore from '@/reducer/dataStore';
import { authTranslations } from '@/constants/translations/auth';
import { Formik, Form, FormikHelpers } from 'formik';
import FormInput from '@/components/component/auth-form/form-input';
import FormStatus from '@/components/component/auth-form/form-status';
import FormButton from '@/components/component/auth-form/form-button';
import submitForm from '@/utils/form-submit-utils';
import { Language } from '@/components/enums/language';
import Modal from '@/components/component/modal/modal';
import Button from '@/components/component/buttons/button';
import { PagePaths } from '@/components/enums/page-paths-enum';
import useGlobalUserStore from '@/stores/global-user-store';

const INITIAL_VALUES = {
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignupDialog: React.FC = () => {
    const { signupValidationSchema } = authValidationSchemas();
    const { lang } = useDataStore();
    const t = authTranslations[lang as Language];
    const { setUser } = useGlobalUserStore((state: any) => ({
        setUser: state.setUser,
    }));

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
            'signup',
            {
                firstName: values.firstName,
                lastName: values.lastName,
                organization: values.organization,
                email: values.email,
                password: values.password,
            },
            t.signupError,
            setSubmitting,
            setStatus,
            lang,
            resetForm,
            null,
            router,
            setUser,
        );
    };

    function backToLogin() {
        router.push(PagePaths.LOGIN);
    }

    return (
        <Modal title={t.createNewAccount}>
            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={signupValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form className="space-y-2">
                        <div className="flex gap-2 mb-1">
                            <FormInput
                                name="firstName"
                                label={t.firstName}
                                placeholder={t.firstName}
                            />
                            <FormInput
                                name="lastName"
                                label={t.lastName}
                                placeholder={t.lastName}
                            />
                        </div>
                        <FormInput
                            name="organization"
                            label={t.organization}
                            placeholder={t.organization}
                        />
                        <FormInput
                            name="email"
                            label={t.email}
                            placeholder={t.email}
                            type="email"
                        />
                        <FormInput
                            name="password"
                            label={t.password}
                            placeholder={'********'}
                            type="password"
                        />
                        <FormInput
                            name="confirmPassword"
                            label={t.confirmPassword}
                            placeholder={'********'}
                            type="password"
                        />
                        <div className="flex items-center justify-evenly">
                            <Button onClick={backToLogin} className="mt-2 mb-2">
                                <span
                                    className="tracking-normal px-1 text-[#089596] group-hover:translate-x-0.5 transition-transform 
                    duration-150 ease-in-out"
                                >
                                    &lt;-
                                </span>
                                {t.backToLogin}
                            </Button>
                            <FormButton
                                text={isSubmitting ? t.signingUp : t.signUp}
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

export default SignupDialog;
