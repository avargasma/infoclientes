app.controller("CtrlDptos", function ($scope, DptosService) {
    listarDptos();
    listarPaises();
    //To Get All Records 
    function listarDptos() {
        //debugger;
        var getData = DptosService.listarDptos();
        //debugger;
        getData.then(function (res) {
            $scope.dptos = res.data;
        }, function (error) {
            alert('Error..');
        });
    }

    function listarPaises() {
        //debugger;
        var getData = DptosService.listarPaises();
        //debugger;
        getData.then(function (pais) {
            $scope.paises = pais.data;
        }, function (error) {
            alert('Error..');
        });
    }


    $scope.editDpto = function (dpto) {
        //debugger;
        var getData = DptosService.getDpto(dpto.DpCodDpto);

        getData.then(function (d) {
            $scope.dpto = d.data;
            $scope.codDpto = dpto.DpCodDpto;
            $scope.nomDpto = dpto.DpNomDpto;
            $scope.codPais = dpto.DpPais;
            $scope.InhabilitaCampoCod = true;
            $scope.focusNom = true;
            $scope.styleEdit = { "background-color": "#F2F2F2" }
            $scope.Action = "Update";
        },
        function () {
            alert('Error..');
        });
    }

    $scope.AddUpdateDpto = function () {
        debugger;
        var dpto = {
            DpPais: $scope.codPais,
            DpNomDpto: $scope.nomDpto
        };
        var getAction = $scope.Action;
        dpto.DpCodDpto = $scope.codDpto;
        if (dpto.DpCodDpto == "" || dpto.DpCodDpto == undefined) {
            alert('El codigo del departamento no puede estar vacio.');
            $scope.focusCod = true;
            return;
        } else if (dpto.DpNomDpto == "" || dpto.DpNomDpto == undefined) {
            alert('El nombre del departamento no puede estar vacío.');
            $scope.focusNom = true;
            return;
        } else if (dpto.DpPais == "" || dpto.DpPais == undefined) {
            alert('Debe seleccionar un país.');
            return;
        }
        if (getAction == "Update") {
            var getData = DptosService.updateDpto(dpto);
            getData.then(function (msg) {
                if (msg.data == "Error") {
                    alert("Lo sentimos, ha ocurrido un error.")
                } else {
                    listarDptos();
                    alert(msg.data);
                    $scope.ClearFields();
                    $scope.focusCod = true;
                    $scope.Action = "";
                }                
            }, function () {
                alert('Error..');
            });
        } else {                       
            var getData = DptosService.AddDpto(dpto);
            getData.then(function (msg) {
                if (msg.data == "Error") {
                    alert("Lo sentimos, ha ocurrido un error.")
                } else {
                    alert(msg.data);
                    listarDptos();
                    $scope.Action = "";
                }
                //$scope.divProd = false;
            }, function () {
                alert('Error..');
            });
        }
    }

    $scope.DptoInMuni = function (dpto) {
        var getData = DptosService.ConsultaMuniXdpto(dpto.DpCodDpto);
        //debugger;
        getData.then(function (res) {
            $scope.munis = res.data;
            if ($scope.munis.length > 0) {
                return true;
            } else {
                return false;
            }
        }, function (error) {
            alert('Error..');
        });

    }

    $scope.EliminaDpto = function (dpto) {
        //PENDIENTE LA VALIDACION DE ELIMINACION SI EXISTE EN UN MUNI
        if ($scope.DptoInMuni(dpto)) {
            alert("El departamento " + dpto.DpNomDpto + " no puede ser eliminado porque se encuentra asociado a un municipio.");
            return;
        } else { return; }
        var getData = DptosService.DelDpto(dpto.DpCodDpto);
        getData.then(function (msg) {
            listarDptos();
            alert('Departamento eliminado correctamente.');
        }, function () {
            alert('Error eliminando');
        });
    }
  
    $scope.ClearFields = function () {
        $scope.codDpto = "";
        $scope.nomDpto = "";
        $scope.codPais = ""
        $scope.Action = "";
        $scope.styleEdit = { "background-color": "white" }
        $scope.InhabilitaCampoCod = false;

    }
});

app.directive('ngConfirmClick', [
        function () {
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click', function (event) {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
        }])