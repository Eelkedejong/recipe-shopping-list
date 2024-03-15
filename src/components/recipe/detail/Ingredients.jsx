import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PersonSelector from '../../elements/PersonSelector';
import styles from '../recipe.module.scss';

const Ingredients = ({ ingredients, persons }) => {
  const [personsState, setPersonsState] = useState(persons);
  const { t } = useTranslation();

  return (
    <>
      <div className={`w-100 df jcc py-2 my-5 ${styles.persons} `}>
        <PersonSelector
          personsState={personsState}
          setPersonsState={setPersonsState}
        />
      </div>

      <div className="df pt-3">
        <div
          className={`bg-main-lighter rounded-m p-5 df fdc ${styles.ingredientsBlock}`}
        >
          <h3 className="fs-18 fw-semibold pb-4 mb-2">{t('Ingredients')}</h3>
          {ingredients
            ? ingredients.map((ingredient, index) => {
                const amount = ingredient.amount * (personsState / persons);

                return (
                  <div
                    className="df gap-4 mb-4 pb-1"
                    key={ingredient.ingredient}
                  >
                    <label className="mr-3 df gap-4 label">
                      <input
                        type="checkbox"
                        className="checkbox"
                        defaultChecked={true}
                      />
                      <span>
                        {/* Show max 2 decimals */}
                        {parseFloat(amount.toFixed(2))} {ingredient.unit}{' '}
                        {ingredient.ingredient}
                      </span>
                    </label>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Ingredients;
