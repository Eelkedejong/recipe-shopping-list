import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../ui/Input';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

const ShoppingListItems = ({ items }) => {
  const { t } = useTranslation();
  const [ingredients, setIngredients] = useState(
    items && items.length > 0 ? items : ['']
  );

  return (
    <>
      <div className="bg-white p-5 rounded-m mb-5">
        <h3 className="fs-20 fw-bold mb-5">
          {t('Add items to shopping list')}
        </h3>

        <div className="df fdc gap-3 fs-14">
          {ingredients
            ? ingredients.map((ingredient, index) => {
                return (
                  <div className="df gap-3 aic mb-1" key={index}>
                    <Input
                      id={`extra_${index}`}
                      value={ingredient}
                      key={`extra_${ingredient}`}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const newRows = ingredients.filter(
                          (_, i) => i !== index
                        );
                        setIngredients(newRows);
                      }}
                    >
                      <FaXmark className="fs-18" />
                    </button>
                  </div>
                );
              })
            : null}
        </div>
        <button
          type="button"
          className="df aic jcfe gap-3 py-2 fs-16 mt-2"
          onClick={(e) => {
            e.preventDefault;
            setIngredients([...ingredients, ['']]);
          }}
        >
          <span>{t('Add ingredient')}</span>
          <FaPlusCircle />
        </button>
      </div>
    </>
  );
};

export default ShoppingListItems;
