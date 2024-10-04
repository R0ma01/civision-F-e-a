import axios from 'axios';
import { APIPaths } from '@/components/enums/page-api-paths-enum';

export const UserHttpRequestService = {
    updateTutorials,
};

async function updateTutorials(tutorials: boolean[]): Promise<void> {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(APIPaths.USER_UPDATE_TUTORIALS, {
            token,
            tutorials,
        });
    } catch (error: any) {
        console.error(
            'Error updating user tutorials:',
            error.response?.error || error.message,
        );
    }
}
