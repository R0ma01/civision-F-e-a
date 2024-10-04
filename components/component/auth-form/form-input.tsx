import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface FormInputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    name,
    label,
    type = 'text',
    placeholder = '',
}) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block dark:text-white text-black font-medium mb-2"
            >
                {label}
            </label>
            <Field
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full px-4 py-2 border dark:border-white dark:text-white border-black bg-transparent rounded-lg focus:ring-[#8dd0cf] focus:border-[#8dd0cf]"
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-sm font-medium ml-2"
            />
        </div>
    );
};

export default FormInput;
