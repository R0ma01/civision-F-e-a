import { validationTranslations } from "@/constants/translations/auth";
import useDataStore from "@/reducer/dataStore";
import { string, object, ref, boolean } from "yup";

export const authValidationSchemas = () => {
    const { lang } = useDataStore();
    const t = validationTranslations[lang];

    const forgotPasswordValidationSchema = object().shape({
        email: string().email(t.validEmail).required(t.emailRequired),
    });

    const signupValidationSchema = object().shape({
        firstName: string().required(t.firstNameRequired),
        lastName: string().required(t.lastNameRequired),
        organization: string(),
        email: string().email(t.validEmail).required(t.emailRequired),
        password: string().min(6, t.tooShort).required(t.passwordRequired),
        confirmPassword: string().min(6, t.tooShort).oneOf([ref("password")], t.passwordsMustMatch).required(t.confirmPasswordRequired),
    });

    const loginValidationSchema = object().shape({
        email: string().email(t.validEmail).required(t.emailRequired),
        password: string().required(t.passwordRequired),
    });

    const resetPasswordValidationSchema = object().shape({
        newPassword: string().min(6, t.tooShort).required(t.passwordRequired),
        passwordRetype: string().min(6, t.tooShort).oneOf([ref("newPassword")], t.passwordsMustMatch).required(t.confirmPasswordRequired),
    });

    return {
        signupValidationSchema,
        loginValidationSchema,
        forgotPasswordValidationSchema,
        resetPasswordValidationSchema
    };
};
