import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { html_object_constants } from '@/constants/constants';

const InformationPageTutorial = (onComplete: any) => {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shepeard-modal',
            scrollTo: true,
        },
        steps: [
            {
                id: 'prompt-1',
                text: 'Sur les pages thématiques, vous pourez trouver des informations et des graphques de données',
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Passer le Tutoriel',
                        action: () => {
                            onComplete();
                            tour.complete();
                        },
                    },
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                ],
            },
            {
                id: 'prompt-2',
                text: 'Chaque onglet représente une étude différente contenant des graphiques et informations reliées à la thématique principale',
                attachTo: {
                    element: '#' + html_object_constants.tab_notch_id + '-0',
                    on: 'right',
                },
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Retour',
                        action: () => {
                            tour.back();
                        },
                    },
                    {
                        text: 'Arrêter',
                        action: () => {
                            onComplete();
                            tour.complete();
                        },
                    },
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                ],
            },
            {
                id: 'prompt-3',
                text: 'Voici le menu des filtres, il vous permettra de filtrer les données des graphiques en fonction des paramètres qui vous intéressent',
                attachTo: {
                    element: '#' + html_object_constants.toggle_filter_tab_id,
                    on: 'left',
                },
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Retour',
                        action: () => {
                            tour.back();
                        },
                    },
                    {
                        text: 'Arrêter',
                        action: () => {
                            onComplete();
                            tour.complete();
                        },
                    },
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                ],
            },
            {
                id: 'prompt-4',
                text: "Les boutons de zoom et dézoom vous permettrons de changer l'échelle de la carte",
                attachTo: {
                    element: '#' + html_object_constants.zoom_in_tab_id,
                    on: 'left',
                },
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Retour',
                        action: () => {
                            tour.back();
                        },
                    },
                    {
                        text: 'Arrêter',
                        action: () => {
                            onComplete();
                            tour.complete();
                        },
                    },
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                ],
            },
            {
                id: 'prompt-5',
                text: "Ce boutton vous permettra de cacher le contenu d'une page pour ne visualiser que la carte",
                attachTo: {
                    element: '#' + html_object_constants.hide_content_tab_id,
                    on: 'left',
                },
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Retour',
                        action: () => {
                            tour.back();
                        },
                    },
                    {
                        text: 'Terminer',
                        action: () => {
                            onComplete();
                            tour.complete();
                        },
                    },
                ],
            },
        ],
    });

    return tour;
};

export default InformationPageTutorial;
