function Button({
  children,

  onClick,

  type = "button",

  variant = "primary",

  disabled = false,

  className = "",
}) {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",

    secondary: "bg-slate-200 hover:bg-slate-300",

    danger: "bg-red-600 hover:bg-red-700 text-white",

    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`

                px-5

                py-2

                rounded-lg

                font-medium

                transition

                disabled:opacity-50

                ${styles[variant]}

                ${className}

            `}
    >
      {children}
    </button>
  );
}

export default Button;
