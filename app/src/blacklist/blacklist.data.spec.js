(function () {

    /* jshint -W109 */
    describe('blacklistData.js Test', function () {

        var blacklistData, $httpBackend, response, $resource, $q;

        function requestedUrl( url ){
            switch( url ){
                case 'src/home/home.html':
                    return true;
                case 'src/navBar/navbar.html':
                    return true;
                case 'src/code-quality/quality.html':
                    return true;
            }
        }


        beforeEach(module('leaderBoard'));

        beforeEach(inject(function (_blacklistData_, _$httpBackend_, _$resource_, _$q_) {
            blacklistData = _blacklistData_;
            $httpBackend = _$httpBackend_;
            $resource = _$resource_;
            $q = _$q_;
        }));

        beforeEach(function(){
            $httpBackend.when('GET', requestedUrl )
                .respond(200, {});
        });

        afterEach(function () {
            //$httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get', function () {
            var mockingResponse = ["live.co.kr", "gmail.com", "hotmail.com",
                "googlemail.com", "yahoo.com", "outlook.com", "live.com",
                "users.noreply.github.com", "yahoo.de", "hotmail.co.uk",
                "yahoo.com.au", "live.cn", "192.168.2.9", "???",
                "Cuneyt-MacBook-Pro.local", "fastmail.fm", "yahoo.it",
                "live.be", "yeah.net", "t-online.de", "telekom.de",
                "web.de", "qq.com", "live.nl", "yahoo.co.jp", "inbox.ru",
                "mailbox.org", "gmx.net", "gmx.at", "gmx.de", "posteo.de",
                "126.com", "163.com", "hotmail.nl", "naver.com", "mail.ru",
                "yahoo.fr", "freenet.de", "hotmail.de", "ya.ru", "yandex.ru",
                "senzam.cz", "aol.com", "me.com", "msn.com"];
            $httpBackend.when('GET', /\/leaderboard\/service\/contributor\/emailDomain\/excluded/)
                .respond(200, mockingResponse);
            blacklistData.get()
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });
        
        it('should handle error', function () {
            $httpBackend.when('GET', /\/leaderboard\/service\/contributor\/emailDomain\/excluded/)
                .respond(500, 'Error retrieving data. (HTTP status: ' + 500 + ')');
            blacklistData.get()
                .then(function (result) {
                    response = result;
                }).catch(function (error) {
                response = error;
            });
            $httpBackend.flush();
            expect(response).toEqual('Error retrieving data. (HTTP status: ' + 500 + ')');
        });
    });
}());