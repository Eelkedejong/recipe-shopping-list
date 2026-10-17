import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../ui/Fields';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import styles from '../recipe.module.scss';

const StepsList = ({ tags, placeholder, prefix }) => {
  const { t } = useTranslation();
  const [labels, setLabels] = useState(tags ? tags : ['']);

  return (
    <>
      <div className="flex items-center flex-wrap gap-3">
        {labels.map((label, index) => {
          return (
            <div
              className={`flex items-center relative w-full ${styles.labelWrapper}`}
              key={`${index} + ${label}`} // @TODO: Change this to a unique key.
            >
              <Input
                id={`${prefix}-${index + 1}`}
                name={`${prefix}-${index + 1}`}
                label={t(placeholder)}
                value={label ? label : null}
                classes={`${styles.ingreidentInput} pr-4`}
                labelClasses={`w-full ${styles.label}`}
                key={`${index} + ${label}`} // @TODO: Change this to a unique key.
              />
              <button
                type="button"
                className={`p-2 ${styles.labelRemove}`}
                onClick={(e) => {
                  e.preventDefault();
                  const newRows = labels.filter((_, i) => i !== index);
                  setLabels(newRows);
                }}
              >
                <FaMinusCircle />
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex w-full">
        <button
          type="button"
          className="flex items-center justify-end gap-3 py-2 text-16"
          onClick={(e) => {
            e.preventDefault;
            setLabels([...labels, '']);
          }}
        >
          <span>{t(`Add ${placeholder}`)}</span>
          <FaPlusCircle />
        </button>
      </div>
    </>
  );
};

export default StepsList;
