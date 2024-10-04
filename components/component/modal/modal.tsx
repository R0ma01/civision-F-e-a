import ModalProps from '@/components/interface/modal';
import React from 'react';

const Modal: React.FC<ModalProps> = ({ title, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black dark:text-white">
            <div className="bg-white dark:bg-[#262626] p-8 rounded-lg shadow-2xl w-[450px] relative">
                <h1 className="text-4xl font-bold mb-5">{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default Modal;
