import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Dialog from '@/components/ui/Dialog';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Collapsible from '@/components/ui/Collapsible';
import Radio, { RadioGroup } from '@/components/ui/Radio';
import createIngredient from '@/pages/recipe/api/createIngredient';
import { useIngredientCatalog } from '@/hooks/useIngredientCatalog';

/** "Rode ui" -> "rode-ui". The admin never has to think about slugs. */
const toSlug = (name) =>
  (name ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** The catalog stores canonical codes; these are the labels an admin reads. */
const UNIT_CODES = ['g', 'ml', 'piece'];

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const TRISTATE = [
  { value: 'yes', key: 'Yes' },
  { value: 'no', key: 'No' },
  { value: 'unknown', key: 'Unknown' },
];

const toBool = (value) => (value === 'yes' ? true : value === 'no' ? false : null);

/**
 * Adds an ingredient to the global catalog without leaving the recipe form.
 *
 * The four fields that do something today are shown up front: plural drives
 * recipe display, category drives shopping-list grouping, baseUnit drives the
 * unit prefill. Everything else sits behind "more options" so it can be filled
 * in now or left for later.
 */
const AddIngredientDialog = ({ open, onOpenChange, initialName, onCreated }) => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.user.value?.token);
  const queryClient = useQueryClient();
  const { categories } = useIngredientCatalog();

  const [nameNl, setNameNl] = useState(initialName ?? '');
  const [nameNlPlural, setNameNlPlural] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [baseUnit, setBaseUnit] = useState(null);
  const [isVegetarian, setIsVegetarian] = useState('unknown');
  const [isVegan, setIsVegan] = useState('unknown');
  const [seasonMonths, setSeasonMonths] = useState([]);
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: createIngredient,
    onSuccess: (body) => {
      // The catalog is cached for an hour, so it has to be told the set
      // changed, otherwise the new entry would not be searchable until the
      // next reload.
      queryClient.invalidateQueries({ queryKey: ['ingredient-catalog'] });
      onCreated?.(body.data);
      onOpenChange(false);
    },
    onError: (e) => setError(e.message),
  });

  const handleSave = () => {
    setError('');
    const trimmed = nameNl.trim();
    if (!trimmed) {
      setError(t('Please fill in a name'));
      return;
    }

    mutation.mutate({
      token,
      ingredient: {
        slug: toSlug(trimmed),
        nameNl: trimmed,
        nameNlPlural: nameNlPlural.trim() || null,
        categoryId,
        baseUnit,
        isVegetarian: toBool(isVegetarian),
        isVegan: toBool(isVegan),
        seasonMonths,
      },
    });
  };

  const toggleMonth = (month) =>
    setSeasonMonths((current) =>
      current.includes(month)
        ? current.filter((m) => m !== month)
        : [...current, month].sort((a, b) => a - b)
    );

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('New ingredient')}
      description={t('This is added to the shared ingredient list.')}
      closeLabel={t('Close')}
      footer={
        <>
          <Button variant="ghost" compact onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button compact onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? t('Saving') : t('Save')}
          </Button>
        </>
      }
    >
      <Input
        id="new_ingredient_name"
        label={t('Ingredient name')}
        value={nameNl}
        onChange={(e) => setNameNl(e.target.value)}
        required
      />

      <Input
        id="new_ingredient_plural"
        label={t('Plural (optional)')}
        value={nameNlPlural}
        onChange={(e) => setNameNlPlural(e.target.value)}
      />

      <Select
        id="new_ingredient_category"
        label={t('Category')}
        value={categoryId}
        onValueChange={setCategoryId}
        placeholder={t('Choose a category')}
        options={categories.map((category) => ({
          value: category.id,
          label: category.nameNl,
        }))}
      />

      <Select
        id="new_ingredient_unit"
        label={t('Unit')}
        value={baseUnit}
        onValueChange={setBaseUnit}
        placeholder={t('Choose a unit')}
        options={UNIT_CODES.map((code) => ({
          value: code,
          label: t(`unit_${code}`),
        }))}
      />

      <Collapsible title={t('More options')} className="px-0">
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-sm text-dark-grey mb-2 block">
              {t('Vegetarian')}
            </span>
            <RadioGroup
              value={isVegetarian}
              onValueChange={setIsVegetarian}
              className="flex gap-4"
            >
              {TRISTATE.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  label={t(option.key)}
                  className="flex items-center gap-2"
                />
              ))}
            </RadioGroup>
          </div>

          <div>
            <span className="text-sm text-dark-grey mb-2 block">
              {t('Vegan')}
            </span>
            <RadioGroup
              value={isVegan}
              onValueChange={setIsVegan}
              className="flex gap-4"
            >
              {TRISTATE.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  label={t(option.key)}
                  className="flex items-center gap-2"
                />
              ))}
            </RadioGroup>
          </div>

          <div>
            <span className="text-sm text-dark-grey mb-2 block">
              {t('In season')}
            </span>
            <div className="flex flex-wrap gap-2">
              {MONTHS.map((month) => {
                const active = seasonMonths.includes(month);
                return (
                  <button
                    key={month}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleMonth(month)}
                    className={[
                      'rounded-sm text-sm border px-2 py-1',
                      active
                        ? 'border-secondary bg-secondary text-white'
                        : 'border-line-subtle text-dark-grey',
                    ].join(' ')}
                  >
                    {t(`month_short_${month}`)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Collapsible>

      {error ? <p className="text-sm text-red">{error}</p> : null}
    </Dialog>
  );
};

export default AddIngredientDialog;
