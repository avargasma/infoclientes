app.controller("CtrlListaClientes", function ($scope, ListaClientesService) {
    listarClientes();
    function listarClientes() {
        debugger;
        var getData = ListaClientesService.listarClientes();
        debugger;
        getData.then(function (cliente) {
            $scope.clientes = cliente.data;
        }, function (error) {
            console.log(error);
            alert('Error..');
        });
    }
    $scope.editCliente = function (cliente) {
        debugger;
        var getData = ListaClientesService.getCliente(cliente.ClNIt);
        $scope.FilaCod = true;

        getData.then(function (d) {
            $scope.cliente = d.data;
            $scope.Nit = cliente.CodProd;
            //$scope.nomProd = prod.NomProd;
            //$scope.desProd = prod.Descripcion;
            //$scope.activo = prod.Activo;
            //$scope.inactivo = !prod.Activo;
            $scope.Action = "Update";
            //$scope.divProd = true;
        },
        function () {
            alert('Error..');
        });
    }
    $scope.AddUpdateCliente = function () {
        debugger;
        var cliente = {
            ClNombresApe: $scope.NombresApe,
            ClDireccion: $scope.Direccion,
            ClTel: $scope.Tel,
            MnIdMunicipio: $scope.IdMunicipio,
            ClCupo: $scope.Cupo,
            ClSaldoCupo: $scope.SaldoCupo,
            ClPorceVisitas: $scope.PorceVisitas
        };
        var getAction = $scope.Action;

        if (getAction == "Update") {
            cliente.ClNIt = $scope.Nit;
            var getData = ListaClientesService.updateCliente(cliente);
            getData.then(function (msg) {
                listarClientes();
                alert(msg.data);
            }, function () {
                alert('Error..');
            });
        } else {
            if (cliente.ClNombresApe == "") {
                alert('El nombre del cliente no puede estar vacio.');
                return;
            } else if (cliente.ClDireccion == "") {
                alert('La dirección del cliente no puede estar vacía.');
                return;
            } else if (cliente.ClTel == "") {
                alert('El teléfono del cliente no puede estar vacía.');
                return;
            } else if (cliente.MnIdMunicipio == "") {
                alert('Debe seleccionar el municipio de residencia.');
                return;
            }
            var getData = ListaClientesService.AddCliente(cliente);
            getData.then(function (msg) {
                listarClientes();
                alert(msg.data);
                //$scope.divProd = false;
            }, function () {
                alert('Error..');
            });
        }
    }
    $scope.ElimanaCliente = function (cliente) {
        var getData = ListaClientesService.DelCliente(cliente.ClNit);
        getData.then(function (msg) {
            listarClientes();
            alert('Cliente eliminado');
        }, function () {
            alert('Error eliminando');
        });
    }
});
