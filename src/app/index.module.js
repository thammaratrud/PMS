(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Sample
            // 'app.sample',

            'app.project',
            'app.login-v2',
            'app.register-v2',
            'LocalStorageModule'
        ]);
})();