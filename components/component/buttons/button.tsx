import { ButtonHTMLAttributes } from 'react';
import { ButtonType } from '@/components/enums/button-type-enum';
import { useFormStatus } from 'react-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: ButtonType;
    children: React.ReactNode;
    className?: string;
    scaleOnHover?: boolean;
}

const dettermineColor = (buttonType: ButtonType, pending: boolean): string => {
    if (pending) {
        return 'bg-gray-400 border-gray-400 cursor-not-allowed';
    }
    switch (buttonType) {
        case ButtonType.CANCEL:
            return 'bg-red-500 hover:bg-red-600 py-2 px-4 ';
        case ButtonType.CONFIRM:
        case ButtonType.PULSE:
            return 'bg-logo-green hover:bg-hover-logo-green py-2 px-4 ';
        case ButtonType.ICON:
            return 'bg-none border-none';
        case ButtonType.ICON_ROUNDED:
            return 'border rounded-lg p-1';
        case ButtonType.LOADING:
            return 'bg-gray-400 border-gray-400 cursor-not-allowed py-2 px-4 ';
        default:
            return 'bg-logo-dark-blue py-2 px-4 ';
    }
};

const Button: React.FC<ButtonProps> = ({
    buttonType = ButtonType.LAMBDA,
    className = '',
    children,
    scaleOnHover = true,
    ...props
}) => {
    const { pending } = useFormStatus();
    const colorScheme = dettermineColor(buttonType, pending);
    const pulseAnimation =
        buttonType === ButtonType.PULSE && !pending ? 'animate-pulse' : '';
    const pendingScale = pending
        ? 'scale-100'
        : scaleOnHover
          ? 'hover:scale-105'
          : '';
    return (
        <button
            className={`text-white font-semibold border rounded transition-transform duration-300 transform-gpu ${pulseAnimation} ${pendingScale} ${colorScheme} ${className}`}
            {...props}
            disabled={pending}
        >
            {pending ? 'Loading...' : children}
        </button>
    );
};

export default Button;
