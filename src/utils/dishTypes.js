import mainImage from '../assets/bg/main.jpg';
import starterImage from '../assets/bg/starter.png';
import dessertImage from '../assets/bg/dessert.jpg';
import sideImage from '../assets/bg/side.png';
import breakfastImage from '../assets/bg/breakfast.jpg';
import lunchImage from '../assets/bg/lunch.jpg';
import snackImage from '../assets/bg/snack.png';
import pastryImage from '../assets/bg/pastry.png';

export const dishTypes = [
  {
    label: 'main',
    value: 'Main',
    background: mainImage,
    backgroundPosition: '0% 65%',
  },
  {
    label: 'starter',
    value: 'Starter',
    background: starterImage,
    backgroundPosition: '0% 7%',
  },
  {
    label: 'dessert',
    value: 'Dessert',
    background: dessertImage,
    backgroundPosition: '0% 60%',
  },
  {
    label: 'side',
    value: 'Side dish',
    background: sideImage,
    backgroundPosition: '0% 75%',
  },
  {
    label: 'breakfast',
    value: 'Breakfast',
    background: breakfastImage,
    backgroundPosition: '0% 60%',
  },
  {
    label: 'lunch',
    value: 'Lunch',
    background: lunchImage,
    backgroundPosition: '0% 60%',
  },
  {
    label: 'snack',
    value: 'Snack',
    background: snackImage,
    backgroundPosition: '0% 50%',
  },
  {
    label: 'pastry',
    value: 'Pastry',
    background: pastryImage,
    backgroundPosition: '0% 60%',
  },
];
