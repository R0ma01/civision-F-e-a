const niveauEtudeConverter = (repondant: any) => {
    switch (repondant.niveau_etude) {
        case '0':
            repondant.niveau_etude = 'Secondaire';
            break;
        case '1':
            repondant.niveau_etude = "Certificat d'apprenti";
            break;
        case '2':
            repondant.niveau_etude = "Certificat d'un collège";
            break;
        case '3':
            repondant.niveau_etude = 'Certificat universitaire inférieur';
            break;
        case '4':
            repondant.niveau_etude = 'Baccalauréat';
            break;
        case '5':
            repondant.niveau_etude = 'Études supérieures';
            break;
        case '6':
            repondant.niveau_etude = 'Autre';
            break;
        case 'Secondaire':
            repondant.niveau_etude = 'Secondaire';
            break;
        case "Certificat d'apprenti":
            repondant.niveau_etude = "Certificat d'apprenti";
            break;
        case "Certificat d'un collège":
            repondant.niveau_etude = "Certificat d'un collège";
            break;
        case 'Certificat universitaire inférieur':
            repondant.niveau_etude = 'Certificat universitaire inférieur';
            break;
        case 'Baccalauréat':
            repondant.niveau_etude = 'Baccalauréat';
            break;
        case 'Études supérieures':
            repondant.niveau_etude = 'Études supérieures';
            break;
        case 'Autre':
            repondant.niveau_etude = 'Autre';
            break;
        case 0:
            repondant.niveau_etude = 'Secondaire';
            break;
        case 1:
            repondant.niveau_etude = "Certificat d'apprenti";
            break;
        case 2:
            repondant.niveau_etude = "Certificat d'un collège";
            break;
        case 3:
            repondant.niveau_etude = 'Certificat universitaire inférieur';
            break;
        case 4:
            repondant.niveau_etude = 'Baccalauréat';
            break;
        case 5:
            repondant.niveau_etude = 'Études supérieures';
            break;
        case 6:
            repondant.niveau_etude = 'Autre';
            break;
        default:
            repondant.niveau_etude = 'Autre';
            break;
    }

    return repondant;
};

const planConverter = (succession: any) => {
    switch (succession.plan.toString()) {
        case '1':
            succession.plan = 'Plan informel';
            break;
        case '2':
            succession.plan = 'Plan formel';
            break;
        case '3':
            succession.plan = 'Plan inexistant';
            break;
        case 'Plan informel':
            succession.plan = 'Plan informel';
            break;
        case 'Plan formel':
            succession.plan = 'Plan formel';
            break;
        case 'Plan inexistant':
            succession.plan = 'Plan inexistant';
            break;
        default:
            succession.plan = 'N/A';
    }

    return succession;
};


const repondantAgeConverter = (repondant: any) => {
    switch (repondant.age) {
        case '24 et -':
            repondant.age = 'Secondaire';
            break;
        case '25 à 34 ans':
            repondant.age = "Certificat d'apprenti";
            break;
        case '35 à 44 ans':
            repondant.age = "Certificat d'un collège";
            break;
        case '45 à 54 ans':
            repondant.age = 'Certificat universitaire inférieur';
            break;
        case '55 à 64 ans':
            repondant.age = 'Baccalauréat';
            break;
        case '65ans et +':
            repondant.age = 'Études supérieures';
            break;
        default:
            repondant.age = 'Pas de réponse';
    }
    return repondant;
};
