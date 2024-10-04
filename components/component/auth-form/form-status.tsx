import React from 'react';

interface FormStatusProps {
    status: {
        success?: string;
        error?: string;
    };
}

const FormStatus: React.FC<FormStatusProps> = ({ status }) => {
    return (
        <div className='text-center'>
            {status && status.success && <div className="text-green-600 text-sm">{status.success}</div>}
            {status && status.error && <div className="text-red-600 text-sm">{status.error}</div>}
        </div>
    );
};

export default FormStatus;