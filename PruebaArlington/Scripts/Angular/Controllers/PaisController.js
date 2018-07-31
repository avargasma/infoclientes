app.controller("CtrlPais", function ($scope, PaisService) {
    listarPaises();
    //To Get All Records 
    function listarPaises() {
        //debugger;
        var getData = PaisService.listarPaises();
        //debugger;
        getData.then(function (pais) {
            $scope.paises = pais.data;
        }, function (error) {
            alert('Error..');
        });
    }
    $scope.editPais = function (pais) {
        debugger;
        var getData = PaisService.getPais(pais.PsCodPais);

        getData.then(function (d) {
            $scope.pais = d.data;
            $scope.codPais = pais.PsCodPais;
            $scope.nomPais = pais.PsNomPais;
            $scope.cosIso = pais.PsCodIso;
            $scope.InhabilitaCampoCod = true;
            $scope.focusNom = true;
            $scope.styleEdit = { "background-color": "#F2F2F2" }
            $scope.Action = "Update";
        },
        function () {
            alert('Error..');
        });
    }

    $scope.AddUpdatePais = function () {
        debugger;
        var pais = {
            PsNomPais: $scope.nomPais,
            PsCodIso: $scope.cosIso
        };
        var getAction = $scope.Action;
        pais.PsCodPais = $scope.codPais;
        if (pais.PsCodPais == "" || pais.PsCodPais == undefined) {
            alert('El codigo del pais no puede estar vacio.');
            $scope.focusCod = true;
            return;
        } else if (pais.PsNomPais == "" || pais.PsNomPais == undefined) {
            alert('El nombre del pais no puede estar vacío.');
            $scope.focusNom = true;
            return;
        } else if (pais.PsCodIso == "" || pais.PsCodIso == undefined) {
            alert('El código Iso del pais no puede estar vacío.');
            return;
        }
        if (getAction == "Update") {
            var getData = PaisService.updatePais(pais);
            getData.then(function (msg) {
                if (msg.data == "Error") {
                    alert("Lo sentimos, ha ocurrido un error.")
                } else {
                    alert(msg.data);
                    listarPaises();
                    $scope.ClearFields();
                    $scope.focusCod = true;
                    $scope.Action = "";
                }
            }, function () {
                alert('Error..');
            });
        } else {
            var getData = PaisService.AddPais(pais);
            getData.then(function (msg) {
                if (msg.data == "Error") {
                    alert("Lo sentimos, ha ocurrido un error.")
                } else {
                    alert(msg.data);
                    listarPaises();
                    $scope.ClearFields();
                    $scope.Action = "";
                }                
            }, function () {
                alert('Error..');
            });
        }
    }
 
    $scope.EliminaPais = function (pais) {
        //PENDIENTE LA VALIDACION DE ELIMINACION SI EXISTE EN UN DPTO
        if ($scope.PaisInDptos(pais)) {
            alert("El pais " + pais.PsNomPais + " no puede ser eliminado porque se encuentra asociado a un departamento.");
            return;
        } else { return; }
        
        var getData = PaisService.DelPais(pais.PsCodPais.toString());
        getData.then(function (msg) {
            listarPaises();
            alert('Pais eliminado correctamente.');
        }, function () {
            alert('Error eliminando');
        });
    }

    $scope.PaisInDptos = function (pais) {
        var getData = PaisService.ConsultaDptoXpais(pais.PsCodPais);
        //debugger;
        getData.then(function (res) {
            $scope.dptos = res.data;
            if ($scope.dptos.length > 0) {
                return true;
            } else {
                return false;
            }
        }, function (error) {
            alert('Error..');
        });
        
    }
    $scope.ClearFields = function() {
        $scope.codPais = "";
        $scope.nomPais = "";
        $scope.cosIso = "";
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