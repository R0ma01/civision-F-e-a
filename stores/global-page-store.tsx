import { create } from 'zustand';
import { PageHttpRequestService } from '@/services/page-http-request-service';
import PageTabContent from '@/components/interface/page-content';
import { devtools, persist } from 'zustand/middleware';

interface GlobalState {
    pagesData: PageTabContent[] | null;
    pageLoading: boolean;
    pageError: string | null;
    pageDataFetched: boolean;
    fetchPageData: () => Promise<void>;
    refreshPageData: () => Promise<void>;
}

const useGlobalPageStore = create(
    devtools(
        (set, get) => ({
            pagesData: null,
            pageLoading: false,
            pageError: null,
            pageDataFetched: false,
            fetchPageData: async () => {
                if ((get() as GlobalState).pageDataFetched) return; // Prevent redundant fetches

                set({ pageLoading: true, pageError: null });
                try {
                    const response = await PageHttpRequestService.getAll();
                    set({
                        pagesData: response,
                        pageLoading: false,
                        pageDataFetched: true,
                    });
                } catch (err: any) {
                    set({ pageError: err.message, pageLoading: false });
                }
            },
            refreshPageData: (pages: PageTabContent[]) => {
                set({ pagesData: pages });
            },
        }),
        {
            name: 'global-page-store', // unique name for local storage
        },
    ),
);

export default useGlobalPageStore;
