'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    VisibleSVG,
    InvisibleSVG,
} from '@/components/component/svg-icons/svg-icons';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import { RepertoirePromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import { string, object, date } from 'yup';
import UploadFileModal from './UploadFileModal';
import { Fournisseur } from '@/components/interface/fournisseur';
import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';
import axios from 'axios';

interface AddEntrepriseDialogProps {
    closeDialog: () => void;
    handleSubmit: (values: any) => any;
}

// export function AddEntrepriseDialog({
//     closeDialog,
//     handleSubmit,
// }: AddEntrepriseDialogProps) {
//     const INITIAL_VALUES = {
//         NEQ: '',
//         DAT_IMMAT: '',
//         COD_ACT_ECON_CAE: '',
//         DAT_CONSTI: '',
//         ADR_DOMCL_LIGN1_ADR: '',
//         ADR_DOMCL_LIGN2_ADR: '',
//         ADR_DOMCL_LIGN4_ADR: '',
//         NB_EMPLO: '',
//         NOM_ASSUJ: '',
//         LONG: '',
//         LAT: '',
//     };

//     const lang = useDataStore((state) => state.lang);

//     const dialogRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleEsc = (event: KeyboardEvent) => {
//             if (event.keyCode === 27) {
//                 closeDialog(event);
//             }
//         };

//         const handleClickOutside = (event: MouseEvent) => {
//             const target = event.target as Node;

//             // Keep the dialog open, only close if clicking outside the dialog and not on the dropdowns
//             if (dialogRef.current && !dialogRef.current.contains(target)) {
//                 closeDialog(event);
//             }
//         };

//         window.addEventListener('keydown', handleEsc);
//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             window.removeEventListener('keydown', handleEsc);
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [closeDialog]);

//     const validationSchema = createEntrepriseSchema(
//         RepertoirePromptsTranslations.requiered[lang],
//     );
//     const [isShown, setIsShown] = useState<string>('');

//     const localHandleSubmit = async (
//         values: any,
//         { setSubmitting, setStatus, resetForm }: FormikHelpers<any>,
//     ) => {
//         setSubmitting(true);

//         const response = await handleSubmit(values);

//         setSubmitting(false);

//         if (response) {
//             snack('success');
//         } else {
//             snack('fail');
//         }
//     };
//     function snack(confirm: string) {
//         setIsShown(confirm);
//         console.log('hi');
//         setTimeout(() => {
//             setIsShown('');
//         }, 5000);
//     }

//     return (
//         <div className="fixed z-40 h-[100%] left-[40px] backdrop-blur-md flex items-center justify-center w-screen overflow-hidden">
//             <div
//                 ref={dialogRef}
//                 className="dark:bg-[#262626] bg-white rounded-lg overflow-hidden shadow-2xl w-[80%] h-[95%] relative flex flex-row justify-center "
//             >
//                 <Formik
//                     initialValues={INITIAL_VALUES}
//                     onSubmit={localHandleSubmit}
//                     validationSchema={validationSchema}
//                 >
//                     {({ isSubmitting, status }) => (
//                         <Form className="dark:text-white w-full flex flex-row justify-between mt-2">
//                             <div className="flex flex-col gap-3 w-[50%] px-2">
//                                 <h2 className="font-bold">
//                                     {
//                                         RepertoirePromptsTranslations
//                                             .infoLegales[lang]
//                                     }
//                                 </h2>
//                                 <CustomFormInput
//                                     name="NEQ"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.NEQ[lang]
//                                     }
//                                     type={'text'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />
//                                 <CustomFormInput
//                                     name="DAT_IMMAT"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.DAT_IMMAT[
//                                             lang
//                                         ]
//                                     }
//                                     type={'date'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />
//                                 <CustomFormInput
//                                     name="DAT_CONSTI"
//                                     placeholder={
//                                         RepertoirePromptsTranslations
//                                             .DAT_CONSTI[lang]
//                                     }
//                                     type={'date'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />
//                                 <h2 className="font-bold">
//                                     {
//                                         RepertoirePromptsTranslations
//                                             .infosGenerales[lang]
//                                     }
//                                 </h2>
//                                 <CustomFormInput
//                                     name="NOM_ASSUJ"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.NOM_ASSUJ[
//                                             lang
//                                         ]
//                                     }
//                                     type={'text'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />{' '}
//                                 <CustomFormInput
//                                     name="COD_ACT_ECON_CAE"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.CAE[lang]
//                                     }
//                                     type={'text'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />{' '}
//                                 <CustomFormInput
//                                     name="NB_EMPLO"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.NB_EMPLO[
//                                             lang
//                                         ]
//                                     }
//                                     type={'text'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />
//                             </div>
//                             <div className="flex flex-col gap-3 w-[50%] px-2">
//                                 <h2 className="font-bold">
//                                     {
//                                         RepertoirePromptsTranslations.adresse[
//                                             lang
//                                         ]
//                                     }
//                                 </h2>
//                                 <CustomFormInput
//                                     name="ADR_DOMCL_LIGN1_ADR"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.ADR1[lang]
//                                     }
//                                     type={'text'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />
//                                 <CustomFormInput
//                                     name="ADR_DOMCL_LIGN2_ADR"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.ADR2[lang]
//                                     }
//                                     type={'text'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />
//                                 <CustomFormInput
//                                     name="ADR_DOMCL_LIGN4_ADR"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.ADR4[lang]
//                                     }
//                                     type={'text'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />

//                                 <h2 className="font-bold">
//                                     {
//                                         RepertoirePromptsTranslations
//                                             .coordonnesGeographiques[lang]
//                                     }
//                                 </h2>
//                                 <CustomFormInput
//                                     name="LONG"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.LONG[lang]
//                                     }
//                                     type={'text'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />
//                                 <CustomFormInput
//                                     name="LAT"
//                                     placeholder={
//                                         RepertoirePromptsTranslations.LAT[lang]
//                                     }
//                                     type={'text'}
//                                     disabled={isSubmitting}
//                                     className="pl-2"
//                                 />
//                             </div>

//                             <div className="flex items-center justify-evenly mt-4 absolute bottom-4 w-full">
//                                 <Button
//                                     type="submit"
//                                     buttonType={
//                                         isSubmitting
//                                             ? ButtonType.LOADING
//                                             : ButtonType.LAMBDA
//                                     }
//                                     pending={isSubmitting}
//                                 >
//                                     {
//                                         RepertoirePromptsTranslations
//                                             .addCompany[lang]
//                                     }
//                                 </Button>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>{' '}
//                 <div
//                     className={`absolute ${isShown === 'success' ? 'bg-green-200 right-2 opacity-100' : isShown === 'fail' ? 'bg-red-200 right-2 opacity-100' : 'right-2 translate-x-20 opacity-0'} rounded-md bottom-2 shadow-md h-fit w-fit p-2 transition-all duration-200`}
//                 >
//                     Added !
//                 </div>
//             </div>
//         </div>
//     );
// }

export interface DropDownSelectorProps {
    values: string[];
    select: (value: string) => void;
}

const DropDownSelector = React.forwardRef<
    HTMLDivElement,
    DropDownSelectorProps
>(({ values, select }, ref) => {
    return (
        <div
            ref={ref}
            className="w-52 h-52 bg-black text-white rounded p-2 shadow-lg absolute overflow-auto z-20"
        >
            <ul>
                {values.map((value: string) => (
                    <li
                        key={value}
                        className="cursor-pointer hover:bg-gray-700 p-1"
                        onClick={() => select(value)}
                    >
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    );
});

DropDownSelector.displayName = 'DropDownSelector';

export function AddEntrepriseDialog({
    closeDialog,
    handleSubmit,
}: AddEntrepriseDialogProps) {
    const [file, setFile] = useState<any>([]);
    const [localFile, setLocalFile] = useState<any>([]);
    const [selectedLocal, setSelectedLocal] = useState<any>([]);

    useEffect(() => {
        async function fetchEntData(entreprises: any) {
            const response = await axios.post(
                '/api/repertoire/getAddCompanyEntry',
                { entreprises },
            );

            if (response.status === 200) {
                setSelectedLocal((prev: any) => {
                    const ar: any = [];
                    for (
                        let i = 0;
                        i < response.data.foundCompanies.length;
                        i++
                    ) {
                        if (response.data.foundCompanies[i].length > 1) {
                            ar.push([]);
                        } else {
                            ar.push([0]);
                        }
                    }
                    return ar;
                });
                setLocalFile(response.data.foundCompanies);
            }
        }

        fetchEntData(file);
    }, [file]);

    const lang = useDataStore((state) => state.lang);
    const [isShown, setIsShown] = useState<string>('');
    const [snackMessage, setSnackMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<any>(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const dialogRef = useRef<HTMLDivElement>(null);
    const confirmDialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeDialog();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (isConfirmOpen) {
                if (
                    confirmDialogRef.current &&
                    !confirmDialogRef.current.contains(target)
                ) {
                    setIsConfirmOpen(false);
                }
            } else {
                if (dialogRef.current && !dialogRef.current.contains(target)) {
                    closeDialog();
                }
            }
            // Keep the dialog open, only close if clicking outside the dialog and not on the dropdowns
        };

        window.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDialog, isConfirmOpen]);

    const openConfirmModal = () => {
        const errors: any = [];
        selectedLocal.map((selected: any, index: number) => {
            if (localFile[index].length > 0 && selected.length < 1) {
                errors.push(index + 1);
            }
        });

        if (errors.length > 0) {
            snack('fail', `Errors in companies : ${errors.join(', ')}`);
        } else {
            setIsConfirmOpen(true);
        }
    };

    function snack(confirm: string, message: string) {
        setIsShown(confirm);
        setSnackMessage(message);

        setTimeout(() => {
            setIsShown('');
            setSnackMessage('');
        }, 5000);
    }

    const localHandleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const companies: any = [];
            let supposedInserts = 0;
            selectedLocal.map((selected: any, index: number) => {
                selected.map((selectedIndex: number) => {
                    const insertMe = { ...localFile[index][selectedIndex] };
                    if (!insertMe.NOM_ETAB && file[index].NOM_ETAB)
                        insertMe.NOM_ETAB = file[index].NOM_ETAB;
                    if (!insertMe.SCIAN && file[index].SCIAN)
                        insertMe.SCIAN = file[index].NOM_ETAB;
                    if (!insertMe.COD_ACT_ECON_CAE && file[index].CAE)
                        insertMe.COD_ACT_ECON_CAE = file[index].CAE;
                    if (!insertMe.NB_EMPLO && file[index].NB_EMPL)
                        insertMe.NB_EMPLO = file[index].NB_EMPL;
                    insertMe.ENT_FAM = true;

                    companies.push({ ...insertMe });
                    supposedInserts++;
                });
            });

            const response = await handleSubmit(companies);

            if (response === supposedInserts) {
                closeDialog();
            } else if (response === 0) {
                snack('fail', 'No documents were inserted');
            } else {
                snack('fail', 'Some documents were not inserted');
            }
        } catch (e) {
            console.error(e);

            snack('fail', 'An error occured');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed z-40 h-[100%] left-[40px] backdrop-blur-md flex items-center justify-center w-screen overflow-hidden">
            <div
                ref={dialogRef}
                className="dark:bg-[#262626] bg-white rounded-lg overflow-hidden shadow-2xl w-[80%] h-[95%] relative flex flex-col p-4 text-white "
            >
                <div
                    className={`absolute ${isShown === 'success' ? 'bg-green-400 right-2 opacity-100' : isShown === 'fail' ? 'bg-red-400 right-2 opacity-100' : 'right-2 translate-x-20 opacity-0'} rounded-md bottom-2 shadow-md h-fit w-fit p-2 transition-all duration-200 top-0 z-30`}
                >
                    {snackMessage}
                </div>

                <div className="absolute right-4 top-3 flex flex-row gap-3">
                    {' '}
                    <div
                        className={`${file.length > 0 ? 'opacity-100' : 'translate-x-20 opacity-0'} h-fit w-fit transition-all duration-200`}
                    >
                        <Button
                            pending={isSubmitting}
                            onClick={() => {
                                openConfirmModal();
                            }}
                        >
                            Soumettre
                        </Button>
                    </div>
                    <Button
                        onClick={closeDialog}
                        pending={isSubmitting}
                        buttonType={ButtonType.CANCEL}
                    >
                        ✕
                    </Button>
                </div>

                <div className="flex flex-col gap-4 pt-1">
                    <span className="font-bold uppercase pl-2 w-[95%] text-center text-lg">
                        INSÉRER PLUSIEURS ENTREPRISES FALILIALES À PARTIR
                        D&lsquo;UN FICHIER
                    </span>
                    <UploadFileModal
                        handleStartUpload={async (fileName: any, file: any) => {
                            const entreprises = formatFileNames(file);

                            setFile(entreprises);
                        }}
                    ></UploadFileModal>
                </div>
                <div className="h-full overflow-auto flex flex-col gap-4 p-4">
                    {file.length > 0 && localFile.length > 0 && (
                        <div className="rounded-lg p-4 pt-0 shadow-md flex flex-col gap-2">
                            {file.map((item: any, index: number) => {
                                const foundCompanies = localFile[index];

                                return (
                                    <div
                                        key={index} // Add a key for each mapped item
                                        className={`flex flex-col dark:text-white text-black rounded-lg p-4 shadow-md gap-2 transition-transform transform w-full border-2 ${selectedLocal[index].length > 0 ? 'border-green-400 ' : 'border-red-400 '} relative`}
                                    >
                                        <div
                                            className={`w-fit rounded-md flex items-center justify-center px-2 pb-1 pt-0.5 ${selectedLocal[index].length > 0 ? 'bg-green-500 ' : 'bg-red-500 '}`}
                                        >
                                            <p>{index + 1}</p>
                                        </div>
                                        <p className="font-semibold w-full text-center uppercase">
                                            {item.NOM_ENT}
                                        </p>
                                        <div className="flex flex-row gap-4 w-full items-center justify-center">
                                            {' '}
                                            <p className="w-fit">
                                                NEQ: {item.NEQ}
                                            </p>{' '}
                                            <p className="w-fit">
                                                SCIAN: {item.SCIAN}
                                            </p>{' '}
                                            <p className="w-fit">
                                                CAE: {item.CAE}
                                            </p>{' '}
                                        </div>

                                        <FoundCompanyComponent
                                            foundCompanies={foundCompanies}
                                            selectedCompany={
                                                selectedLocal[index]
                                            }
                                            setSelectedCompany={(
                                                companyIndex: number,
                                            ) => {
                                                setSelectedLocal(
                                                    (prev: any) => {
                                                        const newPrev = [
                                                            ...prev,
                                                        ]; // Create a copy of the previous array to avoid direct mutation
                                                        let newCompanyIndexes =
                                                            [...newPrev[index]]; // Make a copy of the current nested array

                                                        if (
                                                            newCompanyIndexes.includes(
                                                                companyIndex,
                                                            )
                                                        ) {
                                                            // If companyIndex is already in the array, remove it
                                                            newCompanyIndexes =
                                                                newCompanyIndexes.filter(
                                                                    (
                                                                        localIndex,
                                                                    ) =>
                                                                        localIndex !==
                                                                        companyIndex,
                                                                );
                                                        } else {
                                                            // If companyIndex is not in the array, add it
                                                            newCompanyIndexes.push(
                                                                companyIndex,
                                                            );
                                                        }

                                                        newPrev[index] =
                                                            newCompanyIndexes; // Update the specific index with the new array
                                                        return newPrev; // Return the updated array
                                                    },
                                                );
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            {isConfirmOpen && (
                <ConfirmationModal
                    handleSubmit={localHandleSubmit}
                    closeDialog={() => {
                        setIsConfirmOpen(false);
                    }}
                    modalRef={confirmDialogRef}
                />
            )}
        </div>
    );
}

function formatFileNames(file: any) {
    const formattedFile: any[] = [];

    if (!file) {
        return [];
    }

    const keys = Object.keys(file[0]);

    file.map((something: any) => {
        const entrepriseData: any = {
            SECTEUR_ACTIVITE: something[keys[0]],
            CAE: something[keys[1]],
            SCIAN: something[keys[2]],
            NOM_ENT: something[keys[3]],
            NEQ: something[keys[4]],
            NB_EMPL: something[keys[5]],
            ENT_FAM: something[keys[6]],
        };
        formattedFile.push(entrepriseData);
    });
    return formattedFile;
}

function FoundCompanyComponent({
    foundCompanies = [],
    selectedCompany = 0,
    setSelectedCompany = (index: number) => {},
}: {
    foundCompanies?: any;
    selectedCompany?: any;
    setSelectedCompany?: (index: number) => void;
}) {
    if (foundCompanies.length === 0) {
        return (
            <div className="flex flex-col gap-4 p-4 text-center">
                NO COMPANIES FOUND
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-4 p-4">
            {foundCompanies.map((company: any, index: number) => {
                const selected = selectedCompany.includes(index);

                return (
                    <div
                        key={index} // Add a key for each item
                        className={`${
                            selected
                                ? 'bg-green-100 border-green-400'
                                : 'bg-gray-100 border-bray-400'
                        } border shadow-sm rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer`}
                        onClick={() => {
                            setSelectedCompany(index);
                        }}
                    >
                        <h3 className="font-bold text-lg text-gray-800">
                            {company.ADR + ', ' + company.COD_POSTAL}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {company.NOM_ASSUJ?.join(', ') ||
                                'Nom indisponible'}
                        </p>{' '}
                        <p className="text-sm text-gray-600">
                            CAE : {company.COD_ACT_ECON_CAE || 'Indisponible'}
                        </p>
                        <p className="text-sm text-gray-600">
                            SCIAN : {company.SCIAN || 'Indisponible'}
                        </p>
                        <p className="text-sm text-gray-600">
                            Employés : {company.NB_EMPLO || 'Non spécifié'}
                        </p>
                        <p className="text-sm text-gray-600 italic">
                            {company.ENT_FAM ||
                                'Pas encore classifié comme entreprise familiale'}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
function ConfirmationModal({
    handleSubmit,
    closeDialog,
    modalRef,
}: {
    handleSubmit: () => void;
    closeDialog: () => void;
    modalRef: any;
}) {
    return (
        <div className="w-full h-full absolute" ref={modalRef}>
            <div className="w-full h-full relative items-center justify-center flex">
                {/* Backdrop */}
                <div
                    className="w-full h-full absolute backdrop-blur-sm top-0 left-0 scale-125"
                    onClick={(e: any) => {
                        e.stopPropagation();
                        closeDialog();
                    }} // Ensure clicking the backdrop closes only this dialog
                ></div>

                <div className="flex flex-col w-[30%] min-w-[100px] h-fit justify-between pt-16 px-2 relative dark:bg-[#262626] bg-gray-100 shadow-md rounded-md z-10">
                    <p className="text-white text-center text-lg px-4 font-bold uppercase whitespace-normal text-wrap">
                        Avez-vous validé toutes les informations que vous
                        souaitez insérer ?
                    </p>

                    <div className="flex flex-row w-full justify-evenly pb-2">
                        <Button
                            buttonType={ButtonType.LAMBDA}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                handleSubmit();
                            }}
                        >
                            Oui
                        </Button>
                        <Button
                            buttonType={ButtonType.CANCEL}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                closeDialog();
                            }}
                        >
                            Non
                        </Button>
                    </div>
                    <div className="absolute top-2 right-2">
                        <Button
                            onClick={(e: any) => {
                                e.stopPropagation();
                                closeDialog();
                            }}
                            buttonType={ButtonType.CANCEL}
                        >
                            ✕
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
