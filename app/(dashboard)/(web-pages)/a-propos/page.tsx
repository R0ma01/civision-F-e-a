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
        <PageContentContainer className="bg-white text-black overflow-auto z-20 p-3">
            <section className="section">
                <div className="flex flex-row gap-2">
                    <div className="text-justify">
                        <h2 className="font-bold">
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

                    <div className="flex flex-col justify-evenly">
                        <div>
                            <Image
                                src={cover}
                                alt="Page titre de l'album"
                                className="rounded-lg shadow-md w-full h-auto object-cover"
                            />{' '}
                            <a href="/login" className="text-[10px] underline">
                                Pour en savoir plus sur l’album de familles,
                                cliquez ici!
                            </a>
                        </div>
                        <div>
                            <Image
                                src={cover}
                                alt="Page titre de l'album"
                                className="rounded-lg shadow-md w-full h-auto object-cover"
                            />
                            <a href="/login" className="text-[10px] underline">
                                Pour en savoir plus sur l’indice entrepreneurial
                                cliquez ici!
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <h2 className="font-bold">
                    Pour nous contacter ou en connaître davantage sur nos
                    organisations :
                </h2>
                <div className="flex flex-row">
                    <div className="flex flex-row">
                        <img
                            src="/images/simple-logo-fae.png"
                            alt="logo_CROP"
                            className=" object-cover h-12 w-auto"
                        />
                        <div className="flex flex-col">
                            <p>
                                <strong>
                                    Familles en affaires - HEC Montréal
                                </strong>
                            </p>
                            <p>
                                3000, chemin de la Côte-Sainte-Catherine,
                                Montréal, QC, H3T 2A7 <br />
                                Adresse courriel :{' '}
                                <a href="mailto:info@famillesaffaires.ca">
                                    info@famillesaffaires.ca
                                </a>
                            </p>

                            <Button buttonType={ButtonType.PULSE}>
                                Visitez notre site web
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src="/images/simple-logo-fae.png"
                            alt="logo_CROP"
                            width={50}
                            className=" object-cover h-12 w-auto"
                        />
                        <div className="flex flex-col">
                            <p>
                                <strong>Laboratoire</strong>
                            </p>
                            <p>
                                3000, chemin de la Côte-Sainte-Catherine,
                                Montréal, QC, H3T 2A7 <br />
                                Adresse courriel :{' '}
                                <a href="mailto:info@famillesaffaires.ca">
                                    info@famillesaffaires.ca
                                </a>
                                <Button buttonType={ButtonType.PULSE}>
                                    Visitez notre site web
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-justify">
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

            <section className="section">
                <h2 className="font-bold">Merci à nos partenaires</h2>
                <p>En collaboration avec :</p>
                <ul>
                    <li>Réseau Mentorat</li>
                    <li>ORIA</li>
                    <li>Québec</li>
                    <li>Application développée par l’équipe de CIVISION</li>
                </ul>
            </section>
            <footer>
                <p>&copy; 2024 Familles en affaires. Tous droits réservés.</p>
            </footer>
        </PageContentContainer>
    );
}
