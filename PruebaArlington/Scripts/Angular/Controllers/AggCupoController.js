app.controller("CtrlCupos", function ($scope, CuposService) {
    cargarClientes();
    $scope.cupoMax = "";
    $scope.AddCupo = function () {
        //debugger;
        var cupo = {
            CcFecha: null,
            CcValor: $scope.valorCupo,
            CcClNit: $scope.nitCliente
        };
        if (cupo.CcClNit == "" || cupo.CcClNit == undefined) {
            alert('Debe seleccionar el cliente.');
            $scope.focusCod = true;
            return;
        } else if (cupo.CcValor == "" || cupo.CcValor == undefined) {
            alert('Por favor digite el cupo que desea agregar.');
            return;
        } 
        var getData = CuposService.AddCupo(cupo);
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

    function cargarClientes() {
        //debugger;
        var getData = CuposService.cargarClientes();
        //debugger;
        getData.then(function (client) {
            $scope.clientesReg = client.data;
            console.log($scope.clientesReg);
        }, function (error) {
            alert('Error..');
            console.log(error);
        });
    }

    $scope.CargarDatosClienteSeleccionado = function (nitCliente) {
        $scope.valorCupo = "";
        $scope.cupoMax = "";
        $scope.cleinteSeleccionado = {};
        if (nitCliente == undefined || nitCliente == "") {
            return;
        }
        //debugger;
        var getData = CuposService.CargarDatosClienteSeleccionado(nitCliente);
        //debugger;
        getData.then(function (d) {
            var res = d.data;
            $scope.cleinteSeleccionado = res;
            $scope.cupoMax = $scope.cleinteSeleccionado.ClCupo;
            $scope.saldoCiente = $scope.cleinteSeleccionado.ClSaldoCupo;
            console.log($scope.cleinteSeleccionado);
        }, function (error) {
            alert('Error..');
        });
    }

    $scope.ValidarCupoMax = function (valIngresado) {
        var cupoActual = $scope.cupoMax;
        var saldoTotal = 0;
        if ($scope.saldoCiente == null || $scope.saldoCiente  == "") 
            $scope.saldoCiente = 0;        
        saldoTotal = valIngresado + $scope.saldoCiente;
        if (valIngresado > cupoActual) {
            alert("El saldo actual del cliente es de " + $scope.saldoCiente.toString() + ", el valor maximo del cupo que desea agregar no debe ser superior a " + (cupoActual - $scope.saldoCiente).toString());
            $scope.valorCupo = cupoActual - $scope.saldoCiente;
            return;
        }
    }


    $scope.ClearFields = function () {
        $scope.valorCupo = "";
        $scope.nitCliente = "";
    }
})