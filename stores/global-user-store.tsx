import { UserType } from '@/components/enums/user-type-enum';
import { UserHttpRequestService } from '@/services/user-http-request-service';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface GlobalState {
    user: UserType;
    setUser: (user: UserType) => void;
    tutorials: boolean[];
    setLoginTutorials: (tutorials: boolean[]) => void;
    updateCompletedTutorials: (tutorials: boolean[]) => void;
}

const useGlobalUserStore = create(
    devtools(
        persist(
            (set) => ({
                tutorials: [],
                setLoginTutorials: async (tutorials: boolean[]) => {
                    set({ tutorials });
                },
                updateCompletedTutorials: async (tutorials: boolean[]) => {
                    set({ tutorials });
                    await UserHttpRequestService.updateTutorials(tutorials);
                },
            }),
            {
                name: 'global-user-store', // unique name for local storage
            },
        ),
    ),
);

export default useGlobalUserStore;
