import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateTags, updateTime } from '@/store/publicSearchParamsSlice';
import { useTranslation } from 'react-i18next';
import getPublicRecipeFilter from '@/pages/recipe/api/filters/getPublicRecipeFilter';
import { FaSliders, FaX } from 'react-icons/fa6';
import Button from '@/components/ui/Button';
import styles from './filters.module.scss';
import Checkbox from '@/components/ui/Checkbox';
import Radio, { RadioGroup } from '@/components/ui/Radio';

const Filters = () => {
  const searchParams = useSelector((state) => state.publicSearchParams.value);
  // const searchParams = useSelector((state) => state.publicSearchParams.value);
  const selectedTags = useSelector(
    (state) => state.publicSearchParams.value.tags
  );
  const selecedTime = useSelector(
    (state) => state.publicSearchParams.value.time
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const results = useQuery({
    queryKey: ['publicTags', 'tags', searchParams.type],
    queryFn: getPublicRecipeFilter,
    ...{ enabled: !!searchParams.type },
  });

  const filterOptions = results?.data?.data ?? [];

  // @TODO: Add this to the utilities.
  const timeOptions = [
    {
      label: `${t('All')}`,
      value: '',
    },
    {
      label: '< 60',
      value: 60,
    },
    {
      label: '< 45',
      value: 45,
    },
    {
      label: '< 30',
      value: 30,
    },
    {
      label: '< 15',
      value: 15,
    },
  ];

  return (
    <aside>
      <button
        onClick={() => setOpen(!open)}
        className={`p-3 mt-2 text-main text-14 font-medium rounded-10 flex items-center justify-center ${styles.filterToggle} ${styles.publicFilter}`}
      >
        <FaSliders className="mr-3" /> {t('Filter')}
      </button>
      <div
        className={`
          bg-white rounded-20 mr-6 s:pb-3 
          ${styles.content} 
          ${open ? styles.open : null}
        `}
      >
        <div className="px-6 py-4 bg-main-bg rounded-t-20 flex justify-between">
          <h2 className="font-bold text-20">{t('Filter')}</h2>
          <button onClick={() => setOpen(!open)}>
            <FaX />
          </button>
        </div>
        {filterOptions.length ? (
          <>
            <ul className="p-6 flex flex-col gap-3 my-3">
              <h3 className="font-semibold mb-2">{t('Labels')}</h3>
              {filterOptions.map((tag) =>
                tag === '' ? null : (
                  <li key={tag} className="font-light text-14 text-dark-grey">
                    <label className="mr-2 flex gap-3 label">
                      <Checkbox
                        name={tag}
                        id={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => {
                          dispatch(updateTags(tag));
                        }}
                        variant="filled"
                      />
                      {tag}
                    </label>
                  </li>
                )
              )}
            </ul>
            <hr className="mx-3" />
          </>
        ) : null}

        <RadioGroup
          render={<ul className="p-6 flex flex-col gap-3 my-3" />}
          name="cooking-time"
          value={selecedTime}
          onValueChange={(value) => dispatch(updateTime(value))}
        >
          <h3 className="font-semibold mb-2">{t('Cooking time')}</h3>
          {timeOptions.map((time, index) => {
            return (
              <li
                key={time.label}
                className="font-light text-14 text-dark-grey"
              >
                <label className="mr-2 flex gap-3 label">
                  <Radio id={time.label} value={time.value} />
                  {time.label} {index > 0 ? t('min') : null}
                </label>
              </li>
            );
          })}
        </RadioGroup>

        <div className="m-4 mt-6 m:hidden!">
          <Button text={t('View recipes')} onClick={() => setOpen(!open)} />
        </div>
      </div>
    </aside>
  );
};

export default Filters;
