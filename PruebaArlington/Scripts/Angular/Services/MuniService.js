app.service("MuniService", function ($http) {

    //FUNCIONES PARA MUNICIPIOS
    //this.listarDptos = function () {
    //    debugger;
    //    return $http.get("/Dptos/ListarDptos");
    //};
    this.listarPaises = function () {
        //debugger;
        return $http.get("/Paises/ListarPaises");
    };
    this.listarMunis = function () {
        debugger;
        return $http.get("/Muni/ListarMunis");
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
    this.getMuni = function (codMuni) {
        var response = $http({
            method: "post",
            url: "/Muni/consultaMuniById",
            params: {
                codMuni: JSON.stringify(codMuni)
            }
        });
        return response;
    }
    this.updateMuni = function (muni) {
        var response = $http({
            method: "post",
            url: "/Muni/ActualizaMuni",
            data: JSON.stringify(muni),
            dataType: "json"
        });
        return response;
    }
    this.AddMuni = function (muni) {
        var response = $http({
            method: "post",
            url: "/Muni/AggMuni",
            data: JSON.stringify(muni),
            dataType: "json"
        });
        return response;
    }
    this.DelMuni = function (codMuni) {
        var response = $http({
            method: "post",
            url: "/Muni/EliminarMuni",
            params: {
                codMuni: JSON.stringify(codMuni)
            }
        });
        return response;
    }

    this.ConsultaMuniXcliente = function (codMuni) {
        var response = $http({
            method: "post",
            url: "/Muni/ConsultaMuniXcliente",
            params: {
                codMuni: JSON.stringify(codMuni)
            }
        });
        return response;
    }
})