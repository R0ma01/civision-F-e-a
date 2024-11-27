'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect, useRef } from 'react';

import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import { RepertoirePromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import { string, object, date } from 'yup';

function createEntrepriseSchema(requiered: string) {
    return object().shape({
        NEQ: string().required(requiered),
        DAT_IMMAT: date().required(requiered),
        COD_ACT_ECON_CAE: string().required(requiered),
        DAT_CONSTI: string().required(requiered),
        ADR_DOMCL_LIGN1_ADR: string().required(requiered),
        ADR_DOMCL_LIGN2_ADR: string().required(requiered),
        ADR_DOMCL_LIGN4_ADR: string().required(requiered),
        NB_EMPLO: string().required(requiered),
        NOM_ASSUJ: string().required(requiered),
        LONG: string().required(requiered),
        LAT: string().required(requiered),
    });
}

interface AddEntrepriseDialogProps {
    closeDialog: (e: any) => void;
    handleSubmit: (values: any) => void;
}

export function AddEntrepriseDialog({
    closeDialog,
    handleSubmit,
}: AddEntrepriseDialogProps) {
    const INITIAL_VALUES = {
        NEQ: '',
        DAT_IMMAT: '',
        COD_ACT_ECON_CAE: '',
        DAT_CONSTI: '',
        ADR_DOMCL_LIGN1_ADR: '',
        ADR_DOMCL_LIGN2_ADR: '',
        ADR_DOMCL_LIGN4_ADR: '',
        NB_EMPLO: '',
        NOM_ASSUJ: '',
        LONG: '',
        LAT: '',
    };

    const lang = useDataStore((state) => state.lang);

    const [secteursOptions, setSecteursOptions] = useState<string[]>([]);
    const [servicesOptions, setServicesOptions] = useState<string[]>([]);
    const [isSecteurDropdownVisible, setSecteurDropdownVisible] =
        useState(false);
    const [isServiceDropdownVisible, setServiceDropdownVisible] =
        useState(false);

    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeDialog(event);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Keep the dialog open, only close if clicking outside the dialog and not on the dropdowns
            if (dialogRef.current && !dialogRef.current.contains(target)) {
                closeDialog(event);
            }
        };

        window.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDialog]);

    const validationSchema = createEntrepriseSchema(
        RepertoirePromptsTranslations.requiered[lang],
    );

    return (
        <div className="fixed z-40 h-[100%] left-[40px] backdrop-blur-md flex items-center justify-center w-screen overflow-hidden">
            <div
                ref={dialogRef}
                className="bg-white dark:bg-[#262626] p-2 rounded-lg shadow-2xl w-[80%] h-[95%] relative space-y-8 flex flex-row justify-evenly "
            >
                <Formik
                    initialValues={INITIAL_VALUES}
                    onSubmit={(values) => {
                        console.log(values);
                        handleSubmit(values);
                    }}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting, status }) => (
                        <Form className="space-y-4 dark:text-white w-full mt-6">
                            <div className="flex flex-row w-full">
                                <div className="flex flex-col gap-3 w-[50%] px-2">
                                    <h2 className="font-bold">
                                        {
                                            RepertoirePromptsTranslations
                                                .infoLegales[lang]
                                        }
                                    </h2>
                                    <CustomFormInput
                                        name="NEQ"
                                        placeholder={
                                            RepertoirePromptsTranslations.NEQ[
                                                lang
                                            ]
                                        }
                                        type={'text'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />
                                    <CustomFormInput
                                        name="DAT_IMMAT"
                                        placeholder={
                                            RepertoirePromptsTranslations
                                                .DAT_IMMAT[lang]
                                        }
                                        type={'date'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />
                                    <CustomFormInput
                                        name="DAT_CONSTI"
                                        placeholder={
                                            RepertoirePromptsTranslations
                                                .DAT_CONSTI[lang]
                                        }
                                        type={'date'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />
                                    <h2 className="font-bold">
                                        {
                                            RepertoirePromptsTranslations
                                                .infosGenerales[lang]
                                        }
                                    </h2>
                                    <CustomFormInput
                                        name="NOM_ASSUJ"
                                        placeholder={
                                            RepertoirePromptsTranslations
                                                .NOM_ASSUJ[lang]
                                        }
                                        type={'text'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />{' '}
                                    <CustomFormInput
                                        name="COD_ACT_ECON_CAE"
                                        placeholder={
                                            RepertoirePromptsTranslations.CAE[
                                                lang
                                            ]
                                        }
                                        type={'text'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />{' '}
                                    <CustomFormInput
                                        name="NB_EMPLO"
                                        placeholder={
                                            RepertoirePromptsTranslations
                                                .NB_EMPLO[lang]
                                        }
                                        type={'text'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 w-[50%] px-2">
                                    <h2 className="font-bold">
                                        {
                                            RepertoirePromptsTranslations
                                                .adresse[lang]
                                        }
                                    </h2>
                                    <CustomFormInput
                                        name="ADR_DOMCL_LIGN1_ADR"
                                        placeholder={
                                            RepertoirePromptsTranslations.ADR1[
                                                lang
                                            ]
                                        }
                                        type={'text'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />
                                    <CustomFormInput
                                        name="ADR_DOMCL_LIGN2_ADR"
                                        placeholder={
                                            RepertoirePromptsTranslations.ADR2[
                                                lang
                                            ]
                                        }
                                        type={'text'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />
                                    <CustomFormInput
                                        name="ADR_DOMCL_LIGN4_ADR"
                                        placeholder={
                                            RepertoirePromptsTranslations.ADR4[
                                                lang
                                            ]
                                        }
                                        type={'text'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />

                                    <h2 className="font-bold">
                                        {
                                            RepertoirePromptsTranslations
                                                .coordonnesGeographiques[lang]
                                        }
                                    </h2>
                                    <CustomFormInput
                                        name="LONG"
                                        placeholder={
                                            RepertoirePromptsTranslations.LONG[
                                                lang
                                            ]
                                        }
                                        type={'text'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />
                                    <CustomFormInput
                                        name="LAT"
                                        placeholder={
                                            RepertoirePromptsTranslations.LAT[
                                                lang
                                            ]
                                        }
                                        type={'text'}
                                        disabled={isSubmitting}
                                        className="pl-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-evenly mt-4 absolute bottom-4 w-full">
                                <Button
                                    type="submit"
                                    buttonType={ButtonType.LAMBDA}
                                >
                                    {
                                        RepertoirePromptsTranslations
                                            .addCompany[lang]
                                    }
                                </Button>
                            </div>
                            {status && (
                                <div className="text-red-600 mt-2 text-sm">
                                    {status}
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>{' '}
                <Button
                    onClick={closeDialog}
                    buttonType={ButtonType.CANCEL}
                    className="absolute -top-4 right-4"
                >
                    ✕
                </Button>
            </div>
        </div>
    );
}

interface DropDownSelectorProps {
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

interface CustomFormInput {
    name: string;
    placeholder?: string;
    type: string;
    className?: string;
    disabled: boolean;
}

function CustomFormInput({
    name,
    placeholder = '',
    type,
    className = '',
    disabled,
}: CustomFormInput) {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex flex-row gap-2 items-start justify-start">
                <label className="pl-2">{placeholder}</label>{' '}
                <ErrorMessage
                    name={name}
                    component="label"
                    className="text-red-500 text-[8px] font-medium pl-2"
                />
            </div>

            <Field
                name={name}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                className={`input-field w-full ${type === 'date' ? 'p-[7px]' : 'p-2'} border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none`}
            />
        </div>
    );
}
