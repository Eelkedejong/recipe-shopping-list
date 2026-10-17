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
      <div className="bg-white p-6 rounded-20 mb-6">
        <h3 className="text-20 font-bold mb-6">
          {t('Add items to shopping list')}
        </h3>

        <div className="flex flex-col gap-3 text-14">
          {ingredients
            ? ingredients.map((ingredient, index) => {
                return (
                  <div className="flex gap-3 items-center mb-1" key={index}>
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
                      <FaXmark className="text-18" />
                    </button>
                  </div>
                );
              })
            : null}
        </div>
        <button
          type="button"
          className="flex items-center justify-end gap-3 py-2 text-16 mt-2"
          onClick={(e) => {
            e.preventDefault;
            setIngredients([...ingredients, ['']]);
          }}
        >
          <span>{t('Add extra item')}</span>
          <FaPlusCircle />
        </button>
      </div>
    </>
  );
};

export default ShoppingListItems;
