[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
<h3 align="center">Recipe shopping list web application</h3>

  <p align="center">
    Recipe shopping list web application
    <br />
    <a href="https://github.com/Eelkedejong/recipe-shopping-list/">View Demo</a>
    ·
    <a href="https://github.com/Eelkedejong/recipe-shopping-list/issues">Report Bug</a>
    ·
    <a href="https://github.com/Eelkedejong/recipe-shopping-list/issues">Request Feature</a>
  </p>
</div>

## About The Project

This project contains the front-end for my recipe shopping list web-app.

## Project structure

App.jsx is the entry point for the entire app where global systems are initialized.
Authentication.jsx is the authentication layer that blocks the app untill the user signed in.
When the user is sign in, the layout.jsx is called. This is the actual app, which only becomes available once a user signed in.
In the layout.jsx, all routes of the app itself are defined. Only after the user logged in and passes the authentication, these become available and are loaded in.

## folder structure

#### pages

pages contains all component that are pages defined as routes. These are the top-level component for each page.

#### components

Components contains both re-usable components and components that are used as building blocks for indiviual pages.

- The ui folder contains small ui components used all over the website.
- Some components are used across different pages, like the aside, header and navigation.
- The subfolder recipe and shopping list contain components that are used as building blocks for their respective

## Technology

## Contact

Eelke de Jong - eelkesdejong@gmail.com

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
