import Register from "@/pages/Register";

const RegisterModal = ({ onClose, onSwitchToLogin }: { onClose: () => void; onSwitchToLogin?: () => void }) => {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={handleBackdropClick}
        >
            {/* MODAL */}
            <div className="relative w-full max-w-md">
                <Register onSwitchToLogin={onSwitchToLogin} />
            </div>
        </div>
    );
};

export default RegisterModal;
