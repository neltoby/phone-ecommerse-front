# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# Decisions

### `Pagination`

In implementing pagination, i used the intersection observer api to implement infinite scroll. Its makes the app easy to scroll and therefore easy to use.


### `Code splitting`

Code spliting helps make the load time fast.

### `State Management`

Redux might be an overkill for this project and increase bundle size, so i decided to go with context( the underlying principle on which redux operates).

### `Deploy`

Deploy on a seperate server from the back to reduce server load and maximize scability.
