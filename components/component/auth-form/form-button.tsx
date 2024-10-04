import React from 'react';
import Button from '../buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';

interface FormButtonProps {
    text: string;
    isSubmitting: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ text, isSubmitting }) => {
    const submittedCSS = isSubmitting ? 'scale-100' : 'scale-105';

    return (
        <Button
            type="submit"
            buttonType={isSubmitting ? ButtonType.LOADING : ButtonType.CONFIRM}
            disabled={isSubmitting}
        >
            {text}
            {!isSubmitting && (
                <span className="text-white ml-1 transition-colors duration-300">
                    -&gt;
                </span>
            )}
        </Button>
    );
};

export default FormButton;
