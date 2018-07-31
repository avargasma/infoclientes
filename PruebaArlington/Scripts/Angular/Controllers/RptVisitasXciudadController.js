app.controller("CtrlRptVisitasXciudad", function ($scope, RptVisitasXciudadService) {

    $scope.dsVisitasXciudad = {};
    CargarDatos();
    function CargarDatos() {
        var getData = RptVisitasXciudadService.ListarVisitasXciudad();
        //debugger;
        getData.then(function (d) {
            $scope.dsVisitasXciudad = d.data;
            console.log($scope.dsVisitasXciudad);
            $scope.chartOptions = {
                dataSource: $scope.dsVisitasXciudad,
                palette: "soft",
                title: {
                    text: "Visitas de clientes por ciudad",
                    subtitle: "InfoClientes"
                },
                commonSeriesSettings: {
                    type: "bar",
                    valueField: "countVisitas",
                    argumentField: "nomCiudad",
                    ignoreEmptyPoints: true
                },
                seriesTemplate: {
                    nameField: "nomCiudad"
                }
            };
        }, function (error) {
            alert('Error..');
        });
    }
})