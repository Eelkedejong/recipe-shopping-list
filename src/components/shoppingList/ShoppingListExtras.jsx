import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaXmark } from 'react-icons/fa6';
import { FaPlusCircle } from 'react-icons/fa';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useIngredientCatalog } from '@/hooks/useIngredientCatalog';

/**
 * Things no recipe covers: toilet paper, bread, milk.
 *
 * The aisle is chosen here so an extra sits with the rest of its kind on the
 * grocery list, rather than in a bucket of its own at the end.
 */
const ShoppingListExtras = ({ extras, onAdd, onRemove }) => {
  const { t } = useTranslation();
  const { categories } = useIngredientCatalog();
  const [name, setName] = useState('');
  const [categorySlug, setCategorySlug] = useState(null);

  const add = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, categorySlug);
    setName('');
  };

  const categoryName = (slug) =>
    categories.find((category) => category.slug === slug)?.nameNl ?? t('Other');

  return (
    <div className="bg-white p-6 rounded-md mb-6">
      <h3 className="text-xl font-bold mb-6">
        {t('Add items to shopping list')}
      </h3>

      {extras.length ? (
        <ul className="text-sm mb-4 flex flex-col">
          {extras.map((extra, index) => (
            <li
              key={extra.id ?? `${extra.name}-${index}`}
              className="border-line-subtle flex items-center justify-between gap-3 border-b py-2 last:border-b-0"
            >
              <span>
                {extra.name}
                <span className="text-dark-grey ml-2">
                  {categoryName(extra.categorySlug)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={t('Remove')}
                className="text-dark-grey hover:text-black"
              >
                <FaXmark />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-36 flex-1">
          <Input
            id="extra_item_name"
            label={t('Add extra item')}
            value={name}
            onChange={(event) => setName(event.target.value)}
            // Enter adds the item instead of submitting the surrounding form,
            // which would save the whole list.
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return;
              event.preventDefault();
              add();
            }}
          />
        </div>

        <div className="min-w-40 flex-1">
          <Select
            id="extra_item_category"
            label={t('Category')}
            value={categorySlug}
            onValueChange={setCategorySlug}
            placeholder={t('Choose a category')}
            options={categories.map((category) => ({
              value: category.slug,
              label: category.nameNl,
            }))}
          />
        </div>

        <Button type="button" compact onClick={add} disabled={!name.trim()}>
          <span className="flex items-center gap-2">
            {t('Add')} <FaPlusCircle />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ShoppingListExtras;
