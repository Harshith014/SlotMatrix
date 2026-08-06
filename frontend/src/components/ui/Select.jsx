function Select({
  label,

  options,

  ...props
}) {
  return (
    <div className="space-y-1">
      {label && <label>{label}</label>}

      <select
        {...props}
        className="

                w-full

                border

                rounded-lg

                px-4

                py-3

                "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
