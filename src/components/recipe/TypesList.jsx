import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { updateTypeOfMeal } from '../../store/searchParamsSlice';
import { useTranslation } from 'react-i18next';
import getRecipeFilter from '../../pages/recipe/api/filters/getRecipeFilter';
import styles from './recipe.module.scss';

const TypesList = () => {
  const user = useSelector((state) => state.user.value);
  const SelectedType = useSelector((state) => state.searchParams.value.type);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const results = useQuery({
    queryKey: ['types', user.token, 'types'],
    queryFn: getRecipeFilter,
    ...{
      // The query will not execute until the userToken exists.
      enabled: !!user.token,
    },
  });

  const filterOptions = results?.data?.data ?? [];

  // Add an extra "All" type to the filter options.
  if (results.isSuccess) {
    if (!filterOptions.includes(t('All'))) {
      filterOptions.unshift(t('All'));
    }
  }

  return (
    <>
      {filterOptions.length ? (
        <div className="df gap-3 fww">
          {filterOptions.map((type) =>
            type !== '' ? (
              <button
                onClick={() => {
                  if (type === `${t('All')}`) {
                    dispatch(updateTypeOfMeal(''));
                  } else {
                    dispatch(updateTypeOfMeal(`${t(type)}`));
                  }
                }}
                className={`
                  py-2 px-4 text-main bg-main-light rounded-s fs-12 fw-semibold 
                  ${
                    (SelectedType === '' && type === `${t('All')}`) ||
                    SelectedType === type
                      ? styles.activeType
                      : ''
                  }
                `}
                key={type}
              >
                {t(`${type}`)}
              </button>
            ) : null
          )}
        </div>
      ) : null}
    </>
  );
};

export default TypesList;
