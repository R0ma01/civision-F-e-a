import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { html_object_constants } from '@/constants/constants';

const AdminPageTutorial = (onComplete: any) => {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shepeard-modal',
            scrollTo: true,
        },
        steps: [
            {
                id: 'prompt-1',
                text: 'Si vous survolez les cartes, de nouvelles options aparaissent',
                attachTo: {
                    element:
                        '#' + html_object_constants.theme_card_id + '-' + 0,
                    on: 'left',
                },
                classes: 'shepeard-modal',
                buttons: [
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

export default AdminPageTutorial;
