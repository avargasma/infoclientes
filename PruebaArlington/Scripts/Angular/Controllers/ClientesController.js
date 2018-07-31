
app.controller("CtrlClientes", function ($scope, ClientesService) {

    listarPaises();
    $scope.currentCliente = {};
    function listarPaises() {
        //debugger;
        var getData = ClientesService.listarPaises();
        //debugger;
        getData.then(function (pais) {
            $scope.paises = pais.data;
        }, function (error) {
            alert('Error..');
        });
    }
    $scope.listarDptoXpais = function (codPais) {
        $scope.munis = null;
        if (codPais == "" || codPais == undefined) {
            $scope.dptos = null;
            return;
        }
        //debugger;
        var getData = ClientesService.listarDptoXpais(codPais);
        //debugger;
        getData.then(function (res) {
            $scope.dptos = res.data;
        }, function (error) {
            alert('Error..');
        });
    }
    $scope.listarMunisXdpto = function (codDpto) {
        if (codDpto == "" || codDpto == undefined) {
            $scope.munis = null;
            return;
        }
        //debugger;
        var getData = ClientesService.listarMunisXdpto(codDpto);
        //debugger;
        getData.then(function (res) {
            $scope.munis = res.data;
        }, function (error) {
            alert('Error..');
        });
    }

    $scope.AddUpdateCliente = function () {
        debugger;
        var cliente = {
            ClNombresApe: $scope.nomCliente,
            ClDireccion: $scope.dirCliente,
            ClTel: $scope.telCliente,
            MnIdMunicipio: $scope.codMuni,
            ClCupo: $scope.cupoMax,
            ClSaldoCupo: $scope.saldoCupCLiente,
            ClPorceVisitas: $scope.pocerVisCliente
        };
        var getAction = $scope.Action;
        cliente.ClNIt = $scope.nitCliente;

        if (cliente.ClNIt == "" || cliente.ClNIt == undefined) {
            alert('El nit del cliente no puede estar vacío.');
            $scope.focusCod = true;
            return;
        } else if (cliente.ClNombresApe == "" || cliente.ClNombresApe == undefined) {
            alert('El nombre del cliente no puede estar vacío.');
            $scope.focusNom = true;
            return;
        } else if (cliente.ClTel == "" || cliente.ClTel == undefined) {
            alert('El teléfono del cliente no puede estar vacío.');
            return;
        } else if (cliente.ClDireccion == "" || cliente.ClDireccion == undefined) {
            alert('La dirección del cliente no puede estar vacío.');
            return;
        } else if (cliente.ClCupo == "" || cliente.ClCupo == undefined) {
            alert('Por favor ingrese el cupo del cliente.');
            return;
        } else if ($scope.codPais == "" || $scope.codPais == undefined) {
            alert('Debe seleccionar un país.');
            return;
        } else if ($scope.codDptoMuni == "" || $scope.codDptoMuni == undefined) {
            alert('Debe seleccionar un departamento.');
            return;
        } else if (cliente.MnIdMunicipio == "" || cliente.MnIdMunicipio == undefined) {
            alert('Debe seleccionar un municipio.');
            return;
        }

        if (getAction == "Update") {
            var getData = ClientesService.updateCliente(cliente);
            getData.then(function (msg) {
                if (msg.data == "Error") {
                    alert("Lo sentimos, ha ocurrido un error.")
                } else {
                    alert(msg.data);
                    $scope.ClearFields();
                    $scope.Action = "";
                    $scope.focusCod = true;
                }
            }, function () {
                alert('Error..');
            });
        } else {            
            var getData = ClientesService.AddCliente(cliente);
            getData.then(function (msg) {
                if (msg.data == "Error") {
                    alert("Lo sentimos, ha ocurrido un error.")
                } else {
                    alert(msg.data);
                    $scope.Action = "";
                    $scope.ClearFields();
                }
                //$scope.divProd = false;
            }, function () {
                alert('Error..');
            });
        }
    }

    $scope.ValidarCupoMax = function (valCupoMax) {
        if (valCupoMax < $scope.saldoCupCLiente) {
            alert("El cupo máximo no puede ser menor al saldo actual.");
            $scope.cupoMax = $scope.saldoCupCLiente;
            return;
        }
    }

    $scope.BuscarCliente = function (nitcliente) {
        debugger;
        var getData = ClientesService.getCliente(nitcliente);
        getData.then(function (d) {
            $scope.currentCliente = d.data;
            if ($scope.currentCliente.ClNIt == null) {
                alert("EL usuario con núemro de documento " + nitcliente + " no existe.");
                $scope.currentCliente = {};
                $scope.focusCod = true;
                return;
            }
            $scope.nitCliente = $scope.currentCliente.ClNIt;
            $scope.nomCliente = $scope.currentCliente.ClNombresApe;
            $scope.dirCliente = $scope.currentCliente.ClDireccion;
            $scope.telCliente = $scope.currentCliente.ClTel;
            $scope.cupoMax = $scope.currentCliente.ClCupo;
            $scope.saldoCupCLiente = $scope.currentCliente.ClSaldoCupo;
            $scope.pocerVisCliente = $scope.currentCliente.ClPorceVisitas;
            $scope.codPais = $scope.currentCliente.PsCodPais;
            $scope.listarDptoXpais($scope.codPais);
            $scope.codDptoMuni = $scope.currentCliente.DpCodDpto;
            $scope.listarMunisXdpto($scope.codDptoMuni);
            $scope.codMuni = $scope.currentCliente.MnIdMunicipio;
            $scope.InhabilitaCampoCod = true;
            $scope.styleEdit = { "background-color": "#F2F2F2" }
            $scope.focusNom = true;
            $scope.Action = "Update";
           
        },
        function () {
            alert('Error..');
        });
    }

    $scope.ClearFields = function() {
        $scope.nomCliente = "";
        $scope.dirCliente = "";
        $scope.telCliente = "";
        $scope.codMuni = "";
        $scope.nitCliente = "";
        $scope.Action = "";
        $scope.dptos = "";
        $scope.munis = "";
        $scope.pocerVisCliente = "";
        $scope.saldoCupCLiente = "";
        $scope.cupoMax = "";
        $scope.currentCliente = {};
        $scope.styleEdit = { "background-color": "white" }
        $scope.InhabilitaCampoCod = false;
        $scope.focusCod = true;
    }
});