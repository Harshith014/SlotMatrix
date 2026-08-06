function Card({
  children,

  className = "",
}) {
  return (
    <div
      className={`

            bg-white

            rounded-xl

            shadow

            border

            p-6

            ${className}

            `}
    >
      {children}
    </div>
  );
}

export default Card;
