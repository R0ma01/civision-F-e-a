import ModalProps from '@/components/interface/modal';
import React from 'react';
import RotatingLogo from '@/components/component/rotating-logo/rotating-logo';

const Modal: React.FC<ModalProps> = ({ title, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center bg-white dark:bg-[#363636] text-black dark:text-white">
            <div className="absolute top-[10%] -right-32 w-[900px] h-[900px]">
                <RotatingLogo></RotatingLogo>
            </div>
            <div className="bg-white dark:bg-[#262626] p-8 rounded-lg shadow-2xl w-[450px] relative z-10 ml-[10%]">
                <h1 className="text-4xl font-bold mb-5">{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default Modal;
