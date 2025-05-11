import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { updateTypeOfMeal } from '../../store/searchParamsSlice';
import { useTranslation } from 'react-i18next';
import getRecipeFilter from '../../pages/recipe/api/filters/getRecipeFilter';
import styles from './recipe.module.scss';

const TypesList = () => {
  const user = useSelector((state) => state.user.value);
  const SelectedType = useSelector(
    (state) => state.searchParams.value.typeOfMeal
  );
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

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <>
      {filterOptions.length ? (
        <div className="df gap-3 fww">
          {filterOptions.map((type) =>
            type !== '' ? (
              <button
                onClick={() => {
                  if (type === `${t('All')}`) {
                    dispatch(updateTypeOfMeal([]));
                  } else {
                    // Toggle the type in the SelectedType array
                    const updatedTypes = SelectedType.includes(type)
                      ? SelectedType.filter((t) => t !== type) // Remove type if already selected
                      : [...SelectedType, type]; // Add type if not selected
                    dispatch(updateTypeOfMeal(updatedTypes));
                  }
                }}
                className={`
                  py-2 px-4 text-main bg-main-light rounded-s fs-13 fw-semibold 
                  ${
                    (SelectedType.length === 0 && type === `${t('All')}`) ||
                    SelectedType.includes(type)
                      ? styles.activeType
                      : ''
                  }
                `}
                key={type}
              >
                {capitalizeFirstLetter(t(`${type}`))}
              </button>
            ) : null
          )}
        </div>
      ) : null}
    </>
  );
};

export default TypesList;
