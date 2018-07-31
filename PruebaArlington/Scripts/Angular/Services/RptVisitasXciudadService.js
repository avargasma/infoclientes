app.service("RptVisitasXciudadService", function ($http) {

    this.ListarVisitasXciudad = function () {
        //debugger;
        return $http.get("/RptVisitasXciudad/ListarVisitasXciudad");
    };
})