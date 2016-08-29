(function ()
{
    'use strict';

    angular
        .module('app.project', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.project', {
            url      : '/project',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/project/project.html',
                    controller : 'ProjectController as vm'
                }
            },
            bodyClass: 'project'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/project');

        // Api
        // msApiProvider.register('project.inbox', ['app/data/mail/inbox.json']);
        

        // Navigation
        msNavigationServiceProvider.saveItem('fuse.project', {
            title : 'Project',
            icon  : 'icon-email',
            state : 'app.project',
            badge : {
                content: 25,
                color  : '#F44336'
            },
            weight: 0
        });
    }
})();