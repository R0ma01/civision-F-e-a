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
        <>
            <PageContentContainer className="bg-white text-blue-500 overflow-auto z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
                    <div className="space-y-8">
                        <div className="space-y-5">
                            <h1 className="text-[#1c305c] text-4xl md:text-6xl font-semibold leading-tight">
                                La plateforme <i>Familles en affaires</i>
                            </h1>
                            <h2 className="text-2xl text-gray-700">
                                Bienvenue sur la nouvelle plateforme de Familles
                                en affaires, une adaptation numérique et
                                interactive de <i>L&apos;Album de familles</i>.
                            </h2>
                            <p className="text-lg leading-relaxed text-justify text-gray-600">
                                Cette plateforme représente un hommage vibrant
                                au patrimoine québécois, une véritable source de
                                fierté, mettant en lumière les entreprises
                                familiales qui façonnent l&apos;histoire et la
                                culture de notre province. Grâce à son interface
                                conviviale et ses fonctionnalités avancées,
                                notre application permet aux utilisateurs de
                                découvrir ces entreprises remarquables,
                                d&apos;explorer leur histoire unique et de mener
                                leurs propres investigations. Rejoignez-nous
                                dans cette aventure captivante pour célébrer et
                                soutenir l&apos;esprit d&apos;entreprise
                                familial qui anime le Québec !
                            </p>
                        </div>
                        <div className="space-y-5">
                            <h1 className="text-[#1c305c] text-4xl md:text-6xl font-semibold leading-tight mt-16">
                                Introduction
                            </h1>
                            <h2 className="text-2xl text-gray-700 mb-3">
                                Qu’est-ce qu’un petit commerce ayant pignon sur
                                rue à Saint-Félicien, une PME touristique à
                                Québec et une grande entreprise multinationale
                                en Beauce ont en commun?
                            </h2>
                            <p className="mt-5 text-lg leading-relaxed text-justify text-gray-600">
                                Dirigées par les fondateurs ou les générations
                                suivantes, ce sont des entreprises familiales !
                                Celles-ci sont présentes dans tous les secteurs
                                et dans toutes les régions, et sont de toutes
                                les tailles.
                            </p>
                            <p className="mt-5 text-lg leading-relaxed text-justify text-gray-600">
                                Partout dans le monde, les entreprises
                                familiales constituent des éléments essentiels
                                de l’économie. Au Canada, selon l’enquête du
                                Conference Board of Canada, 63,1 % des
                                entreprises privées sont des entreprises
                                familiales. Cette étude estime que ces
                                entreprises représentent deux tiers de toutes
                                les firmes du secteur privé au Canada et la
                                moitié du produit intérieur brut du secteur
                                privé. Elle démontre aussi qu’en 2017, les
                                entreprises familiales employaient 6,9 millions
                                de personnes.
                            </p>
                            <h2 className="text-[#1c305c] text-4xl md:text-6xl font-semibold leading-tight mt-10">
                                Les entreprises familiales sont indispensables à
                                notre économie—
                            </h2>
                            <p className="mt-5 text-lg leading-relaxed text-justify text-gray-600">
                                Les entreprises familiales sont indispensables à
                                notre économie et, bien qu’en 1871 Frédéric Le
                                Play les étudiait déjà dans son ouvrage
                                L’organisation de la famille, elles sont encore
                                mal connues. Les études que l’on peut trouver se
                                focalisent surtout sur les aspects liés à la
                                succession ou sur d’autres thématiques très
                                spécialisées. Dans d’autres recherches, les
                                échantillons sont très petits ou ciblent
                                seulement les entreprises cotées en bourse.
                                Elles sont donc peu représentatives de la
                                diversité des entreprises familiales.
                                <br />
                                <br />
                                Cette étude est l’enquête statistique la plus
                                grande jamais réalisée sur les entreprises
                                familiales québécoises; 513 personnes ont
                                répondu à notre sondage. Parmi les 443
                                entreprises ayant participé, on trouve des
                                compagnies qui exercent des activités dans tous
                                les secteurs, dirigées par la première
                                génération ou les suivantes des familles en
                                affaires. L’équipe derrière la réalisation de
                                l’Album de familles possède une expertise
                                reconnue dans le domaine des familles en
                                affaires, et collabore à la conduite d’enquêtes
                                de large envergure tout comme dans
                                l’interprétation des données recueillies :
                                l’Indice entrepreneurial québécois , le Portrait
                                de l’écosystème startup de Montréal et l’enquête
                                L’entrepreneuriat face à la COVID-19. <br />
                                <br />
                                Cela démontre l’historique de coopération et la
                                synergie avec les joueurs clés de l’écosystème
                                entrepreneurial, de même que l’expérience des
                                membres de l’équipe pour réaliser des sondages
                                pertinents et de grande portée. <br />
                                <br />
                                L’Album de familles porte une attention spéciale
                                aux caractéristiques distinctives des dirigeants
                                et de leur entreprise, ainsi qu’à la structure
                                du capital et à la gouvernance de ces
                                entreprises. il fait également le point sur les
                                aspects liés à la succession. De plus, il
                                consacre un chapitre à la description et à
                                l’analyse de la situation des femmes dans ce
                                type d’organisation. Enfin, il aborde un sujet
                                incontournable dans la situation actuelle : les
                                entreprises familiales face à la COVID-19. En
                                terminant, nous souhaitons signaler que cette
                                enquête sera réalisée de manière bisannuelle. De
                                plus, comme l’ensemble des résultats obtenus
                                sont beaucoup plus nombreux que ceux présentés
                                dans ce rapport, nous sélectionnerons certaines
                                thématiques qui feront l’objet de futures
                                publications spécialisées avant le prochain
                                Album de familles.
                            </p>
                        </div>

                        <div className="mt-16 space-y-10">
                            <h1 className="text-[#1c305c] text-4xl md:text-6xl font-semibold leading-tight">
                                Remerciements
                            </h1>

                            <div className="bg-[#f6f2eef4] p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-medium text-[#1c305c] mb-3">
                                    Équipe de communication et logistique
                                </h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Un grand merci à l&apos;équipe de
                                    communication et logistique qui s&apos;est
                                    chargé du lancement et des médias :
                                </p>
                                <ul className="list-disc list-inside pl-4 text-lg text-gray-700">
                                    <li>
                                        Mélissa Laflamme-Ouellet (chargée de
                                        projets, Familles en affaires HEC
                                        Montréal)
                                    </li>
                                    <li>
                                        Gabrielle Drouin (conseillère en
                                        communication et relations avec la
                                        communauté de la base entrepreneuriale
                                        HEC Montréal)
                                    </li>
                                    <li>
                                        Émilie Novales (conseillère principale
                                        en relation avec les médias, HEC
                                        Montréal)
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#f6f2eef4] p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-medium text-[#1c305c] mb-3">
                                    Équipe de la base entrepreneuriale HEC
                                    Montréal
                                </h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Merci aux membres de l&apos;équipe de la
                                    base entrepreneuriale HEC Montréal pour leur
                                    collaboration et leur soutien :
                                </p>
                                <ul className="list-disc list-inside pl-4 text-lg text-gray-700">
                                    <li>
                                        Manaf Bouchentouf (directeur exécutif de
                                        la base entrepreneuriale HEC Montréal)
                                    </li>
                                    <li>
                                        Guillaume Campeau (coordonnateur
                                        entrePrism - HEC Montréal)
                                    </li>
                                    <li>
                                        Robert Dutton (directeur stratégique de
                                        la base entrepreneuriale HEC Montréal et
                                        professeur associé à HEC Montréal)
                                    </li>
                                    <li>
                                        Audrey Grondin (agente administrative de
                                        la base entrepreneuriale HEC Montréal)
                                    </li>
                                    <li>
                                        Marie-Hélène Perez (agente aux activités
                                        de la base entrepreneuriale HEC
                                        Montréal)
                                    </li>
                                    <li>
                                        François Poirier (coordonnateur,
                                        Parcours entrepreneurial Rémi-Marcoux -
                                        HEC Montréal)
                                    </li>
                                    <li>
                                        Pierre Provost (directeur des
                                        opérations, Accélérateur Banque
                                        Nationale - HEC Montréal)
                                    </li>
                                    <li>
                                        Josée Trudel (agente de projets de la
                                        base entrepreneuriale HEC Montréal)
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#f6f2eef4] p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-medium text-[#1c305c] mb-3">
                                    Remerciements spéciaux
                                </h3>
                                <p className="text-lg text-gray-700">
                                    Et un merci tout spécial à :
                                </p>
                                <div className="flex flex-row justify-evenly">
                                    <ul className="list-disc list-inside pl-4 text-lg text-gray-700 mt-4">
                                        <li>
                                            Rina Marchand, du Réseau Mentorat et
                                            autrice de l&apos;Indice
                                            entrepreneurial québécois, pour ses
                                            conseils
                                        </li>
                                        <li>
                                            Véronique Philibert, de Révision
                                            OEil félin, pour ses yeux de lynx
                                        </li>
                                        <li>
                                            Ghislain Roy, graphiste, pour le
                                            superbe design de notre Album de
                                            familles
                                        </li>
                                        <li>
                                            Tania Saba, de la Chaire BMO en
                                            diversité et gouvernance
                                        </li>
                                        <li>
                                            Serge Beauchemin, d&apos;Alias
                                            entrepreneur-e pour l&apos;accès à
                                            la base de données de la recherche
                                            sur l&apos;entrepreneuriat face à la
                                            COVID-19
                                        </li>
                                    </ul>
                                    <div className="w-[500px] flex flex-col items-center justify-evenly">
                                        <Image
                                            src="/images/partenaires/alias_logo_rouge.png"
                                            alt="logo_Alias"
                                            height={100}
                                            width={350}
                                            className=" object-cover"
                                        />
                                        <Image
                                            src="/images/partenaires/ChaireBMO_colors_FR.png"
                                            alt="logo_BMO"
                                            height={100}
                                            width={350}
                                            className=" object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 space-y-10">
                            <h1 className="text-[#1c305c] text-4xl md:text-6xl font-semibold leading-tight">
                                Nous Contacter
                            </h1>

                            <div className="bg-[#f6f2eef4] rounded-lg shadow-lg space-y-6 flex flex-col justify-center items-center pt-4 pb-4">
                                <p className="text-lg text-gray-700 text-left">
                                    <span className="font-medium text-[#1c305c]">
                                        Appelez-nous:{' '}
                                    </span>
                                    514 340-3825
                                    <br />
                                    <span className="font-medium text-[#1c305c]">
                                        Adressez-nous un courriel:{' '}
                                    </span>
                                    <a
                                        href="mailto:famillesenaffaires@hec.ca"
                                        className="text-blue-500 hover:underline"
                                    >
                                        famillesenaffaires@hec.ca
                                    </a>
                                    <br />
                                    <span className="font-medium text-[#1c305c]">
                                        Ou venez en personne :{' '}
                                    </span>
                                    HEC Montréal – Édifice Decelles
                                    <br />
                                    5255 av. Decelles, 5e étage, espace 5.200
                                    <br />
                                    Montréal, QC H3T 2B1
                                </p>
                                <Button
                                    buttonType={ButtonType.PULSE}
                                    onClick={() =>
                                        window.open(
                                            'https://famillesenaffaires.hec.ca/',
                                            '_blank',
                                        )
                                    }
                                >
                                    Visitez notre site web
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-10">
                        <Image
                            src={cover}
                            alt="Page titre de l'album"
                            className="rounded-lg shadow-md w-full h-auto object-cover"
                        />
                        <div className="space-y-5">
                            <h1 className="text-[#1c305c] text-4xl md:text-6xl font-semibold leading-tight">
                                Avant-propos
                            </h1>
                            <h2 className="text-2xl text-gray-700">
                                Pourquoi faire une enquête comme l&apos;{' '}
                                <i>Album de familles</i>?
                            </h2>
                            <p className="text-lg leading-relaxed text-justify text-gray-600">
                                Depuis plusieurs années – et après maintes
                                discussions avec une multitude de chercheurs, de
                                consultants, de banquiers et, bien sûr, de
                                membres de familles en affaires –, nous
                                constatons que les entreprises familiales au
                                Québec sont encore mal connues. Il est possible
                                de trouver quelques enquêtes sur ce type
                                d’entreprise, mais elles se focalisent
                                généralement sur un sujet précis et, souvent,
                                les échantillons sont très petits ou trop
                                ciblés. Voici où l’aventure commence.
                                <br />
                                <br />
                                Notre premier réflexe a été de visiter le site
                                Web de Statistique Canada. L’information que
                                l’on y a trouvée sur les entreprises québécoises
                                est pertinente et complète, mais celle-ci ne
                                spécifie pas le caractère « familial » des
                                entreprises répertoriées. Notre deuxième réflexe
                                a été de contacter différentes entreprises
                                spécialisées pour réaliser des sondages. La
                                réponse obtenue a été qu’elles détenaient
                                plusieurs bases de données sur les divers types
                                d’entreprises québécoises, mais pas
                                spécifiquement sur les entreprises familiales.
                                Par la suite, nous avons communiqué avec la
                                Fondation des familles en affaires. En suivant
                                sa mission de soutenir les entreprises
                                familiales, cette fondation nous a généreusement
                                permis l’accès aux données des entreprises
                                familiales québécoises de sa base mondiale pour
                                compléter la nôtre. Ensuite, nous avons regardé
                                les sites Web des différentes associations
                                d’entreprises et ajouté les entreprises qui nous
                                apparaissaient comme étant « familiales » et que
                                nous n’avions pas dans nos données. Enfin, nous
                                avons réalisé une vérification pour confirmer
                                qu’elles sont toujours en activité et qu’elles
                                demeurent des entreprises familiales.
                                <br />
                                <br />
                                Ainsi, l’équipe de Familles en affaires HEC
                                Montréal s’est lancé le défi de mener une
                                enquête statistique sur les entreprises
                                familiales québécoises, en partenariat avec
                                l’Institut d’entrepreneuriat Banque Nationale –
                                HEC Montréal. Des chercheurs affiliés aux deux
                                organismes mentionnés nous ont soutenus pour
                                choisir les thématiques pertinentes et élaborer
                                le questionnaire. Nous nous sommes fixé comme
                                objectif d’obtenir au moins 400 questionnaires
                                complets et exploitables.
                                <br />
                                <br /> Le principal obstacle était l’accès à une
                                base de données d’entreprises familiales
                                québécoises suffisantes pour atteindre notre
                                objectif. Nous possédions une base de données ne
                                comptant pas suffisamment de noms d’entreprises
                                familiales pour avoir le taux de réponse
                                souhaité. Nos recherches antérieures et la
                                consultation de plusieurs collègues – ici et à
                                l’international – nous apprenaient que la
                                majorité des familles en affaires aiment rester
                                discrètes et répondent peu aux enquêtes sur la
                                condition « familiale » de leur entreprise.
                            </p>
                        </div>
                        <div className="flex-1 space-y-5">
                            <h1 className="title text-6xl font-medium mb-8 text-[#1c305c]">
                                Auteurs
                            </h1>
                            {auteurs.map((author, index) => (
                                <div
                                    className="relative flex flex-col w-full bg-white shadow-md p-4 rounded-lg transition-all duration-300"
                                    key={author.name}
                                >
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => toggleExpand(index)}
                                    >
                                        <p className="content text-2xl font-semibold text-justify flex-1">
                                            {author.name}
                                        </p>
                                        <div className="relative flex items-center justify-top">
                                            <Image
                                                src={author.backgroundImage}
                                                alt={author.name}
                                                height={80}
                                                width={80}
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                        <span className="ml-4 text-gray-500">
                                            {expandedIndex === index
                                                ? '▼'
                                                : '▲'}
                                        </span>
                                    </div>
                                    <div
                                        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${expandedIndex === index ? 'max-h-screen' : 'max-h-0'}`}
                                    >
                                        <p className="content text-base leading-relaxed text-justify mt-4">
                                            {author.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-16 space-y-10">
                            <h1 className="text-[#1c305c] text-4xl md:text-6xl font-semibold leading-tight">
                                Partenaires
                            </h1>

                            <p className="text-lg leading-relaxed text-justify text-gray-600">
                                L’équipe de l’Album de familles a pu compter sur
                                la participation de plusieurs collaborateurs –
                                parmi les plus grands experts du Québec dans le
                                domaine des entreprises familiales.
                            </p>

                            <p className="text-lg leading-relaxed text-justify text-gray-600">
                                Les auteurs souhaitent remercier chaleurusement
                                et sincèrement les personnes suivantes :
                            </p>

                            <div className="bg-[#f6f2eef4] p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-medium text-[#1c305c] mb-3">
                                    Les propulseurs de Familles en affaires HEC
                                    Montréal
                                </h3>
                                <div className="flex flex-row justify-evenly">
                                    <ul className="list-disc list-inside pl-4 text-lg text-gray-700">
                                        <li>
                                            La famille Deschênes, Groupe
                                            Deschênes
                                        </li>
                                        <li>
                                            La famille Molson, Molson Coors, le
                                            Groupe CH et Avenir Global
                                        </li>
                                        <li>La famille Lesage, Usines Giant</li>
                                    </ul>
                                    <div className="w-[300px] flex items-center">
                                        <Image
                                            src="/images/fea-full-logo.png"
                                            alt="logo_CROP"
                                            height={100}
                                            width={350}
                                            className=" object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#f6f2eef4] p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-medium text-[#1c305c] mb-3">
                                    Membres du comité consultatif de Familles en
                                    affaires HEC Montréal
                                </h3>
                                <div className="flex flex-row justify-evenly">
                                    <ul className="list-disc list-inside pl-4 text-lg text-gray-700">
                                        <li>Helen Antonio</li>
                                        <li>Pascale Cheaib</li>
                                        <li>Luis Cisneros</li>
                                        <li>Éric Deschênes</li>
                                        <li>Jacques Deschênes</li>
                                        <li>Diane Grenier</li>
                                        <li>Jean-Claude Lesage</li>
                                        <li>Jacques Robert</li>
                                        <li>Jean-Marie Toulouse</li>
                                    </ul>
                                    <div className="w-[300px] flex items-center">
                                        <Image
                                            src="/images/fea-full-logo.png"
                                            alt="logo_CROP"
                                            height={100}
                                            width={350}
                                            className=" object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#f6f2eef4] p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-medium text-[#1c305c] mb-3">
                                    Remerciements spéciaux
                                </h3>
                                <div className="text-lg text-gray-700 flex flex-row justify-evenly">
                                    <p>
                                        Un merci spécial à Olivier de Richoufftz
                                        pour l&apos;accès à la base de données
                                        de la Fondation des familles
                                        entrepreneuriales (BFF).{' '}
                                    </p>
                                    <span className="text-[#1c305c] font-semibold flex justify-center items-center p-4">
                                        <Image
                                            src="/images/partenaires/FEFFR.png"
                                            alt="logo_BFF"
                                            height={300}
                                            width={500}
                                            className="object-cover"
                                        />
                                    </span>
                                </div>
                                <div className="text-lg text-gray-700 mt-4 flex flex-row justify-evenly">
                                    <span className="text-[#1c305c] font-semibold flex justify-center items-center">
                                        <Image
                                            src="/images/partenaires/Crop_logo_GRIS.svg"
                                            alt="logo_CROP"
                                            height={350}
                                            width={500}
                                            className="object-cover"
                                        />
                                    </span>
                                    <p>
                                        Merci à l&apos;équipe de la firme de
                                        recherche CROP pour la collecte des
                                        données et la réalisation de
                                        l&apos;étude sommaire des résultats.{' '}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-[#f6f2eef4] p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-medium text-[#1c305c] mb-3">
                                    L&apos;Application
                                </h3>
                                <div className="text-lg text-gray-700 flex flex-col justify-evenly">
                                    <p>
                                        Cette application à été développée par
                                        l&apos;équipe de Civision.{' '}
                                    </p>
                                    <span className="text-[#1c305c] font-semibold flex justify-center items-center p-4">
                                        <Image
                                            src="/images/Logos-civision.png"
                                            alt="logo_BFF"
                                            height={300}
                                            width={500}
                                            className="object-cover"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageContentContainer>
        </>
    );
}
