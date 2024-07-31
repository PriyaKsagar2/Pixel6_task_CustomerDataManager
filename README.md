<div align="center">
    <h1 align="center">Customer Data Manager</h1>
  <p align="center">
    A CRUD app made using React JS
    <br />
    </p>
</div>

### Customer details, Customer details list, and Edit features

#### Customer details form:
![Image 1](https://github.com/PriyaKsagar2/Pixel6_task_CustomerDataManager/blob/master/readme%20images/localhost_3000_.png)

<br>

#### Customer details list:
![Image 2](https://github.com/PriyaKsagar2/Pixel6_task_CustomerDataManager/blob/master/readme%20images/Screenshot%20(1957).png)

<br>

#### Editing features:
![Image 3](https://github.com/PriyaKsagar2/Pixel6_task_CustomerDataManager/blob/master/readme%20images/Screenshot%20(1958).png)

#### Website link 
link: https://pixel6-task-customer-data-manager.vercel.app/

### Built using 
ReactJS

## Description

This customer data management project is a React-based web application designed to manage customer information efficiently. It includes features for adding, editing, and deleting customer data, focusing on ensuring data validity through various input constraints. The project is deployed using Vercel for easy access and management.

### Features

1. **PAN Verification**:
   - Validate PAN format (Indian format: 10 characters, mix of alphabets and numbers).
   - Verify PAN through an external API.

2. **Email Validation**:
   - Ensure email format validity.
   - Limit email length to 255 characters.

3. **Mobile Number Validation**:
   - Include a static prefix of "+91".
   - Validate mobile number format (10 digits).

4. **Address Management**:
   - Add up to 10 addresses per customer.
   - Remove addresses as needed.
   - Address line 1 is mandatory.
   - Fetch city and state data based on postcode using API.

5. **Customer List Management**:
   - View, edit, and delete customer details.
   - Edit customer data with input validation for PAN, email, and mobile number.
   - Save and cancel editing operations.

6. **Data Persistence**:
   - Store customer data in localStorage.

7. **Deployment**:
   - Hosted on Vercel for easy access and management.

<br>
<br>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single-build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
