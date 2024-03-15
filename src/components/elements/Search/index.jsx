import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch } from '../../../store/searchParamsSlice';
import Input from '../../ui/Input';
import { FaSearch } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import styles from './search.module.scss';

const Search = ({ openState, setOpenState }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useSelector((state) => state.searchParams.value);
  const { search } = searchParams;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(search);
  const [disabled, setDisabled] = useState(true);
  const [inputKey, setInputKey] = useState(0);

  useEffect(() => {
    if (openState) {
      document.body.classList.add('overlay');
    } else {
      document.body.classList.remove('overlay');
    }
  }, [openState]);

  // Reset the search input when the search query is reset.
  useEffect(() => {
    if (search === '') {
      setSearchQuery('');
      setInputKey((prevKey) => prevKey + 1);
    }
  }, [search]);

  return (
    <div className={`${styles.wrapper} ${openState ? styles.open : ''}`}>
      <form
        className="df fdc gap-4 pos-relative"
        onSubmit={(e) => {
          e.preventDefault();
          // Set the search query in the store.
          dispatch(updateSearch(searchQuery));

          // Navigate to the recipes page if the user is not already there.
          if (location.pathname !== '/recipes') {
            navigate('/recipes');
          }

          setOpenState(false);
        }}
      >
        <Input
          id="search"
          label={t('Search recipe')}
          classes={styles.input}
          value={searchQuery ? searchQuery : ''}
          key={inputKey}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value !== '') {
              setDisabled(false);
            } else {
              setDisabled(true);
            }
          }}
        />

        {!disabled ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSearchQuery('');
              setDisabled(true);
              dispatch(updateSearch(''));
            }}
            className={`${styles.clear} df aic`}
          >
            <FaX />
          </button>
        ) : null}

        <button className={styles.searchButton} disabled={disabled}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
