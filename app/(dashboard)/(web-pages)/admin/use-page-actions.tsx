import { useState } from 'react';
import { PageHttpRequestService } from '@/services/page-http-request-service';
import useGlobalPageStore from '@/stores/global-page-store';
import PageTabContent from '@/components/interface/page-tabs-content';

export function usePageActions() {
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<PageTabContent | null>(null);

    const { refreshPageData } = useGlobalPageStore((state: any) => {
        return {
            refreshPageData: state.refreshPageData,
        };
    });

    const openEditDialog = (page: PageTabContent) => {
        setCurrentPage(page);
        setEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditDialogOpen(false);
        setCurrentPage(null);
    };

    const submitEditDialog = async (page: PageTabContent): Promise<boolean> => {
        if (page._id) {
            const response = await PageHttpRequestService.update(page);

            return response;
        } else {
            const response = await PageHttpRequestService.insert(page);

            return response;
        }
        await refreshPageData();
        closeEditDialog();
    };

    const openDeleteDialog = (page: PageTabContent) => {
        setCurrentPage(page);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setCurrentPage(null);
    };

    const submitDeleteDialog = async (id?: string) => {
        if (id) {
            await PageHttpRequestService.delete(id);
            await refreshPageData();
        }
        closeDeleteDialog();
    };

    const togglePageVisibility = async (page: PageTabContent) => {
        if (page) {
            const newPage = { ...page, visible: !page.visible };
            await PageHttpRequestService.update(newPage);
            await refreshPageData();
        }
    };

    return {
        isEditDialogOpen,
        isDeleteDialogOpen,
        currentPage,
        openEditDialog,
        closeEditDialog,
        submitEditDialog,
        openDeleteDialog,
        closeDeleteDialog,
        submitDeleteDialog,
        togglePageVisibility,
    };
}
