import { useEffect, useState } from 'react';
import axios from 'axios';
import useDataStore from '@/reducer/dataStore';
import { Language } from '@/components/enums/language';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import { CloseArrowSVG, OpenArrowSVG } from '../svg-icons/svg-icons';

interface ImageDropDownProps {
    handleImageChange: (imagePath: string) => void;
    selectedImage: string;
    className?: string;
}

const ImageDropdown = ({
    handleImageChange,
    selectedImage,
    className = '',
}: ImageDropDownProps) => {
    const [images, setImages] = useState<string[]>([]);

    const [isOpen, setIsOpen] = useState(false);

    const lang: Language = useDataStore((state) => state.lang);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('/api/images');
                setImages(response.data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handleSelectImage = (image: string) => {
        setIsOpen(false);
        handleImageChange(image);
    };

    return (
        <div className={`${className}`}>
            <div className={`flex flex-col items-center relative`}></div>{' '}
            {/* Ensure parent has relative positioning */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                className="mb-4 p-3 rounded bg-[#DFDFDF] dark:bg-dark-map-gray border border-logo-dark-blue flex flex-row items-center"
            >
                {selectedImage !== '' ? (
                    <div className="flex items-center">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-20 h-20 object-cover mr-2"
                        />
                    </div>
                ) : (
                    SharedPromptsTranslations.image[lang]
                )}
                {isOpen ? (
                    <div>
                        {/* Content to show when dropdown is open */}
                        <CloseArrowSVG className="fill-logo-dark-blue dark:fill-white"></CloseArrowSVG>
                    </div>
                ) : (
                    <div>
                        <OpenArrowSVG className="fill-logo-dark-blue dark:fill-white"></OpenArrowSVG>
                    </div>
                )}
            </button>
            {isOpen && (
                <ul className="absolute top-28 w-36 rounded gap-1 bg-[#DFDFDF] dark:bg-dark-map-gray shadow-md max-h-64 overflow-y-auto z-30 flex flex-col items-center">
                    {images.length > 0 &&
                        images.map((image, index) => {
                            if (selectedImage !== image) {
                                return (
                                    <li
                                        key={index}
                                        className="flex flex-col items-center cursor-pointer hover:bg-gray-400 w-full"
                                        onClick={() => handleSelectImage(image)}
                                    >
                                        <img
                                            src={image}
                                            alt={image}
                                            className="w-20 h-20 object-cover"
                                        />
                                    </li>
                                );
                            }
                        })}
                </ul>
            )}
        </div>
    );
};

export default ImageDropdown;
