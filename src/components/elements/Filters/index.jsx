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
  FaChevronDown,
  FaChevronUp,
  FaMagnifyingGlass,
} from 'react-icons/fa6';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Collapsible from '@/components/ui/Collapsible';
import Drawer from '@/components/ui/Drawer';
import { useIsMobile } from '@/hooks/useMediaQuery';
import styles from './filters.module.scss';

// Import filter API function
import getRecipeFilter from '@/pages/recipe/api/filters/getRecipeFilter';
import Checkbox from '@/components/ui/Checkbox';
import Radio, { RadioGroup } from '@/components/ui/Radio';

const Filters = () => {
  const user = useSelector((state) => state.user.value);
  const searchParams = useSelector((state) => state.searchParams.value);
  const { tags, time, typeOfDish, cuisine, isVegetarian, isChildFriendly } =
    searchParams;

  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

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
    const displayCount = displayAll ? searchFilteredOptions.length : 6;
    const displayOptions = searchFilteredOptions.slice(0, displayCount);
    const hasMore = searchFilteredOptions.length > 6;

    return (
      <>
        <Collapsible
          title={t(title)}
          open={!collapsedSections[sectionKey]}
          onOpenChange={() => toggleCollapse(sectionKey)}
        >
          <>
            {/* Search input field */}
            <div className="mb-3 relative">
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
                className="absolute"
                style={{
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            </div>

            <ul className="flex flex-col gap-3">
              {displayOptions.map((option) => (
                <li key={option} className="font-light text-14 text-dark-grey">
                  <label
                    className={`mr-2 flex gap-3 label ${styles.filterLabel}`}
                  >
                    <Checkbox
                      name={option}
                      id={option}
                      checked={selectedOptions.includes(option)}
                      onCheckedChange={() => {
                        dispatch(updateAction(option));
                      }}
                      variant="filled"
                    />
                    {option}
                  </label>
                </li>
              ))}

              {hasMore && (
                <li className="mt-2">
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="text-main text-14 flex items-center"
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
        </Collapsible>
        <hr className="mx-3" />
      </>
    );
  };

  // Function to render boolean filter option (vegetarian, child-friendly)
  const renderBooleanFilter = (title, isSelected, updateAction, sectionKey) => {
    return (
      <>
        <Collapsible
          title={t(title)}
          open={!collapsedSections[sectionKey]}
          onOpenChange={() => toggleCollapse(sectionKey)}
        >
          <ul className="flex flex-col gap-3">
            <li className="font-light text-14 text-dark-grey">
              <label className="mr-2 flex gap-3 label">
                <Checkbox
                  name={title.toLowerCase().replace(/\s+/g, '-')}
                  id={title.toLowerCase().replace(/\s+/g, '-')}
                  checked={isSelected === true}
                  onCheckedChange={() =>
                    dispatch(updateAction(isSelected === true ? false : true))
                  }
                  variant="filled"
                />
                {t(`${title}`)}
              </label>
            </li>
          </ul>
        </Collapsible>
        <hr className="mx-3" />
      </>
    );
  };

  // Function to render time filter
  const renderTimeFilter = () => {
    return (
      <>
        <Collapsible
          title={t('Cooking time')}
          open={!collapsedSections.time}
          onOpenChange={() => toggleCollapse('time')}
        >
          <RadioGroup
            render={<ul className="flex flex-col gap-3" />}
            name="cooking-time"
            value={time}
            onValueChange={(value) => dispatch(updateTime(value))}
          >
            {timeOptions.map((timeOption, index) => (
              <li
                key={timeOption.label}
                className="font-light text-14 text-dark-grey"
              >
                <label className="mr-2 flex gap-3 label">
                  <Radio id={timeOption.label} value={timeOption.value} />
                  {timeOption.label} {index > 0 ? t('min') : null}
                </label>
              </li>
            ))}
          </RadioGroup>
        </Collapsible>
        <hr className="mx-3" />
      </>
    );
  };

  // Same controls in both modes; only the container differs.
  const filterContent = (
    <>
      {/* Dish Types Filter */}
      {renderFilterOptions(
        dishTypeOptions,
        typeOfDish,
        updateTypeOfDish,
        'typeOfDish',
        t('Dish type')
      )}

      {/* Cuisines Filter */}
      {renderFilterOptions(
        cuisineOptions,
        cuisine,
        updateCuisine,
        'cuisine',
        t('Cuisine')
      )}

      {/* Vegetarian Filter */}
      {renderBooleanFilter(
        t('Vegetarian'),
        isVegetarian,
        updateIsVegetarian,
        'vegetarian'
      )}

      {/* Child-friendly Filter */}
      {renderBooleanFilter(
        t('Child friendly'),
        isChildFriendly,
        updateIsChildFriendly,
        'childFriendly'
      )}

      {/* Cooking Time Filter */}
      {renderTimeFilter()}

      {/* Tags Filter */}
      {renderFilterOptions(tagOptions, tags, updateTags, 'tags', 'Labels')}
    </>
  );

  if (isMobile) {
    return (
      <aside>
        <button
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className={`py-4 px-6 mt-2 text-main text-14 font-medium rounded-10 flex items-center justify-center ${styles.filterToggle}`}
        >
          <FaSliders className="mr-3" /> {t('Filter')}
        </button>

        <Drawer
          open={open}
          onOpenChange={setOpen}
          title={t('Filter')}
          closeLabel={t('Close filters')}
          footer={
            <Button
              className="w-full"
              text={t('View recipes')}
              onClick={() => setOpen(false)}
            />
          }
        >
          {filterContent}
        </Drawer>
      </aside>
    );
  }

  return (
    <aside>
      <div className={`bg-white rounded-20 mr-6 s:pb-3 ${styles.content}`}>
        <div className="px-6 py-4 bg-main-bg rounded-t-20">
          <h2 className="font-bold text-20">{t('Filter')}</h2>
        </div>

        {filterContent}
      </div>
    </aside>
  );
};

export default Filters;
