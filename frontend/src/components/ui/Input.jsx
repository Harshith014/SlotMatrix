function Input({
  label,

  error,

  ...props
}) {
  return (
    <div className="space-y-1">
      {label && <label className="font-medium">{label}</label>}

      <input
        {...props}
        className="

                w-full

                border

                rounded-lg

                px-4

                py-3

                focus:ring-2

                focus:ring-blue-500

                outline-none

                "
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default Input;
