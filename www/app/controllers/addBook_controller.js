cabApp.controller("addBookController", ['$scope', '$http', '$rootScope', '$state', function ($scope, $http, $rootScope, $state) {

    $scope.cabDetails = {}

    $scope.navList = [

        {
            title: "User Details",
            navUrl: "#/home",
            state: "home"
        },
        {
            title: "Books",
            navUrl: "#/addBook",
            state: "addBook"
        }

    ];

    if ($rootScope.role == 'Normal') {
        $scope.navList = [


            {
                title: "Books",
                navUrl: "#/book",
                state: "book"
            }

        ];

        $scope.editField = true
        $scope.deleteField = true

    } else {
        $scope.navList = [

            {
                title: "User Details",
                navUrl: "#/home",
                state: "home"
            },
            {
                title: "Manage Cabs",
                navUrl: "#/book",
                state: "book"
            },
            {
                title: "Add Cabs",
                navUrl: "#/addBook",
                state: "addBook"
            }

        ]

        $scope.editField = false
        $scope.deleteField = false
    }


    $scope.savecabDetails = function () {

        $scope.fieldValidation = true;
        if ($scope.cabDetails.name == null || $scope.cabDetails.name == "") {
            alert("cab Name can't be blank");
            $scope.fieldValidation = false;
            return false;
        }

        if ($scope.cabDetails.driverno == null || $scope.cabDetails.driverno == "") {
            alert("Driverno  can't be blank");
            $scope.fieldValidation = false;
            return false;
        }else {
            if (/\D/.test($scope.cabDetails.driverno)) {

                alert("Driverno should be number");

                $scope.fieldValidation = false;
                return false;
            }
        }

        if ($scope.cabDetails.costPerkm == null || $scope.cabDetails.costPerkm == "") {
            alert("costPerkm can't be blank");

            $scope.fieldValidation = false;
            return false;
        } else {
            if (/\D/.test($scope.cabDetails.costPerkm)) {

                alert("costPerkm should be number");

                $scope.fieldValidation = false;
                return false;
            }
        }

        if ($scope.cabDetails.reg == null || $scope.cabDetails.reg == "") {
            alert("reg can't be blank");

            $scope.fieldValidation = false;
            return false;
        } else {
            if (/\D/.test($scope.cabDetails.reg)) {

                alert("reg should be number");

                $scope.fieldValidation = false;
                return false;
            }
        }
        if ($scope.fieldValidation) {
            var req_data = {
                cabname: $scope.cabDetails.name,
                driverno: $scope.cabDetails.driverno,
                costPerkm: $scope.cabDetails.costPerkm,
                reg: $scope.cabDetails.reg


            };
            $http.post('/addBook', req_data)

                .then(function (response) {
                    var responseObject = response.data;

                    if (responseObject.status) {
                        $scope.cab_info = "cab added successfully";

                        setTimeout(function () {

                            $state.go('addBook')

                        }, 3000);

                    } else {
                        if (responseObject.statusCode == 100) {
                            $scope.cab_info = responseObject.message;
                        } else {
                            $scope.cab_info = "Not able to add";
                        }

                    }


                });
        }
        ;
    }


    $scope.logout = function () {

        var req_data = {
            email: $rootScope.email


        };

        console.log("req_data", req_data);
        $http.post('/logout', req_data)

            .then(function (response) {
                $state.go("login")

            });
    };

}]);
