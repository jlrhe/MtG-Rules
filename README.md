App for displaying and searching Magic the Gathering rules found in https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt


Work in progress...

TODO:
  ~~add a disclaimer required by wizards fan content policy~~  
  ~~add event handlers for next/previous section~~  
  disable navigation until rules have been fetched and parsed  
  possibility to show all rules at the same time (and thus search them)  
  add rulenumbering to be part of the rules text (or something) so that the user can search by a rules number (I didn't think this was neccessary, but I have been told of a compelling use case for this)  
  ~~fix parser (chapter 505 -> affects 506-514)~~  
  Extra features (hyperlink when a rule references another, possibility for user to select alternative file by URL)  
  optimize parser and make it more robust so there's maybe a possibility of reading a different txt file...  



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

