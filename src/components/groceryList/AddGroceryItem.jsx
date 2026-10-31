import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlusCircle } from 'react-icons/fa';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useIngredientCatalog } from '@/hooks/useIngredientCatalog';

/**
 * Adds something no recipe covers.
 *
 * The aisle is chosen here rather than defaulting to a catch-all, so extra
 * fruit ends up with the fruit. Dragging a line between aisles is a separate
 * job; this covers the same need without it.
 */
const AddGroceryItem = ({ onAdd, disabled }) => {
  const { t } = useTranslation();
  const { categories } = useIngredientCatalog();
  const [name, setName] = useState('');
  const [categorySlug, setCategorySlug] = useState(null);

  const submit = (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    onAdd(trimmed, categorySlug);
    setName('');
    // The aisle is kept: adding several things from one part of the shop is
    // the common case.
  };

  return (
    <form
      onSubmit={submit}
      className="border-line-subtle flex flex-wrap items-end gap-3 border-t pt-4"
    >
      <div className="min-w-40 flex-1">
        <Input
          id="extra_item_name"
          label={t('Add extra item')}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="min-w-44 flex-1">
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

      <Button type="submit" compact disabled={disabled || !name.trim()}>
        <span className="flex items-center gap-2">
          {t('Add')} <FaPlusCircle />
        </span>
      </Button>
    </form>
  );
};

export default AddGroceryItem;
