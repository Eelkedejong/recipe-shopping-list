import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import RecipeTile from '../../components/recipe/RecipeTile';
import TypesList from '../../components/recipe/TypesList';
import getRecipes from '../recipe/api/getRecipe';
import styles from './overview.module.scss';
import bannerImage from '../../assets/img/cookbook.webp?w=2000';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';

const Overview = () => {
  const { t } = useTranslation();
  const searchParams = { limit: '3', tags: [] };
  const user = useSelector((state) => state.user.value);
  const results = useQuery({
    queryKey: ['recipes', user.token, '', searchParams],
    queryFn: getRecipes,
    ...{
      enabled: !!user.token,
    },
  });

  const recipes = results?.data?.data ?? [];

  return (
    <>
      <div
        className={`rounded-m mb-5 ${styles.banner}`}
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        {/* <div className={`fs-16 fw-semibold mobile-hidden ${styles.bannerText}`}>
          {t('Search for recipes')}
        </div> */}
      </div>
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
      <div className="bg-white p-5 mb-5 rounded-m"></div>
    </>
  );
};

export default Overview;
