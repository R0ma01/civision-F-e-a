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
                        <h1 className="text-xl font-bold">PANORAMA</h1>
                        <p className="font-thin">
                            Bienvenue sur la nouvelle cartographie des
                            entreprises familiales du Québec créée par Familles
                            en affaires HEC Montréal et La sphère HEC Montréal.
                            Vous y retrouverez une adaptation numérique et
                            interactive de plusieurs études réalisées sur les
                            entreprises familiales québécoises, dont L'album de
                            familles (2020). Vous trouverez aussi des cartes
                            interactives permettant l'identification des
                            entreprises familiales à travers le Québec et
                            l'identification de professionnels d'accompagnement
                            spécialisé dans l'accompagnement des familles en
                            affaires.
                        </p>
                        <p className="font-thin">
                            Cette cartographie représente un hommage vibrant au
                            patrimoine québécois, une véritable source de
                            fierté, mettant en lumière les entreprises
                            familiales qui façonnent l’histoire et la culture de
                            notre province. Grâce à son interface conviviale et
                            ses fonctionnalités avancées, notre application
                            permet aux utilisateur(trice)s de découvrir ces
                            entreprises remarquables, d'explorer leur histoire
                            unique et de mener leurs propres investigations.
                            Rejoignez-nous dans cette aventure captivante pois
                            célébrer et soutenir l'esprit d'entreprise familiale
                            qui anime le Québec ! Pour nous contacter ou en
                            connaître davantage sur nos organisations:
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
                                <button
                                    className="bg-[#9BD5D6] text-white p-2 rounded-md w-fit"
                                    onClick={() =>
                                        window.open(
                                            'https://famillesenaffaires.hec.ca/',
                                            '_blank',
                                        )
                                    }
                                    title="redirect:https://famillesenaffaires.hec.ca/"
                                >
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
                                <button
                                    className="bg-[#00AEC7] text-white p-2 rounded-md"
                                    onClick={() =>
                                        window.open(
                                            'https://lasphere.hec.ca/',
                                            '_blank',
                                        )
                                    }
                                    title="redirect:https://lasphere.hec.ca/"
                                >
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
                        Qu'est-ce qu'un petit commerce ayant pignon sur rue à
                        Saint-Félicien, une PME touristique à Québec et une
                        grande entreprise multinationale en Beauce ont en
                        commun?
                    </p>
                    <p>
                        Dirigées par les fondateur(trice)s ou les générations
                        suivantes, ce sont des entreprises familiales !
                        Celles-ci sont présentes dans tous les secteurs et dans
                        toutes les régions, et sont de toutes les tailles.
                    </p>
                    <p>
                        Partout dans le monde, les entreprises familiales
                        constituent des éléments essentiels de l'économie. Au
                        Canada, selon l'enquête du Conference Board of Canada,
                        63,1 % des entreprises privées sont des entreprises
                        familiales. Cette étude estime que ces entreprises
                        représentent deux tiers de toutes les firmes du secteur
                        privé au Canada et la moitié du produit intérieur brut
                        du secteur privé. Elle démontre aussi qu'en 2017, les
                        entreprises familiales employaient 6,9 millions de
                        personnes.
                    </p>
                    <p>
                        Les entreprises familiales sont indispensables à notre
                        économie et, bien qu'en 1871 Frédéric Le Play les
                        étudiait déjà dans son ouvrage L'organisation de la
                        famille, elles sont encore mal connues. Les études que
                        l'on peut trouver se focalisent surtout sur les aspects
                        liés à la succession ou sur d'autres thématiques très
                        spécialisées. Dans d'autres recherches, les échantillons
                        sont très petits ou ciblent seulement les entreprises
                        cotées en bourse. Elles sont donc peu représentatives de
                        la diversité des entreprises familiales. Voici où
                        l'aventure commence.
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
            {/* <footer>
                <p>&copy; 2024 Familles en affaires. Tous droits réservés.</p>
            </footer> */}
        </PageContentContainer>
    );
}
