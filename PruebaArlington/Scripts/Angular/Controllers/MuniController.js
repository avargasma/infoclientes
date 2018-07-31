app.controller("CtrlMuni", function ($scope, MuniService) {
    listarPaises();
    listarMunis();
    //To Get All Records   

    function listarPaises() {
        //debugger;
        var getData = MuniService.listarPaises();
        //debugger;
        getData.then(function (pais) {
            $scope.paises = pais.data;
        }, function (error) {
            alert('Error..');
        });
    }
    function listarMunis() {
        //debugger;
        var getData = MuniService.listarMunis();
        //debugger;
        getData.then(function (res) {
            $scope.munis = res.data;
            console.log($scope.munis);
        }, function (error) {
            alert('Error..');
        });
    }
    $scope.listarDptoXpais = function (codPais) {
        if (codPais=="" || codPais == undefined) {
            return;
        }
        //debugger;
        var getData = MuniService.listarDptoXpais(codPais);
        //debugger;
        getData.then(function (res) {
            $scope.dptos = res.data;
        }, function (error) {
            alert('Error..');
        });
    }

    $scope.editMuni = function (muni) {
        //debugger;
        var getData = MuniService.getMuni(muni.MnIdMunicipio);
        getData.then(function (d) {
            $scope.muni = d.data;
            $scope.idMuni = muni.MnIdMunicipio;
            $scope.codMuni = muni.MnCodMunicipio;
            $scope.nomMuni = muni.MnNombreMunicipio;
            $scope.listarDptoXpais(muni.PsCodPais);
            $scope.codDptoMuni = muni.MnDepartamento;
            $scope.codPais = muni.PsCodPais;
            $scope.InhabilitaCampoCod = true;
            $scope.focusNom = true;
            $scope.styleEdit = { "background-color": "#F2F2F2" }
            $scope.Action = "Update";
        },
            function () {
                alert('Error..');
            });
    }

    $scope.AddUpdateMuni = function () {
        //debugger;
        var muni = {
            MnCodMunicipio: $scope.codMuni,
            MnNombreMunicipio: $scope.nomMuni,
            MnDepartamento: $scope.codDptoMuni
        };
        var getAction = $scope.Action;
        muni.MnIdMunicipio = $scope.idMuni;
        if (muni.MnIdMunicipio == "" || muni.MnIdMunicipio == undefined) {
            alert('El codigo del municipio no puede estar vacio.');
            $scope.focusCod = true;
            return;
        } else if (muni.MnNombreMunicipio == "" || muni.MnNombreMunicipio == undefined) {
            alert('El nombre del municipio no puede estar vacío.');
            $scope.focusNom = true;
            return;
        } else if (muni.MnCodMunicipio == "" || muni.MnCodMunicipio == undefined) {
            alert('El código ISO del municipio no puede estar vacío.');
            return;
        }
        else if ($scope.codPais == "" || $scope.codPais == undefined) {
            alert('Debe seleccionar un país.');
            return;
        }
        else if (muni.MnDepartamento == "" || muni.MnDepartamento == undefined) {
            alert('Debe seleccionar un departamento.');
            return;
        }
        if (getAction == "Update") {
            var getData = MuniService.updateMuni(muni);
            getData.then(function (msg) {
                if (msg.data == "Error") {
                    alert("Lo sentimos, ha ocurrido un error.")
                } else {
                    listarMunis();
                    alert(msg.data);
                    $scope.ClearFields();
                    $scope.focusCod = true;
                    $scope.Action = "";
                }
            }, function () {
                alert('Error..');
            });
        } else {
            var getData = MuniService.AddMuni(muni);
            getData.then(function (msg) {
                if (msg.data == "Error") {
                    alert("Lo sentimos, ha ocurrido un error.")
                } else {
                    alert(msg.data);
                    listarMunis();
                    $scope.ClearFields();
                    $scope.Action = "";
                }
                //$scope.divProd = false;
            }, function () {
                alert('Error..');
            });
        }
    }

    $scope.MuniInCliente = function (muni) {
        var getData = MuniService.ConsultaMuniXcliente(muni.MnIdMunicipio);
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

    $scope.EliminaMuni = function (muni) {
        //PENDIENTE LA VALIDACION DE ELIMINACION SI EXISTE EN UN CLIENTE
        if ($scope.MuniInCliente(muni)) {
            alert("El municipio " + muni.MnNombreMunicipio + " no puede ser eliminado porque se encuentra asociado a un cliente.");
            return;
        } else { return; }
        var getData = MuniService.DelMuni(muni.MnIdMunicipio);
        getData.then(function (msg) {
            listarMunis();
            alert('Municipio eliminado correctamente.');
        }, function () {
            alert('Error eliminando');
        });
    }

    $scope.ClearFields = function () {
        $scope.codMuni = "";
        $scope.nomMuni = "";
        $scope.idMuni = "";
        $scope.codDptoMuni = ""
        $scope.codPais = "";
        $scope.Action = "";
        $scope.dptos = null;
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