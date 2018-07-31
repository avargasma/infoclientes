app.controller("CtrlRptMovXcliente", function ($scope, MovsXclientService) {
    
    $scope.clic = function (nitCli) {
        alert(nitCli);
    }
    $scope.ConsultarMovs = function (nitCliente) {
        if (nitCliente == "" || nitCliente == undefined) {
            return;
        }
        var getData = MovsXclientService.listarMovs(nitCliente);
        getData.then(function (res) {
            $scope.movimientos = res.data;    
            //$scope.dataGridOptions = {
            //    dataSource: $scope.movimientos,
            //    columns: [
            //            {
            //                dataField: "ClNombresApe",
            //                caption: "Ciente"
            //            },{
            //                dataField: "NomVendedor",
            //                caption: "Vendedor"
            //            },{
            //                dataField: "VsFeha",
            //                dataType: "date",
            //                caption: "Fecha visita"
            //            }, {
            //                dataField: "VsValorNeto",
            //                dataType: "number",
            //                format: "currency",
            //                caption: "Valor neto"
            //            }, {
            //                dataField: "VsValorVisita",
            //                dataType: "number",
            //                format: "currency",
            //                caption: "Valor visita"
            //            }, {
            //                dataField: "Observaciones"
            //            }],
            //    summary: {
            //        totalItems: [{
            //            column: "VsValorNeto",
            //            summaryType: "sum",
            //            valueFormat: "currency",
            //            displayFormat: "Suma: {0}"
            //        }, {
            //            column: "VsValorVisita",
            //            summaryType: "sum",
            //            valueFormat: "currency",
            //            displayFormat: "Suma: {0}"
            //            }],
            //        onInitialized: function (e) {
            //            $scope.objGrilla = e.component;
            //            console.log($scope.objGrilla);
            //        }
            //    }
            //};
        }, function (error) {
            console.log(error);
            alert('Error..');
        });
    }


})