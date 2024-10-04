import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { html_object_constants } from '@/constants/constants';

const RepertoirePageTutorial = (onComplete: any) => {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shepeard-modal',
            scrollTo: true,
        },
        steps: [
            {
                id: 'prompt-6',
                text: 'Cette boite de recherche vous permettra de visualiser toutes les informations concernant les entreprises familiales au Québec. Le bouton a droite de chaque entreprise vous permettra de la visualiser sur la carte.',
                attachTo: {
                    element: '#' + html_object_constants.search_box_id,
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
                        text: 'Finir',
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

export default RepertoirePageTutorial;
