import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTypeOfDish,
  updateCuisine,
  updateTags,
  updateTime,
  updateIsVegetarian,
  updateIsChildFriendly,
} from '@/store/searchParamsSlice';
import { useTranslation } from 'react-i18next';
import {
  FaSliders,
  FaX,
  FaChevronDown,
  FaChevronUp,
  FaMagnifyingGlass,
} from 'react-icons/fa6';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './filters.module.scss';

// Import filter API function
import getRecipeFilter from '@/pages/recipe/api/filters/getRecipeFilter';

const Filters = () => {
  const user = useSelector((state) => state.user.value);
  const searchParams = useSelector((state) => state.searchParams.value);
  const { tags, time, typeOfDish, cuisine, isVegetarian, isChildFriendly } =
    searchParams;

  const [open, setOpen] = useState(false);

  // State for expanded filter sections
  const [expandedSections, setExpandedSections] = useState({
    typeOfDish: false,
    cuisine: false,
    tags: false,
  });

  // State for collapsed filter sections (time and tags are collapsed by default)
  const [collapsedSections, setCollapsedSections] = useState({
    typeOfDish: false,
    cuisine: false,
    vegetarian: false,
    childFriendly: false,
    time: true,
    tags: true,
  });

  // State for filter search inputs
  const [searchInputs, setSearchInputs] = useState({
    typeOfDish: '',
    cuisine: '',
    tags: '',
  });

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Fetch tags
  const tagsQuery = useQuery({
    queryKey: ['tags', user.token, 'tags'],
    queryFn: getRecipeFilter,
    enabled: !!user.token,
  });

  // Fetch dish types
  const dishTypesQuery = useQuery({
    queryKey: ['dish-types', user.token, 'dish-types'],
    queryFn: getRecipeFilter,
    enabled: !!user.token,
  });

  // Fetch cuisines
  const cuisinesQuery = useQuery({
    queryKey: ['cuisines', user.token, 'cuisines'],
    queryFn: getRecipeFilter,
    enabled: !!user.token,
  });

  // Extract data from queries
  const tagOptions = tagsQuery?.data?.data ?? [];
  const dishTypeOptions = dishTypesQuery?.data?.data ?? [];
  const cuisineOptions = cuisinesQuery?.data?.data ?? [];

  // Time options
  const timeOptions = [
    {
      label: `${t('All')}`,
      value: null,
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

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Toggle section collapse
  const toggleCollapse = (section) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section],
    });
  };

  // Handle search input change
  const handleSearchInputChange = (section, value) => {
    setSearchInputs({
      ...searchInputs,
      [section]: value,
    });
  };

  // Function to render filter options with "Show more"/"Show less" buttons and search
  const renderFilterOptions = (
    options,
    selectedOptions,
    updateAction,
    sectionKey,
    title
  ) => {
    if (!options.length) return null;

    // Filter out empty strings
    const filteredOptions = options.filter((option) => option !== '');

    // Sort options alphabetically
    const sortedOptions = [...filteredOptions].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' })
    );

    // Filter options based on search input
    const searchTerm = searchInputs[sectionKey]?.toLowerCase() || '';
    const searchFilteredOptions = sortedOptions.filter((option) =>
      option.toLowerCase().includes(searchTerm)
    );

    // Determine how many options to display
    const displayAll = expandedSections[sectionKey];
    const displayCount = displayAll ? searchFilteredOptions.length : 6; // Show only 6 options before "Show more"
    const displayOptions = searchFilteredOptions.slice(0, displayCount);
    const hasMore = searchFilteredOptions.length > 6;

    const isCollapsed = collapsedSections[sectionKey];

    return (
      <>
        <div className="py-4 px-5 df fdc gap-2">
          <div className="df jcsb aic mb-2">
            <h3 className="fw-semibold fs-26">{t(title)}</h3>
            <button
              onClick={() => toggleCollapse(sectionKey)}
              className="bg-transparent border-0"
            >
              {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
            </button>
          </div>

          {!isCollapsed && (
            <>
              {/* Search input field */}
              <div className="mb-3 pos-relative">
                <Input
                  type="text"
                  placeholder={`${t('Search')} ${t(title).toLowerCase()}`}
                  value={searchInputs[sectionKey]}
                  onChange={(e) =>
                    handleSearchInputChange(sectionKey, e.target.value)
                  }
                  classes={`${styles.filterInput} ${styles.search}`}
                />
                <FaMagnifyingGlass
                  className="pos-absolute"
                  style={{
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              </div>

              <ul className="df fdc gap-3">
                {displayOptions.map((option) => (
                  <li key={option} className="fw-light fs-14 text-dark-grey">
                    <label
                      className={`mr-2 df gap-3 label ${styles.filterLabel}`}
                    >
                      <input
                        type="checkbox"
                        name={option}
                        id={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => {
                          dispatch(updateAction(option));
                        }}
                        className="checkbox filled"
                      />
                      {option}
                    </label>
                  </li>
                ))}

                {hasMore && (
                  <li className="mt-2">
                    <button
                      onClick={() => toggleSection(sectionKey)}
                      className="text-main fs-14 fw-medium df aic"
                    >
                      {displayAll ? (
                        <>
                          {t('Show less')} <FaChevronUp className="ml-2" />
                        </>
                      ) : (
                        <>
                          {t('Show more')} <FaChevronDown className="ml-2" />
                        </>
                      )}
                    </button>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
        <hr className="mx-3" />
      </>
    );
  };

  // Function to render boolean filter option (vegetarian, child-friendly)
  const renderBooleanFilter = (title, isSelected, updateAction, sectionKey) => {
    const isCollapsed = collapsedSections[sectionKey];

    return (
      <>
        <div className="py-4 px-5 df fdc gap-2">
          <div className="df jcsb aic mb-2">
            <h3 className="fw-semibold fs-26">{t(title)}</h3>
            <button
              onClick={() => toggleCollapse(sectionKey)}
              className="bg-transparent border-0"
            >
              {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
            </button>
          </div>

          {!isCollapsed && (
            <ul className="df fdc gap-3">
              <li className="fw-light fs-14 text-dark-grey">
                <label className="mr-2 df gap-3 label">
                  <input
                    type="checkbox"
                    name={title.toLowerCase().replace(/\s+/g, '-')}
                    id={title.toLowerCase().replace(/\s+/g, '-')}
                    checked={isSelected === true}
                    onChange={() =>
                      dispatch(updateAction(isSelected === true ? false : true))
                    }
                    className="checkbox filled"
                  />
                  {t(`${title}`)}
                </label>
              </li>
            </ul>
          )}
        </div>
        <hr className="mx-3" />
      </>
    );
  };

  // Function to render time filter
  const renderTimeFilter = () => {
    const isCollapsed = collapsedSections.time;

    return (
      <>
        <div className="py-4 px-5 df fdc gap-2">
          <div className="df jcsb aic mb-2">
            <h3 className="fw-semibold fs-26">{t('Cooking time')}</h3>
            <button
              onClick={() => toggleCollapse('time')}
              className="bg-transparent border-0"
            >
              {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
            </button>
          </div>

          {!isCollapsed && (
            <ul className="df fdc gap-3">
              {timeOptions.map((timeOption, index) => (
                <li
                  key={timeOption.label}
                  className="fw-light fs-14 text-dark-grey"
                >
                  <label className="mr-2 df gap-3 label">
                    <input
                      type="radio"
                      name="cooking-time"
                      id={timeOption.label}
                      checked={timeOption.value === time}
                      onChange={() => {
                        dispatch(updateTime(timeOption.value));
                      }}
                      className="checkbox filled"
                    />
                    {timeOption.label} {index > 0 ? t('min') : null}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
        <hr className="mx-3" />
      </>
    );
  };

  return (
    <aside>
      <button
        onClick={() => setOpen(!open)}
        className={`py-4 px-5 mt-2 text-main fs-14 fw-regular rounded-s df aic jcc ${styles.filterToggle}`}
      >
        <FaSliders className="mr-3" /> {t('Filter')}
      </button>

      <div
        className={`
          bg-white rounded-m mr-5 d-pb-3 
          ${styles.content} 
          ${open ? styles.open : null}
        `}
      >
        <div className="px-5 py-4 bg-main-light rounded-top-m df jcsb">
          <h2 className="fw-bold fs-20">{t('Filter')}</h2>
          <button onClick={() => setOpen(!open)}>
            <FaX />
          </button>
        </div>

        {/* Dish Types Filter */}
        {renderFilterOptions(
          dishTypeOptions,
          typeOfDish,
          updateTypeOfDish,
          'typeOfDish',
          'Dish Type'
        )}

        {/* Cuisines Filter */}
        {renderFilterOptions(
          cuisineOptions,
          cuisine,
          updateCuisine,
          'cuisine',
          'Cuisine'
        )}

        {/* Vegetarian Filter */}
        {renderBooleanFilter(
          'Vegetarian',
          isVegetarian,
          updateIsVegetarian,
          'vegetarian'
        )}

        {/* Child-friendly Filter */}
        {renderBooleanFilter(
          'Child Friendly',
          isChildFriendly,
          updateIsChildFriendly,
          'childFriendly'
        )}

        {/* Cooking Time Filter */}
        {renderTimeFilter()}

        {/* Tags Filter */}
        {renderFilterOptions(tagOptions, tags, updateTags, 'tags', 'Labels')}

        <div className="m-4 mt-5 desktop-hidden">
          <Button text={t('View recipes')} onClick={() => setOpen(!open)} />
        </div>
      </div>
    </aside>
  );
};

export default Filters;
