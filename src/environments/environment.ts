// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * key: API_KEY to connect
 * urlImages: Url to show images from the movies on the server
 * moviesToShow: number of movies to show
 */

export const environment = {
    production: false,
    key: '1b501bbda107113acc653f328a2e935d',
    urlImages: 'https://image.tmdb.org/t/p/w440_and_h660_face/',
    moviesToShow: 10,
    lang: 'en'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
