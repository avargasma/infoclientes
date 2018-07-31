app.service("myService", function ($http) {

    this.listarProductos = function () {
        debugger;
        return $http.get("/Data/ListarProductos");
    };
    this.getProd = function (codProd) {
        var response = $http({
            method: "post",
            url: "/Data/consultaProdById",
            params: {
                codProd: JSON.stringify(codProd)
            }
        });
        return response;
    }
    this.updateProd = function (prod) {
        var response = $http({
            method: "post",
            url: "/Data/ActualizaProd",
            data: JSON.stringify(prod),
            dataType: "json"
        });
        return response;
    }
    this.AddProd = function (prod) {
        var response = $http({
            method: "post",
            url: "/Data/AggProducto",
            data: JSON.stringify(prod),
            dataType: "json"
        });
        return response;
    }
    this.DelProd = function (CodProd) {
        var response = $http({
            method: "post",
            url: "/Data/EliminarProd",
            params: {
                CodProd: JSON.stringify(CodProd)
            }
        });
        return response;
    }

    //FUNCIONES PARA CLIENTES
    this.listarClientes = function () {
        debugger;
        var r = $http.get("/Clientes/ListarClientes");
        var i = 0;
        return r;
    };
    this.getCliente = function (nit) {
        var response = $http({
            method: "post",
            url: "/Clientes/consultaClienteById",
            params: {
                nit: JSON.stringify(nit)
            }
        });
        return response;
    }
    this.updateCliente = function (cliente) {
        var response = $http({
            method: "post",
            url: "/Clientes/ActualizaCliente",
            data: JSON.stringify(cliente),
            dataType: "json"
        });
        return response;
    }
    this.AddCliente = function (cliente) {
        var response = $http({
            method: "post",
            url: "/Clientes/AggCliente",
            data: JSON.stringify(cliente),
            dataType: "json"
        });
        return response;
    }
    this.DelCliente = function (nit) {
        var response = $http({
            method: "post",
            url: "/Cliente/EliminarCliente",
            params: {
                nit: JSON.stringify(nit)
            }
        });
        return response;
    }
})