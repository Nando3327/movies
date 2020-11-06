# MOVIES

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0. and Ionic v5

## First step

Run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. Use the `--prod` flag for a production build.

## Deploy

Run `ionic cordova build ios` for IOS `ionic cordova build android` for Android.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Libraries

    Akita: Used to manage storage
        "@datorama/akita": "^5.1.0",
        "@datorama/akita-ngdevtools": "^5.0.3",
        
    Network: Used to find internet connection
         "@ionic-native/network": "^5.29.0",
         
    Translator: differents lenguajes, set languajes files on i18n files inside the path src/assets/i18n.
    en: English, to change the languaje just create the file and the translation for each entry on the json file and set the value on the app.component.ts line 28: (this.translate.use('en'))
        "@ngx-translate/core": "^12.1.2",
        "@ngx-translate/http-loader": "^4.0.0",         

##Environments

     * key: API_KEY to connect
     * urlImages: Url to show images from the movies on the server
     * moviesToShow: number of movies to show
