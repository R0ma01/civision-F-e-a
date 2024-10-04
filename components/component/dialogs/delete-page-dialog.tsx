import { useEffect, useRef } from 'react';
import Button from '@/components/component//buttons/button';

interface DeleteDialogProps {
    closeDialog: () => void;
    submitDialog: (id: string) => void;
    deleteItem: any;
}

const DeleteItemDialog: React.FC<DeleteDialogProps> = ({
    closeDialog,
    submitDialog,
    deleteItem: page,
}) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeDialog();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                closeDialog();
            }
        };

        window.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDialog]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitDialog(page._id);
    };

    return (
        <div className="fixed z-50 flex items-center justify-center bg-black bg-opacity-50 w-[100%] h-screen">
            <div
                ref={dialogRef}
                className="bg-white dark:bg-[#262626] p-8 rounded-lg shadow-2xl w-[70%] relative"
            >
                <h1 className="text-4xl font-bold mb-10">
                    Êtes-vous sûr de vouloir suprimer cette page ?
                </h1>
                <Button onClick={handleSubmit}>Supprimer</Button>
                <Button onClick={closeDialog}>Annuler</Button>
            </div>
        </div>
    );
};

export default DeleteItemDialog;
