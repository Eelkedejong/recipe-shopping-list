import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RecipeTile from '../../components/recipe/RecipeTile';
import getRecipes from '../recipe/api/getRecipe';
import getPublicRecipes from '../recipe/api/getPublicRecipes';
import styles from './overview.module.scss';
import bannerImage from '../../assets/img/cookbook.webp?w=2000';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import { dishTypes } from '../../utils/dishTypes';

const Overview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const searchParams = { limit: '3', tags: [] };
  const user = useSelector((state) => state.user.value);
  const results = useQuery({
    queryKey: ['recipes', user.token, '', searchParams],
    queryFn: getRecipes,
    ...{
      enabled: !!user.token,
    },
  });

  const publicSearchParams = { limit: '3', tags: [] };
  const publicRecipesResults = useQuery({
    queryKey: ['publicRecipes', publicSearchParams],
    queryFn: getPublicRecipes,
    ...{ enabled: !!publicSearchParams },
  });

  const recipes = results?.data?.data ?? [];
  const publicRecipes = publicRecipesResults?.data?.data ?? [];

  return (
    <>
      <div
        className={`rounded-m mb-5 ${styles.banner}`}
        style={{ backgroundImage: `url(${bannerImage})` }}
      ></div>
      <div className="bg-white p-5 mb-5 rounded-m">
        <div className="df aic jcsb mb-4">
          <h3 className="fs-20 fw-semibold">{t('Your newest recipes')}</h3>
          <Link to="/recipes" className="text-main df aic gap-2">
            {t('View all your recipes')} <FaChevronRight />
          </Link>
        </div>
        <div className={`recipe-list ${styles.grid}`}>
          {recipes ? (
            recipes.map((recipe) => {
              return (
                <RecipeTile
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  labels={recipe.tags}
                  time={recipe.time}
                  type={recipe.type}
                  key={recipe.id}
                />
              );
            })
          ) : (
            <div>
              {t('You don\t have any recipes yet! Start adding new recipes')}
              <Link to="/recipe/new">{t('here')}</Link>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white p-5 mb-5 rounded-m">
        <h3 className="fs-20 fw-semibold pb-4">
          {t('What dish are you looking for?')}
        </h3>
        <div className="df gap-3 fww pb-2">
          {dishTypes.map((recipeType) => (
            <button
              onClick={() => {
                navigate(`/recipes/all/${recipeType.label}`);
              }}
              className="py-2 px-4 text-main bg-main-light rounded-s fs-14 fw-semibold"
              key={recipeType.label}
            >
              {t(`${recipeType.value}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 mb-5 rounded-m">
        <div className="df aic jcsb mb-4">
          <h3 className="fs-20 fw-semibold pb-4">
            {t('Want to try something new?')}
          </h3>
          <Link to="/recipes" className="text-main df aic gap-2">
            {t('Discover more recipes')} <FaChevronRight />
          </Link>
        </div>
        <div className={`recipe-list ${styles.grid}`}>
          {publicRecipes
            ? publicRecipes.map((recipe) => {
                return (
                  <RecipeTile
                    id={recipe.id}
                    name={recipe.name}
                    image={recipe.image}
                    labels={recipe.tags}
                    time={recipe.time}
                    type={recipe.type}
                    key={recipe.id}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Overview;
