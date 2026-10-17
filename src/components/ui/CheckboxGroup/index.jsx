export const CheckboxGroup = ({ name, options, selected = [] }) => {
  return (
    <div className="checkbox-group">
      <div className="grid grid-cols-[repeat(2,1fr)] gap-2">
        {options.map((option) => (
          <label key={option.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${name}-${option.id}`}
              name={`${name}-${option.id}`}
              defaultChecked={selected.includes(option.id)}
              className="checkbox filled"
            />
            <span className="checkbox-label">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
