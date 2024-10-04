import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { html_object_constants } from '@/constants/constants';

const ThematiquePageTutorial = (onComplete: any) => {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shepeard-modal',
            scrollTo: true,
        },
        steps: [
            {
                id: 'prompt-0',
                text: 'Bienvenue sur <i>Familles en Affaires</i>, une platerforme propulsée par Civision.',

                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                    {
                        text: 'Passer le Tutoriel',
                        action: () => {
                            onComplete();
                            tour.complete();
                        },
                    },
                ],
            },
            {
                id: 'prompt-1',
                text: 'Voici la barre de navigation, elle vous permettra de naviguer au travers des outils disponibles sur la plateforme',
                attachTo: {
                    element: '#' + html_object_constants.side_bar_id,
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
                id: 'prompt-2',
                text: "Voici les cartes thématiques, en cliquant dessus, vous pourrez naviguer vers les pages thématiques qui rassemblent de l'informations sur le sujet qui leur est assigné. Les encarts sur les cartes représentes les études représentées sur chaque page.",
                attachTo: {
                    element:
                        '#' + html_object_constants.theme_card_id + '-' + 0,
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

export default ThematiquePageTutorial;
