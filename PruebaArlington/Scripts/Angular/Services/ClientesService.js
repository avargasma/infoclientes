app.service("ClientesService", function ($http) {
    //FUNCIONES PARA CLIENTES
    
    this.listarPaises = function () {
        debugger;
        return $http.get("/Paises/ListarPaises");
    };
    this.listarDptoXpais = function (codPais) {
        var response = $http({
            method: "post",
            url: "/Muni/ListarDptoXPais",
            params: {
                codPais: JSON.stringify(codPais)
            }
        });
        return response;
    }
    this.listarMunisXdpto = function (codDpto) {
        var response = $http({
            method: "post",
            url: "/Clientes/listarMunisXdpto",
            params: {
                codDpto: JSON.stringify(codDpto)
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
    this.getCliente = function (nitCliente) {
        var response = $http({
            method: "post",
            url: "/Clientes/consultaClienteById",
            params: {
                nitCliente: nitCliente
            }
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