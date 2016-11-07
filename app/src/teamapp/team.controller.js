/*function () {
    'use strict';

    angular
        .module('gameFace')
        .controller('VideoController', VideoController);

    VideoController.$inject = ['gameVideoData'];

    /!* @ngInject *!/
    function VideoController(gameVideoData) {

        var vm = this;
        vm.Videos = [];*/

(function () {

'use strict';

    angular
        .module('gameFace')
        .controller('TeamController', TeamController);

    TeamController.$inject = ['TeamData'];

    function TeamController(TeamData) {

        var vm = this;
        vm.Team = TeamData.getTeam();
        vm.Team.then(
            function(e) {console.log(e);},
            function(r) {console.log(r);}
        );

    }
    

}());
