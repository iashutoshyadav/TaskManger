import Login from "@/pages/Login";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking the backdrop itself, not the modal content
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
                <Login />
            </div>
        </div>
    );
};

export default LoginModal;
