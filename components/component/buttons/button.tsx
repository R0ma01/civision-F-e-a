import { ButtonHTMLAttributes } from 'react';
import { ButtonType } from '@/components/enums/button-type-enum';
import { useFormStatus } from 'react-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: ButtonType;
    children: React.ReactNode;
    className?: string;
    scaleOnHover?: boolean;
    pending?: boolean;
}

const dettermineColor = (buttonType: ButtonType, pending: boolean): string => {
    if (pending) {
        buttonType = ButtonType.LOADING;
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
            return 'bg-gray-400 border-gray-400 cursor-not-allowed py-2 px-4';
        default:
            return 'bg-logo-dark-blue py-2 px-4 ';
    }
};

const Button: React.FC<ButtonProps> = ({
    buttonType = ButtonType.LAMBDA,
    className = '',
    children,
    scaleOnHover = true,
    pending = false,
    ...props
}) => {
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
            className={`text-white font-semibold h-fit border rounded transition-transform relative duration-300 transform-gpu ${pulseAnimation} ${pendingScale} ${colorScheme} ${className}`}
            {...props}
            disabled={pending}
        >
            {
                <div className={pending ? 'opacity-0' : 'opacity-100'}>
                    {children}
                </div>
            }
            {pending && (
                <span
                    className={
                        'absolute inset-0 flex items-center justify-center text-center font-bold'
                    }
                >
                    Loading...
                </span>
            )}
        </button>
    );
};

export default Button;
