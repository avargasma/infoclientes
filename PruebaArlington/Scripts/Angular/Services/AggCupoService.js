app.service("CuposService", function ($http) {

    this.cargarClientes = function () {
        //debugger;
        return $http.get("/ListarClientes/ListarClientesParaCbx");
    };

    this.AddCupo = function (cupo) {
        var response = $http({
            method: "post",
            url: "/AgregarCupo/AggCupo",
            data: JSON.stringify(cupo),
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