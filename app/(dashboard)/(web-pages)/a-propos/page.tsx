'use client';
import React, { useState } from 'react';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import cover from '@/app/images/cover.png';
import Image from 'next/image';
import { auteurs } from '@/components/component/a-propos-content/authors';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';

export default function APropos() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <PageContentContainer className="bg-white text-black overflow-auto z-20 px-20 pt-6">
            <section className="section w-full">
                <div className="flex flex-row space-x-10 justify-between w-full">
                    <div className="text-justify w-full">
                        <h2 className="font-bold mb-12">
                            La Plateforme Familles en Affaires
                        </h2>
                        <p className="font-bold">
                            Bienvenue sur la nouvelle plateforme de Familles en
                            affaires, créée en collaboration avec la sphère.
                            Vous y retrouverez une adaptation numérique et
                            interactive de plusieurs études réalisées sur les
                            entreprises familiales québécoises, dont l’Album de
                            familles et l’indice entrepreneurial québécois. Vous
                            trouverez aussi des cartes interactives permettant
                            l’identification des entreprises familiales à
                            travers le Québec et l’identification de
                            professionnels d’accompagnement spécialisés dans
                            l’accompagnement des familles en affaires.
                        </p>
                        <p className="font-thin">
                            Cette plateforme vise à promouvoir un patrimoine
                            québécois unique, véritable source de fierté,
                            mettant en lumière les entreprises familiales qui
                            façonnent l’histoire et la culture de notre
                            province. Rejoignez-nous dans cette aventure pour en
                            apprendre davantage sur l’esprit d’entreprise
                            familial qui anime le Québec !
                        </p>
                    </div>

                    <div className="flex flex-col justify-evenly w-[20%] items-center">
                        <div>
                            <Image
                                src={cover}
                                alt="Page titre de l'album"
                                className="rounded-lg shadow-md w-[150px] h-fit object-cover"
                            />{' '}
                            <a href="/login" className="text-[10px] underline">
                                Pour en savoir plus sur l’album de familles,
                                cliquez ici!
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section mt-8">
                <h2 className="font-bold mb-3">
                    Pour nous contacter ou en connaître davantage sur nos
                    organisations :
                </h2>
                <div className="flex flex-row justify-evenly">
                    <div className="flex flex-row justify-evenly w-[50%]">
                        <img
                            src="/images/simple-logo-fae.png"
                            alt="simple_logo_fae"
                            className=" object-cover h-32 w-20"
                        />
                        <div className="flex flex-col">
                            <p>
                                <strong>
                                    Familles en affaires - HEC Montréal
                                </strong>
                            </p>
                            <p className="font-thin">
                                HEC Montréal - Édifice Decelles
                                <br /> 5255, av. Decelles, 5e étage espace 5.200
                                <br /> Montréal, QC, H3T 2B1
                                <br />
                                Adresse courriel :{' '}
                                <a href="mailto:lasphere@hec.ca">
                                    famillesenaffaires@hec.ca
                                </a>
                            </p>
                            <div className="w-full flex items-center justify-center mt-2">
                                <button className="bg-[#9BD5D6] text-white p-2 rounded-md w-fit">
                                    Visitez notre site web
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-evenly w-[50%]">
                        <img
                            src="/images/la_sphere_simple.png"
                            alt="logo_sphere"
                            className=" object-cover h-32 w-20"
                        />
                        <div className="flex flex-col">
                            <p>
                                <strong>La sphère - HEC Montréal</strong>
                            </p>
                            <p className="font-thin">
                                HEC Montréal - Édifice Decelles
                                <br /> 5255, av. Decelles, 5e étage espace 5.200
                                <br /> Montréal, QC, H3T 2A7
                                <br /> Adresse courriel :{' '}
                                <a href="mailto:lasphere@hec.ca">
                                    lasphere@hec.ca
                                </a>
                            </p>

                            <div className="w-full flex items-center justify-center mt-2">
                                <button className="bg-[#00AEC7] text-white p-2 rounded-md">
                                    Visitez notre site web
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-justify mt-8">
                <h2 className="font-bold">
                    Pourquoi étudier les entreprises familiales ?
                </h2>
                <div className="font-thin">
                    <p>
                        Qu’est-ce qu’un petit commerce ayant pignon sur rue à
                        Saint-Félicien, une PME touristique à Québec et une
                        grande entreprise multinationale en Beauce ont en
                        commun ?
                    </p>
                    <p>
                        Dirigées par les fondateurs, descendants ou membres de
                        ces derniers, ces entreprises familiales ! Celles-ci
                        sont présentes dans tous les secteurs, toutes les
                        régions, et sont de toutes tailles.
                    </p>
                    <p>
                        Partout dans le monde, les entreprises familiales sont
                        des éléments essentiels de l’économie. Au Canada, selon
                        l’enquête du Business Board of Canada, 63,1 % des
                        entreprises privées sont des entreprises familiales.
                        Cette étude estime que près de la moitié du produit
                        intérieur brut canadien est généré par les firmes de ce
                        type, qui emploient 6,9 millions de personnes.
                    </p>
                    <p>
                        Les entreprises familiales sont des institutions de
                        confiance qui donnent du sens et du bien-être.
                        Cependant, 187 entreprises Fide Play nécessitent une
                        exploration des autres raisons.
                    </p>
                </div>
            </section>

            <section className="section mt-8">
                <h2 className="font-bold">Merci à nos partenaires</h2>

                <div className="flex flex-row w-fit gap-6">
                    <img
                        src="/images/RESEAU_MENTORAT_Logo.png"
                        alt={'hello'}
                        className="h-20"
                    ></img>
                    <img
                        src="/images/ORIA_NV.png"
                        alt={'logo-ORIA'}
                        className="h-16"
                    ></img>{' '}
                    <div>
                        <p>En collaboration avec</p>
                        <img
                            src="/images/logo_quebec.png"
                            className="w-auto h-12"
                            alt="logo-MEIE"
                        />
                    </div>
                </div>
            </section>
            <section className="section mt-8">
                <h2 className="font-bold">Propulsé par : </h2>

                <div className="flex flex-row w-fit">
                    <Image
                        src="/images/Logos-civision.png"
                        width={200}
                        height={100}
                        alt={'hello'}
                    ></Image>
                </div>
            </section>
            <footer>
                <p>&copy; 2024 Familles en affaires. Tous droits réservés.</p>
            </footer>
        </PageContentContainer>
    );
}
