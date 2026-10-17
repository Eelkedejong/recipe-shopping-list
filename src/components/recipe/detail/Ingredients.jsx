import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PersonSelector from '../../elements/PersonSelector';
import styles from '../recipe.module.scss';
import Checkbox from '@/components/ui/Checkbox';

const Ingredients = ({ ingredients, persons }) => {
  const [personsState, setPersonsState] = useState(persons);
  const { t } = useTranslation();

  return (
    <>
      <h3 className="text-20 font-semibold pb-4 mb-2">{t('Ingredients')}</h3>
      <div
        className={`w-full flex justify-center py-2 mb-6 ${styles.persons} `}
      >
        <PersonSelector
          personsState={personsState}
          setPersonsState={setPersonsState}
        />
      </div>

      <div className="flex pt-3">
        <div
          className={`bg-main-bg-light rounded-20 p-6 flex flex-col ${styles.ingredientsBlock}`}
        >
          {ingredients
            ? ingredients.map((ingredient, index) => {
                const amount = ingredient.amount * (personsState / persons);

                return (
                  <div
                    className={`flex gap-4 mb-4 pb-3 ${styles.ingredient}`}
                    key={ingredient.ingredient}
                  >
                    <label className="mr-3 flex gap-4 label">
                      <Checkbox defaultChecked={true} />
                      <span>
                        {/* Show max 2 decimals */}
                        {amount > 0 && parseFloat(amount.toFixed(2))}{' '}
                        {ingredient.unit} {ingredient.ingredient}
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
