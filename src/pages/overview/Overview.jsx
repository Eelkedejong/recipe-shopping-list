import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import RecipeTile from '../../components/recipe/RecipeTile';
import getRecipes from '../recipe/api/getRecipe';
import getPublicRecipes from '../recipe/api/getPublicRecipes';
import styles from './overview.module.scss';
import bannerImage from '../../assets/img/cookbook.webp?w=2000';
import { Link } from 'react-router';
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
    queryKey: ['publicRecipesOverview', publicSearchParams, ''],
    queryFn: getPublicRecipes,
    ...{ enabled: !!publicSearchParams },
  });

  const recipes = results?.data?.data ?? [];
  const publicRecipes = publicRecipesResults?.data?.data ?? [];

  return (
    <>
      <div
        className={`rounded-20 mb-6 ${styles.banner}`}
        style={{ backgroundImage: `url(${bannerImage})` }}
      ></div>
      <div className="bg-white p-6 mb-6 rounded-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-20 font-semibold">{t('Your newest recipes')}</h3>
          <Link to="/recipes" className="text-main flex items-center gap-2">
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
      <div className="bg-white p-6 mb-6 rounded-20">
        <h3 className="text-20 font-semibold pb-4">
          {t('What dish are you looking for?')}
        </h3>
        <div className="flex gap-3 flex-wrap pb-2">
          {dishTypes.map((recipeType) => (
            <button
              onClick={() => {
                navigate(`/recipes/all/${recipeType.label}`);
              }}
              className="py-2 px-4 text-main bg-main-bg rounded-10 text-14 font-semibold"
              key={recipeType.label}
            >
              {t(`${recipeType.value}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 mb-6 rounded-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-20 font-semibold pb-4">
            {t('Want to try something new?')}
          </h3>
          <Link to="/recipes/all" className="text-main flex items-center gap-2">
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
