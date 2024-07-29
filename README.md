# SDG Challenge Audience Site

This project was started in July 2024 with the idea that the audience in the SDG challenge can register, view information and vote for teams all in the same place.

The project is now on [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1, for which you should download the Angular CLI.
You will also need [Firebase CLI](https://firebase.google.com/docs/cli) to publish and test the site.

## Table of Contents
- [Contributing](#contributing)
- [Angular commands](#angular-commands)
- [Firebase commands](#firebase-commands)


<a name="contributing"></a>
## Contributing

To contribute, start by cloning the repository. Run `git clone https://github.com/yourusername/your-repo.git` in your terminal. 
Navigate to the project directory with `cd sdg-challenge-audience-site`. 
Create a new branch for your feature or bug fix with `git checkout -b your-branch-name`. 
Make your changes and commit them with clear messages. 
Push your branch to GitHub with `git push origin your-branch-name` and open a pull request. 
Ensure your code adheres to the project's coding standards and includes necessary tests. 

Thank you for your contributions!

<a name="angular-commands"></a>
## Angular commands

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). We will eventually migrate this site to [Jest](https://jestjs.io/).
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<a name="firebase-commands"></a>
## Firebase commands

Run `firebase serve` to start a local server. Navigate to `http://localhost:5000/` to view your site locally. This is useful for testing before deployment.

**Access to the Firebase project is required for the following:**
Run `firebase login` to log in to your Firebase account. This will open a browser window where you can sign in. 
Run `firebase init` to set up Firebase in your project. This will prompt you to select the Firebase features you want to set up, such as Hosting, Firestore, or Functions.
Run `firebase deploy` to deploy your project to Firebase Hosting. Your site will be live at your Firebase project's URL.
Run `firebase logout` to log out from your Firebase account.
To get more help on Firebase commands, use `firebase help` or visit the [Firebase CLI Reference](https://firebase.google.com/docs/cli).



