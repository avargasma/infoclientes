app.service("PaisService", function ($http) {

    //FUNCIONES PARA CLIENTES
    this.listarPaises = function () {
        debugger;
        return $http.get("/Paises/ListarPaises");
    };
    this.getPais = function (codPais) {
        var response = $http({
            method: "post",
            url: "/Paises/consultaPaisById",
            params: {
                codPais: JSON.stringify(codPais)
            }
        });
        return response;
    }
    this.updatePais = function (pais) {
        var response = $http({
            method: "post",
            url: "/Paises/ActualizaPais",
            data: JSON.stringify(pais),
            dataType: "json"
        });
        return response;
    }
    this.AddPais = function (pais) {
        var response = $http({
            method: "post",
            url: "/Paises/AggPais",
            data: JSON.stringify(pais),
            dataType: "json"
        });
        return response;
    }
    this.DelPais = function (pais) {
        var response = $http({
            method: "post",
            url: "/Paises/EliminarPais",
            params: {
                codPais: JSON.stringify(pais)
            }
        });
        return response;
    }

    this.ConsultaDptoXpais = function (codPais) {       
        var response = $http({
            method: "post",
            url: "/Paises/consultaDptoXpais",
            params: {
                codPais: JSON.stringify(codPais)
            }
        });
        return response;
    }
})