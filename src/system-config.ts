// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'lodash': 'vendor/lodash/lodash.js',
  'decorator-ord': 'vendor/decorator-ord/dist',
  'decorator-eq': 'vendor/decorator-ord/dist/node_modules/decorator-eq'
};

/** User packages configuration. */
const packages: any = {
  './vendor/decorator-ord/dist/node_modules/decorator-eq':{
    main: 'index.js',
    defaultExtension: 'js',
    map:{
      'decorator-eq': 'vendor/decorator-ord/dist/node_modules/decorator-eq'
    }
  },
  './vendor/decorator-ord/dist':{
    main: 'index.js',
    defaultExtension: 'js',
    map:{
      'decorator-ord': 'vendor/decorator-ord/dist'
    }
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/filter/ordlocation',
  'app/list-length',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
