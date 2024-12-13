'use client';

import Link from 'next/link';
import { PagePaths } from '@/components/enums/page-paths-enum';
import Sun from '@/app/images/sun.png';
import Underline from '@/app/images/underline.png';
import Image from 'next/image';
import Sidebar from '@/components/component/sidebar/sidebar';
import RotatingLogo from '@/components/component/rotating-logo/rotating-logo';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';

const LandingPage = () => {
    return (
        <div className="h-screen overflow-x-hidden overflow-y-auto md:overflow-hidden lg:overflow-hidden bg-white dark:bg-[#363636] dark:text-white">
            <div className="flex h-full">
                {/* Sidebar */}
                <Sidebar />

                <div className="relative h-screen w-screen">
                    {/* Logo Component */}
                    <div
                        className="absolute inset-0 w-full top-36 hidden md:block"
                        style={{
                            transform:
                                'scale(1.2) translateX(160px) translateY(25px)',
                        }}
                    >
                        <RotatingLogo></RotatingLogo>
                    </div>
                    {/* Content Overlay */}
                    <div className="absolute top-8 left-10 z-10 p-4 h-[80%]">
                        <div className="flex flex-row">
                            <div className="flex flex-col items-center">
                                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-3 pl-3 text-[#262626] dark:text-white">
                                    PANORAMA
                                    <Image
                                        src={Sun}
                                        alt="Soleil"
                                        className="w-4 h-auto inline-block -mt-8"
                                    />
                                </h1>
                                <p className="text-xl font-semibold pl-6">
                                    Découvres les entreprises familiales
                                </p>
                            </div>
                        </div>

                        <div className="text-xs md:text-sm lg:text-sm mt-3 mb-2 ml-4 flex-col h-[80%] flex justify-center">
                            <div className="w-[400px] md:w-[520px] lg:w-[670px] mb-2 text-justify">
                                <h4>
                                    <strong>Bienvenue</strong> sur la nouvelle
                                    cartographie des entreprises familiales du
                                    Québec créée par Familles en affaires HEC
                                    Montréal et La sphère HEC Montréal. Vous y
                                    retrouverez une adaptation numérique et
                                    interactive de plusieurs études réalisées
                                    sur les entreprises familiales québécoises,
                                    dont L&apos;album de familles (2020).
                                </h4>
                            </div>

                            <div className="flex flex-col justify-normal text-xs md:text-sm lg:text-sm">
                                <div className="pr-2 flex flex-col items-start w-[400px] md:w-[520px] lg:w-[670px] justify-start gap-2">
                                    <p>
                                        Créez-vous un compte pour accéder à
                                        toute la plateforme ou explorez
                                        gratuitement :
                                    </p>
                                    <div className="flex flex-row w-full justify-evenly mt-2">
                                        <Link href={PagePaths.SIGNUP}>
                                            <Button
                                                buttonType={ButtonType.LAMBDA}
                                            >
                                                <span className="text-xs md:text-md lg:text-lg text-[#000000] transition-duration-300">
                                                    <span className="text-center text-white">
                                                        S&apos;INSCRIRE
                                                        GRATUITEMENT
                                                    </span>
                                                </span>
                                            </Button>
                                        </Link>
                                        <Link href={PagePaths.THEMATIQUES}>
                                            <Button
                                                buttonType={ButtonType.LAMBDA}
                                            >
                                                <span className="text-xs md:text-md lg:text-lg text-[#000000] transition-duration-300">
                                                    <span className="text-center text-white">
                                                        EXPLORER
                                                    </span>
                                                </span>
                                            </Button>
                                        </Link>{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute w-screen flex-row justify-evenly bottom-4 lg:flex md:flex hidden items-center">
                        <img
                            src="/images/fea-full-logo.png"
                            alt="logo-FEA"
                            className="w-auto h-12"
                        />
                        <img
                            src="/images/la_sphere_large.png"
                            className="w-auto h-12"
                            alt="logo-laSphere"
                        />{' '}
                        <img
                            src="/images/logo_quebec.png"
                            className="w-auto h-10"
                            alt="logo-MEIE"
                        />
                        <img
                            src="/images/ORIA_NV.png"
                            className="w-auto h-12 mb-3"
                            alt="logo-ORIA"
                        />{' '}
                        <div className="flex flex-col">
                            <p className="h-fit w-32 p-0 text-[8px]">
                                Propulsé par :{' '}
                            </p>
                            <img
                                src="/images/Logos-civision.png"
                                alt="logo-Civision"
                                className="w-auto h-10 "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
