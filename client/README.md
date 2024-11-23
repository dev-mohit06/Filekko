# Client Setup
Follow these steps to set up the client project.

## Author
- [Mohit Paddhariya](https://github.con/dev-mohit06)

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/dev-mohit06/filekko.git
    ```
2. Navigate to the client directory:
    ```sh
    cd filekko/client
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

## Running the Application

To start the development server, run:
```sh
npm run dev
```
or
```sh
yarn run dev
```

## Firebase Configuration

To set up Firebase configuration, follow these steps:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).

2. Add a new web app to your Firebase project and copy the Firebase configuration details.

3. In the `src/common` folder, create a file named `firebaseConfig.js`.

4. Add create the following code file to `src/common/firebaseConfig.js` and paste the Firebase configuration details.