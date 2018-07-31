app.service("RegVisitaService", function ($http) {

    this.cargarVendedores = function () {
        debugger;
        return $http.get("/Vendedores/ListarVendedores");
    };

    this.cargarClientes = function () {
        //debugger;
        return $http.get("/ListarClientes/ListarClientesParaCbx");
    };

    this.AddVisita = function (visita) {
        var response = $http({
            method: "post",
            url: "/RegVisita/AggVisita",
            data: JSON.stringify(visita),
            dataType: "json"
        });
        return response;
    }
    
    this.CargarDatosClienteSeleccionado = function (nitCliente) {
        //debugger;
        var response = $http({
            method: "post",
            url: "/Clientes/consultaClienteById",
            params: {
                nitCliente: JSON.stringify(nitCliente)
            }
        });
        return response;
    };

})