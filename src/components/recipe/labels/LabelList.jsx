import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../ui/Fields';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import styles from '../recipe.module.scss';

const StepsList = ({ tags }) => {
  console.log('tags', tags);
  const { t } = useTranslation();
  const [labels, setLabels] = useState(tags ? tags : ['']);

  return (
    <>
      <div className="df aic fww gap-3">
        {labels.map((label, index) => {
          return (
            <div
              className={`df aic pos-relative w-100 ${styles.labelWrapper}`}
              key={`${index} + ${label}`} // @TODO: Change this to a unique key.
            >
              <Input
                id={`label-${index + 1}`}
                label={t('Label')}
                value={label ? label : null}
                classes={`${styles.ingreidentInput} pr-4`}
                labelClasses={`w-100 ${styles.label}`}
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
      <div className="df w-100">
        <button
          type="button"
          className="df aic jcfe gap-3 py-2 fs-16"
          onClick={(e) => {
            e.preventDefault;
            setLabels([...labels, '']);
          }}
        >
          <span>{t('Add Label')}</span>
          <FaPlusCircle />
        </button>
      </div>
    </>
  );
};

export default StepsList;
