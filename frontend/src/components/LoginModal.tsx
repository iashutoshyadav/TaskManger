import Login from "@/pages/Login";

const LoginModal = ({ onClose, onSwitchToRegister }: { onClose: () => void; onSwitchToRegister?: () => void }) => {
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
                <Login onSwitchToRegister={onSwitchToRegister} />
            </div>
        </div>
    );
};

export default LoginModal;
