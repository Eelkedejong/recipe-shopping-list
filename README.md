[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />

# Mijn Kookboek (My Cookbook)

Live enviroment: [https://mijn-kookboek.nl](mijn-kookboek.nl)

Your personal cookbook! Create an account and start adding your recipes or explore new recipes. Automatically create shopping lists with the required ingredients and make grocery shopping easier than ever.

Check out the demo account:

Username: demo
password: demo

Note: This project is still work in progress and not all features work as intended yet.

## About The Project

This project contains the front-end for my recipe shopping list web-app.
Front-end, back-end and design is done by me.

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

#### Utils

Contains all utility functions used on a global level.

#### Styles

Contains the (global) styling for the application. See the Theming section for more info.

#### store

Contains the Redux store.

## Tech Stack

- _React_ is the framework the application is build in.
- _Vite_ is used as the base development server and compiler.
- _React Query_ in combination with fetch is used to get data from the back-end and store data on the front-end for a smooth user experience.
- _React Redux_ is used to store user data and user interaction with filters and search inputs, as well as creating shopping lists.
- _Cloudinary_ is isued for handling user images.
- _React i18m_ is used for translations.

## Theming

A custom utility class system, in combination with modular component styling is used for styling and layout building.
A few gobal styling rules are defined in the defaults.scss and app.scss files.

## To Do list

- Proper error handling, both for user error messages as well as system error logging. Mostly when dealing with API calls.
- Lot's of bugfixes and overal quality improvements on the front-end UX.
-

## Images

All recipe banner images are under the free license of Usplash.
Most photo's come from https://unsplash.com/@brookelark

## Contact

Eelke de Jong - eelkesdejong@gmail.com - [https://eelke.me](eelke.me)

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
