app.service("DptosService", function ($http) {

    //FUNCIONES PARA DEPARTAMENTOS
    this.listarDptos = function () {
        //debugger;
        return $http.get("/Dptos/ListarDptos");
    };
    this.listarPaises = function () {
        //debugger;
        return $http.get("/Paises/ListarPaises");
    };
    this.getDpto = function (codDpto) {
        var response = $http({
            method: "post",
            url: "/Dptos/consultaDptoById",
            params: {
                codDpto: JSON.stringify(codDpto)
            }
        });
        return response;
    }
    this.updateDpto = function (dpto) {
        var response = $http({
            method: "post",
            url: "/Dptos/ActualizaDpto",
            data: JSON.stringify(dpto),
            dataType: "json"
        });
        return response;
    }
    this.AddDpto = function (dpto) {
        var response = $http({
            method: "post",
            url: "/Dptos/AggDpto",
            data: JSON.stringify(dpto),
            dataType: "json"
        });
        return response;
    }
    this.DelDpto = function (dpto) {
        var response = $http({
            method: "post",
            url: "/Dptos/EliminarDpto",
            params: {
                codDpto: JSON.stringify(dpto)
            }
        });
        return response;
    }

    this.ConsultaMuniXdpto = function (codDpto) {        
        var response = $http({
            method: "post",
            url: "/Dptos/ConsultaMuniXdpto",
            params: {
                codDpto: JSON.stringify(codDpto)
            }
        });
        return response;
    }
})