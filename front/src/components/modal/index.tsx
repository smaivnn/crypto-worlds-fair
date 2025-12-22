import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/store/modalStore';

/**
 * 사용방법
 * const { openModal } = useModalStore();
 * const handleClick = () => {
 *     openModal({ title: '모달 제목', content: <div>모달 내용</div> });
 * };
 */
export const GlobalModal = () => {
    const { isModalOpen, title, content, closeModal } = useModalStore();

    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent className="max-w-2xl">
                <DialogTitle>{title}</DialogTitle>
                {content}
            </DialogContent>
        </Dialog>
    );
};
