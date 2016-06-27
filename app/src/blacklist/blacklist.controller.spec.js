describe('Blacklist Test', function () {

    /* jshint -W109 */
    var $q, $controller, $rootScope, $httpBackend,
        blacklist, blacklistData;
    var mockingResponse = ["live.co.kr", "gmail.com", "hotmail.com",
        "googlemail.com", "yahoo.com", "outlook.com", "live.com",
        "users.noreply.github.com", "yahoo.de", "hotmail.co.uk",
        "yahoo.com.au", "live.cn", "192.168.2.9", "???",
        "Cuneyt-MacBook-Pro.local", "fastmail.fm", "yahoo.it",
        "live.be", "yeah.net", "t-online.de", "telekom.de", "web.de",
        "qq.com", "live.nl", "yahoo.co.jp", "inbox.ru", "mailbox.org",
        "gmx.net", "gmx.at", "gmx.de", "posteo.de", "126.com", "163.com",
        "hotmail.nl", "naver.com", "mail.ru", "yahoo.fr", "freenet.de",
        "hotmail.de", "ya.ru", "yandex.ru", "senzam.cz", "aol.com", "me.com",
        "msn.com"];

    function requestedUrl(url) {
        switch (url) {
            case 'src/home/home.html':
                return true;
            case 'src/navBar/navbar.html':
                return true;
            case 'src/code-quality/quality.html':
                return true;
        }
    }

    beforeEach(module('leaderBoard'));

    beforeEach(inject(function (_$q_, _$controller_, _$rootScope_, _$httpBackend_, _blacklistData_) {
        $q = _$q_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        blacklistData = _blacklistData_;
    }));

    beforeEach(function () {
        $httpBackend.when('GET', requestedUrl)
            .respond(200, {});
    });

    it('should get blacklist domains', function () {
        spyOn(blacklistData, 'get').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(mockingResponse);
            return deferred.promise;
        });
        blacklist = $controller('BlacklistController', {blacklistData: blacklistData});
        $rootScope.$apply();
        expect(blacklist.blacklistDomains).toEqual(mockingResponse);
    });

    it('should delete domain', function(){
        blacklist = $controller('BlacklistController', {blacklistData: blacklistData});
        blacklist.blacklistDomains = mockingResponse;
        blacklist.remove( 0 );
        expect( blacklist.blacklistDomains[0] ).toEqual('gmail.com');
    });

    it('should update domain', function(){
        blacklist = $controller('BlacklistController', {blacklistData: blacklistData});
        blacklist.blacklistDomains = mockingResponse;
        blacklist.updatedName = 'zamalek.com';
        blacklist.update( 0 );
        expect( blacklist.blacklistDomains[0] ).toEqual('zamalek.com');
    });

    it('should create domain', function(){
        blacklist = $controller('BlacklistController', {blacklistData: blacklistData});
        blacklist.blacklistDomains = mockingResponse;
        var length = mockingResponse.length;
        blacklist.newName = 'zamalek.com';
        blacklist.create();
        expect( blacklist.blacklistDomains[0] ).toEqual('zamalek.com');
    });

});