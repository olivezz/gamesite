(function () {

    /* jshint -W109 */
    describe('RestService.js Test', function () {

        var RestService, $httpBackend, response, $resource, $q;

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

        beforeEach(inject(function (_RestService_, _$httpBackend_, _$resource_, _$q_) {
            RestService = _RestService_;
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

        it('should getDataSetCount', function () {
            var mockingResponse = [{
                "rank": 1,
                "commits": 120,
                "netDebt": -77708,
                "negativeDebt": -79688,
                "positiveDebt": 1980,
                "improvedPercentage": 8,
                "projects": 4,
                "organization": "gs.com",
                "imageUrl": "http://www.goldmansachs.com/a/pgs/images/gs-logo-70.gif",
                "date": 1462459096000
            },];
            $httpBackend.when('GET', /\/leaderboard\/service\/project\/count/)
                .respond(200, mockingResponse);
            RestService.getDataSetCount()
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
            response = undefined;
        });

        it('should getProjectCommitCount', function () {
            var mockingResponse = {
                "count": 6660,
                "results": [{
                    "id": 31,
                    "name": "swagger_api_swagger_codegen",
                    "branch": "master",
                    "url": "https://github.com/swagger-api/swagger-codegen",
                    "commits": 2004,
                    "netDebt": null,
                    "positiveDebt": null,
                    "negativeDebt": null
                }]
            };
            $httpBackend.when('GET', /\/leaderboard\/service\/project\/commit\/count/)
                .respond(200, mockingResponse);
            RestService.getProjectCommitCount()
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should getOrganizationsContributions', function () {
            var mockingResponse = {
                "count": 5066,
                "results": [{"emailDomain": "apache.org", "contributions": 8536}, {
                    "emailDomain": "pivotal.io",
                    "contributions": 6410
                }, {"emailDomain": "google.com", "contributions": 5324}, {
                    "emailDomain": "redhat.com",
                    "contributions": 3865
                }]
            };
            $httpBackend.when('GET', /\/leaderboard\/service\/contributor\/emailDomain\/contributions/)
                .respond(200, mockingResponse);
            RestService.getOrganizationsContributions()
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should getQualityLeader', function () {
            var mockingResponse = [{
                "rank": 1,
                "commits": 120,
                "netDebt": -77708,
                "negativeDebt": -79688,
                "positiveDebt": 1980,
                "improvedPercentage": 8,
                "projects": 4,
                "organization": "gs.com",
                "imageUrl": "http://www.goldmansachs.com/a/pgs/images/gs-logo-70.gif",
                "date": 1462459096000
            }];
            $httpBackend.when('GET', /\/leaderboard\/service\/organization\/leaders\/quality/)
                .respond(200, mockingResponse);
            RestService.getQualityLeader()
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should getTechnicalDebt', function () {
            var mockingResponse = [{
                "year": 2016,
                "week": 18,
                "net": -2984,
                "positive": 65,
                "negative": -3049
            }, {"year": 2016, "week": 19, "net": 0, "positive": 0, "negative": 0}, {
                "year": 2016,
                "week": 20,
                "net": 0,
                "positive": 0,
                "negative": 0
            }, {"year": 2016, "week": 21, "net": 0, "positive": 0, "negative": 0}];
            $httpBackend.when('GET', /\/leaderboard\/service\/organization\/debt\?organization=devfactory/)
                .respond(200, mockingResponse);
            RestService.getTechnicalDebt('devfactory')
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should getBlacklistedDomains', function () {
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
            RestService.getBlacklistedDomains()
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should getOrganizationSummary', function () {
            var mockingResponse = {
                "rank": 1,
                "netDebt": -171482,
                "addedDebt": 21183,
                "removedDebt": -192665,
                "commits": 1058,
                "committers": 14,
                "projects": null,
                "improvedPercent": null,
                "rankTests": null,
                "testCount": -1,
                "linesCovered": -3,
                "organization": "devfactory.com"
            };
            $httpBackend.when('GET', /\/leaderboard\/service\/organization\/search\?name=devfactory/)
                .respond(200, mockingResponse);
            RestService.getOrganizationSummary('devfactory')
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should getOrganizationContributors', function () {
            var mockingResponse = [{
                "id": 1809,
                "name": "Faisal Hameed",
                "url": "",
                "email": "faisal.hameed@devfactory.com",
                "contributions": 276,
                "netDebt": -97856,
                "positiveDebt": 7341,
                "negativeDebt": -105197
            }, {
                "id": 373,
                "name": "George Kankava",
                "url": "",
                "email": "george.kankava@devfactory.com",
                "contributions": 275,
                "netDebt": -50032,
                "positiveDebt": 7618,
                "negativeDebt": -57650
            }];
            $httpBackend.when('GET', /\/leaderboard\/service\/organization\/contributors\?organization=devfactory/)
                .respond(200, mockingResponse);
            RestService.getOrganizationContributors('devfactory')
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should getOrganizationProjects', function () {
            var mockingResponse = [{
                "id": 3166,
                "name": "clun_ff4j",
                "branch": "master",
                "url": "https://github.com/clun/ff4j",
                "commits": 21,
                "netDebt": 2134,
                "positiveDebt": 2134,
                "negativeDebt": 0
            }];
            $httpBackend.when('GET', /\/leaderboard\/service\/organization\/projects\?organization=devfactory/)
                .respond(200, mockingResponse);
            RestService.getOrganizationProjects('devfactory')
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should getCodeCoverageLeader', function () {
            var url = "https://encrypted-tbn1.gstatic.com/images?";
            url += "q=tbn:ANd9GcQ7IDhAa0JFoyqNEIGX7K1jcss_IKwMXbpT1QCGc2EQdpKQjfLvuhEZS3H_";
            var mockingResponse = [{
                "rank": 1,
                "commits": 157,
                "organization": "hortonworks.com",
                "imageUrl": url,
                "tests": 4,
                "linesCovered": 112
            }];
            $httpBackend.when('GET', /\/leaderboard\/service\/organization\/leaders\/tests/)
                .respond(200, mockingResponse);
            RestService.getCodeCoverageLeader()
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should getCodeCoverage', function () {
            var mockingResponse = [{"year": 2016, "week": 21, "newUnittests": null, "locAdded": null}, {
                "year": 2016,
                "week": 20,
                "newUnittests": null,
                "locAdded": null
            }, {"year": 2016, "week": 19, "newUnittests": null, "locAdded": null}, {
                "year": 2016,
                "week": 18,
                "newUnittests": null,
                "locAdded": null
            }];
            $httpBackend.when('GET', /\/leaderboard\/service\/organization\/coverage\?organization=devfactory/)
                .respond(200, mockingResponse);
            RestService.getCodeCoverage('devfactory')
                .then(function (result) {
                    response = result;
                });
            $httpBackend.flush();
            expect(response).toEqual(mockingResponse);
        });

        it('should handle error', function () {
            //var mockingError = $q.reject('Error retrieving data. (HTTP status: ' + 404 + ')');
            $httpBackend.when('GET', /\/leaderboard\/service\/organization\/coverage\?organization=devfactory/)
                .respond(500, 'Error retrieving data. (HTTP status: ' + 500 + ')');
            RestService.getCodeCoverage('devfactory')
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