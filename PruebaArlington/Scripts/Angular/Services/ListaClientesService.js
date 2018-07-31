app.service("ListaClientesService", function ($http) {
    this.listarClientes = function () {
        //debugger;
        var r = $http.get("/ListarClientes/ListarClientes");
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
})
