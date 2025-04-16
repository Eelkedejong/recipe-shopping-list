export const CheckboxGroup = ({ name, options, selected = [] }) => {
  return (
    <div className="checkbox-group">
      <div className="dg gtc-2 gap-2">
        {options.map((option) => (
          <label key={option.id} className="df aic gap-2">
            <input
              type="checkbox"
              id={`${name}-${option.id}`}
              name={`${name}-${option.id}`}
              defaultChecked={selected.includes(option.id)}
              className="checkbox filled"
            />
            <span className="text-sm checkbox-label">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
