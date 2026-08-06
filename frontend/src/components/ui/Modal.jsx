function Modal({
  open,

  onClose,

  children,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white
rounded-xl
p-4
sm:p-6
w-full
max-w-lg
mx-4
max-h-[90vh]
overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
