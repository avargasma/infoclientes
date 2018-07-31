app.controller("CtrlRptMovXcliente", function ($scope, MovsXclientService) {
    
    //$scope.gridOptions = {
    //    dataSource: employees,
    //    keyExpr: "ClNIt",
    //    "export": {
    //        enabled: true,
    //        fileName: "Employees",
    //        allowExportSelectedData: true
    //    },
    //    groupPanel: {
    //        visible: true
    //    },
    //    columns: [{
    //        dataField: "ClNIt",
    //        caption: "Nit",
    //        width: 70
    //    },
    //    { 
    //        dataField: "ClNombresApe",
    //        caption: "Nombre completo"
    //    },
    //    { 
    //        dataField: "ClDireccion",
    //        caption: "Dirección"
    //    },
    //    { 
    //        dataField: "ClTel",
    //        caption: "Teléfono"
    //    },
    //    { 
    //        dataField: "MnIdMunicipio",
    //        caption: "Municipio"
    //    },
    //    { 
    //        dataField: "ClCupo",
    //        caption: "Cupo",
    //        dataType: 'number'
    //    },
    //    { 
    //        dataField: "ClSaldoCupo",
    //        caption: "Saldo",
    //        dataType: 'number'
    //    },
    //    { 
    //        dataField: "ClPorceVisitas",
    //        caption: "% visitas",
    //        dataType: 'number'
    //    }
    //    ],
    //    masterDetail: {
    //        enabled: true,
    //        template: "detail"
    //    }
    //};
    $scope.mostrarBase = true;
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
            $scope.dataGridOptions = {
                dataSource: $scope.movimientos,
                columns: [
                        {
                            dataField: "ClNombresApe",
                            caption: "Ciente"
                        },{
                            dataField: "NomVendedor",
                            caption: "Vendedor"
                        },{
                            dataField: "VsFeha",
                            dataType: "date",
                            caption: "Fecha visita"
                        }, {
                            dataField: "VsValorNeto",
                            dataType: "number",
                            format: "currency",
                            caption: "Valor neto"
                        }, {
                            dataField: "VsValorVisita",
                            dataType: "number",
                            format: "currency",
                            caption: "Valor visita"
                        }, {
                            dataField: "Observaciones"
                        }],
                summary: {
                    totalItems: [{
                        column: "VsValorNeto",
                        summaryType: "sum",
                        valueFormat: "currency",
                        displayFormat: "Suma: {0}"
                    }, {
                        column: "VsValorVisita",
                        summaryType: "sum",
                        valueFormat: "currency",
                        displayFormat: "Suma: {0}"
                    }]
                }
            };
            $scope.mostrarBase = false;
        }, function (error) {
            console.log(error);
            alert('Error..');
        });
    }


})