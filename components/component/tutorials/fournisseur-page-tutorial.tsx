import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const FournisseurPageTutorial = (onComplete: any) => {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shepeard-modal',
            scrollTo: true,
        },
        steps: [
            {
                id: 'prompt-6',
                text: "Sur cette page vous pourez trouver une liste ainsi que les coordonnées d'une sélection de fournissurs de services utiles pour les entreprises familiales du Québec. Si vous avez des services à offrir, vous pourrez vous inscrire suir la liste via le formulaire sur la page.",

                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Termimer',
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

export default FournisseurPageTutorial;
