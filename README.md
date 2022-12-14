# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
# snake_client


##Start by giving an overview of your project, including its purpose and features.

This project is based on a snake bid game interact with websocket backend. Backend will send data based on current snake bid stage.
First stage, start bidding.
Second stage, give money back to the bidders, reducing TVL.
Third stage, select winner and display on the screen and hid the card.


##Next, demonstrate how the project works by showing a live demo or a video walkthrough. This will help the audience understand the functionality and user experience of your project.

display phase

##After the demo, discuss the technical details of your project. This can include the technologies and frameworks used, any challenges you faced, and how you solved them.

In this project I have errorboundary to handle error. 

Also seperate the page into header and card and put them in the Layout component. Data come from the websocket will be formated and map to the card component.

I have clean up websocket function in the useeffect hook in case memory leak. 

For format part I use a custom hook called useAppend. 

In the card from the requirement, if card go to the stage 3, it will display a modal and a box to show the highest bid, other bids and the card name.

##Finally, conclude your presentation by summarizing the key points and highlighting the value of your project.

This project use websocket to display the backend data synchronously. Improvment could be using mobx. No redux because it is not suitable for data changed frequently.