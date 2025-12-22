import { useLoadingStore } from '@/store/loadingStore';

/**
 * Global loading component that displays a spinner when isLoading is true.
 * 사용법:
 * const { show, hide } = useLoadingStore();
 * show()를 호출하면 로딩 스피너가 나타나고, hide()를 호출하면 사라짐
 */
export const GlobalLoading = () => {
    const { isLoading } = useLoadingStore();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
        </div>
    );
};
