'use client';

import { useRef, useState, useEffect } from 'react';
import { Folder, X } from 'lucide-react';
import { parseFile } from './uploadDbUtilities';
import axios from 'axios';

const UploadFileModal = ({ handleStartUpload }) => {
    const fileInputRef = useRef(null);

    const [selectedOption, setSelectedOption] = useState('file');
    const [apiUrl, setApiUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null);

    // ==========================
    // DATA HANDLING FUNCTIONS ==
    // ==========================

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const parsedData = await parseFile(selectedFile);

            setFileName(selectedFile.name);
            setFile(parsedData);
        }
    };

    useEffect(() => {
        async function send() {
            await handleStartUpload(fileName, file);
        }

        send();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    const clearFile = () => {
        setFileName(null);
        setFile(null);
        fileInputRef.current?.value && (fileInputRef.current.value = '');
    };

    // ==========================
    // UI HANDLING FUNCTIONS ====
    // ==========================

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];

        if (selectedFile) {
            const parsedData = await parseFile(selectedFile);
            console.log(parsedData);

            setFileName(selectedFile.name);
            setFile(parsedData);
        }
    };

    // ==========================
    // RENDER ===================
    // ==========================

    return (
        <div className="flex flex-col w-full mt-4">
            <div
                className="relative border-dashed border-2 border-gray-300 rounded-md text-black"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="text"
                    onClick={handleFileClick}
                    value={fileName || ''}
                    placeholder="Sélectionner ou glisser un fichier ici (*.xlsx, *.xls, *.json) "
                    className="w-full px-3 py-2 border text-[13px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                    readOnly
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {fileName && (
                    <button
                        onClick={clearFile}
                        className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        <X size={14} />
                    </button>
                )}

                <button
                    onClick={handleFileClick}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    <Folder size={20} className="text-primary2" />
                </button>
            </div>

            <div className="flex ml-0.5 justify-between items-center">
                <span
                    className={`${selectedItems.length <= 0 || selectedOption === 'file' ? 'opacity-0' : 'opacity-100'} text-xs flex items-center`}
                >
                    {selectedItems.length} données sélectionnées
                    {selectedItems.length > 0 && (
                        <button
                            onClick={() => {
                                setSelectedItems([]);
                            }}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                            <X size={12} />
                        </button>
                    )}
                </span>
            </div>
        </div>
    );
};

export default UploadFileModal;
