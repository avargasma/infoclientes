app.service("MovsXclientService", function ($http) {

    this.listarMovs = function (nitCliente) {
        var response = $http({
            method: "post",
            url: "/MovXcliente/listarMovs",
            params: {
                nitCliente: nitCliente
            }
        });
        return response;
    };

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

})