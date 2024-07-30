# Mijn Kookboek (My Cookbook)

Live environment: [mijn-kookboek.nl](https://mijn-kookboek.nl)

Your personal cookbook! Create an account and start adding your recipes or explore new recipes. Automatically create shopping lists with the required ingredients and make grocery shopping easier than ever.

Check out the demo account:

- Username: demo
- Password: demo

Note: This project is still work in progress and not all features work as intended yet.

## About The Project

This project contains the ehadless front-end for my recipe shopping list web-app.
Front-end, back-end and design is done by me.

- Back-end project: [https://github.com/Eelkedejong/recipe-data](https://github.com/Eelkedejong/recipe-data)

## Project structure

App.jsx is the entry point for the entire app where global systems are initialized.
Authentication.jsx is the authentication layer that blocks the app untill the user signed in.
When the user is signed in, the layout.jsx is used to load the different sections of the application.

## folder structure

#### pages

pages contains all component that are pages defined as routes. These are the top-level component for each page.

#### components

Components contains both re-usable components and components that are used as building blocks for indiviual pages.

- The ui folder contains small ui components used all over the website.
- The components folder contains elements used across different pages, like the aside, header and navigation.
- The subfolder recipe and shopping list contain components that are used as building blocks for their respective

#### utils

Contains all utility functions used on a global level.

#### styles

Contains the (global) styling for the application. See the Theming section for more info.

#### store

Contains the Redux store.

## Tech Stack

- **React** is the framework the application is build in.
- **Vite** is used as the base development server and compiler.
- **React Query** in combination with fetch is used to get data from the back-end and store data on the front-end for a smooth user experience.
- **React Redux** is used to store user data and user interaction with filters and search inputs, as well as creating shopping lists.
- **Cloudinary** is isued for handling user images.
- **React i18m** is used for translations.

## Theming

A custom utility class system, in combination with modular component styling is used for styling and layout building.
A few gobal styling rules are defined in the defaults.scss and app.scss files.

## To Do list

- Proper error handling, both for user error messages as well as system error logging. Mostly when dealing with API calls.
- Lot's of bugfixes and overal quality improvements on the front-end UX.
- Better shopping list UX, especially for grocery shopping.
- Shopping list functionality for public recipes.
- Automated menu generation.
- AI recipe suggestions.

## Images

All recipe banner images are under the free license of Usplash.
Most photo's come from https://unsplash.com/@brookelark

## Development

Development is currently still done by me. For the project to function locally, the project needs a VITE_API_KEY variable in the root .env file.

## Contact

Eelke de Jong - eelkesdejong@gmail.com - [eelke.me](https://eelke.me)

Project Link: [https://github.com/Eelkedejong/recipe-shopping-list](https://github.com/Eelkedejong/recipe-shopping-list)

[contributors-shield]: https://img.shields.io/github/contributors/Eelkedejong/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/Eelkedejong/
[issues-shield]: https://img.shields.io/github/issues/Eelkedejong/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/Eelkedejong/recipe-shopping-list/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/eelke-de-jong/
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
