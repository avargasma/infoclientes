app.controller("CtrlRegVisita", function ($scope, RegVisitaService) {
    cargarVendedores();
    cargarClientes();

    $scope.fechaActual = Date.now();
    $scope.cleinteSeleccionado = {};
    $scope.idMuniActualCliente = "";
    $scope.cargoCliente = false;

    function cargarVendedores() {
        //debugger;
        var getData = RegVisitaService.cargarVendedores();
        //debugger;
        getData.then(function (d) {
            $scope.vendedores = d.data;
            console.log($scope.vendedores);
        }, function (error) {
            alert('Error..');
        });
    }

    $scope.CargarDatosClienteSeleccionado = function (nitCliente) {
        $scope.cargoCliente = false;
        $scope.VsValorNeto = "";
        $scope.VsValorVisita = "";
        $scope.saldoActual = "";
        if (nitCliente == undefined || nitCliente == "") {
            return;
        }
        //debugger;
        var getData = RegVisitaService.CargarDatosClienteSeleccionado(nitCliente);
        //debugger;
        getData.then(function (d) {
            var res = d.data;
            $scope.cleinteSeleccionado = res;
            if ($scope.cleinteSeleccionado.ClSaldoCupo == 0 || $scope.cleinteSeleccionado.ClSaldoCupo == null || $scope.cleinteSeleccionado.ClSaldoCupo == undefined) {
                alert("Al parecer el cliente " + $scope.cleinteSeleccionado.ClNombresApe + " no cuenta con cupo disponible, por favor agregue cupo y vuelva a intentarlo.")
                $scope.cleinteSeleccionado = {};
                $scope.nitClienteActual = "";
                $scope.cargoCliente = false;
                return;
            } else {
                $scope.cargoCliente = true;
            }
        }, function (error) {
            alert('Error..');
        });
    }

    function cargarClientes() {
        //debugger;
        var getData = RegVisitaService.cargarClientes();
        //debugger;
        getData.then(function (client) {
            $scope.clientesReg = client.data;
            console.log($scope.clientesReg);
            //$scope.selectBoxSettings = {
            //    dataSource: $scope.clientesReg,
            //    displayExpr: 'ClNombresApe',
            //    valueExpr: 'ClNIt',
            //    //value: "Cat1"
            //    bindingOptions: {
            //        value: 'nitClienteActual'
            //    }
            //}
            //$scope.selectBox = {
            //    dataSourceUsage: {
            //        dataSource: new DevExpress.data.ArrayStore({
            //            data: $scope.clientesReg,
            //            key: "ClNIt"
            //        }),
            //        displayExpr: "ClNombresApe",
            //        valueExpr: "ClNIt",
            //        value: $scope.clientesReg[0].ClNIt,
            //    },
            //    eventHandler: {
            //        items: $scope.clientesReg,
            //        bindingOptions: {
            //            value: "ClNIt"
            //        }
            //    }
            //};
        }, function (error) {
            alert('Error..');
            console.log(error);
        });
    }   

    $scope.ValidarValorVisita = function (valNeto) {
        if (valNeto == "" || valNeto == null || valNeto == undefined) {
            $scope.VsValorVisita = "";
            return;
        }
        var cupo = $scope.cleinteSeleccionado.ClSaldoCupo;
        var porcentaje = $scope.cleinteSeleccionado.ClPorceVisitas;
        var valVisita = valNeto * porcentaje;
        if (valVisita > cupo) {
            alert("El valor de la visita es superior al saldo de cupos actual del cliente.");
            $scope.VsValorNeto = cupo / porcentaje;
            $scope.VsValorVisita = $scope.VsValorNeto * porcentaje;
            return;
        }
        $scope.VsValorVisita = valVisita;
    }

    $scope.AddVisita = function () {
        //debugger;
        var visita = {
            VsFeha: null,
            VsValorNeto: $scope.VsValorNeto,
            VsValorVisita: $scope.VsValorVisita,
            VsObservacion: $scope.VsObservacion,
            ClNit: $scope.nitClienteActual,
            VsIdMuni: $scope.cleinteSeleccionado.MnIdMunicipio,
            VdDocumento: $scope.VdDocumento
        };
        if (visita.VdDocumento == "" || visita.VdDocumento == undefined) {
            alert('Debe seleccionar el vendedor.');
            $scope.focusCod = true;
            return;
        } else if (visita.ClNit <= 0 || visita.ClNit == "" || visita.ClNit == undefined) {
            alert('Debe seleccionar el cliente.');
            $scope.focusNom = true;
            return;
        } else if (visita.VsValorNeto == "" || visita.VsValorNeto == undefined) {
            alert('El valor neto de la visita no puede estar vacío.');
            return;
        } else if (visita.VsObservacion == "" || visita.VsObservacion == undefined) {
            alert('Por favor digite la observación de la visita.');
            return;
        }
        var getData = RegVisitaService.AddVisita(visita);
        getData.then(function (msg) {
            if (msg.data == "Error") {
                alert("Lo sentimos, ha ocurrido un error.")
            } else {
                alert(msg.data);
                $scope.ClearFields();
            }
        }, function () {
            alert('Error..');
        });
        
    }   
    $scope.ClearFields = function () {
        $scope.VdDocumento = "";
        $scope.nitClienteActual = "";
        $scope.VsValorNeto = "";
        $scope.VsValorVisita = "";
        $scope.cargoCliente = false;
        $scope.fechaActual = Date.now();
        $scope.VsObservacion = "";
    }
})