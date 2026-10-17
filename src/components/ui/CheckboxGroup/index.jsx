import Checkbox from '../Checkbox';

/**
 * CheckboxGroup
 *
 * Each box keeps its own `name` and submits the native 'on', so the FormData
 * parsing in RecipeForm keeps working unchanged.
 */
export const CheckboxGroup = ({ name, options, selected = [] }) => {
  return (
    <div className="checkbox-group">
      <div className="grid grid-cols-[repeat(2,1fr)] gap-2">
        {options.map((option) => (
          <Checkbox
            key={option.id}
            id={`${name}-${option.id}`}
            name={`${name}-${option.id}`}
            defaultChecked={selected.includes(option.id)}
            variant="filled"
            label={option.label}
          />
        ))}
      </div>
    </div>
  );
};
