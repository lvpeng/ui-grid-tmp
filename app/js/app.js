var app = angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit']);

app.controller('tableCtrl', ['$scope', '$q', '$interval','$timeout',function ($scope, $q, $interval,$timeout) {
//   $scope.columnDefs = [
//     {name: '银行名称'},
//     {name: '金额'}
//   ];
//   $scope.myData = [
//     {
//         "银行名称": "中国银行",
//         "金额": "10000"
//     },
//     {
//         "银行名称": "中国建设银行",
//         "金额": "20000"
//     },
//     {
//         "银行名称": "招商银行",
//         "金额": "30000"
//     },
// ];

  // $scope.gridOptions = {
  //   enableCellEditOnFocus: true,
  //   enableSorting: true,
  //   columnDefs: [
  //     { name: '银行名称', enableSorting: false, enableCellEdit: true },
  //     { name: '金额' ,enableCellEdit: true}
  //   ],
  //   data: $scope.myData
  // };
  $scope.showIcon = false;
  $scope.showIcon1 = false;
  $scope.hover = function(){
     $scope.showIcon = !$scope.showIcon;
  };

  // $scope.gridOptions.columnDefs = [
  //   { name: 'id', enableCellEdit: false },
  //   { name: 'name', displayName: 'Name (editable)' },
  //   { name: 'gender' },
  //   { name: 'age', displayName: 'Age' , type: 'number'},
  //   { name: 'registered', displayName: 'Registered' , type: 'date', cellFilter: 'date:"yyyy-MM-dd"'},
  //   { name: 'address', displayName: 'Address', type: 'object', cellFilter: 'address'},
  //   { name: 'address.city', displayName: 'Address (even rows editable)',
  //        cellEditableCondition: function($scope){
  //        return $scope.rowRenderIndex%2
  //        }
  //   },
  //   { name: 'isActive', displayName: 'Active', type: 'boolean'}
  // ];
  $scope.gridOptions = {
    columnDefs: [
      // { name: 'id', enableCellEdit: false },
      { name: 'name', displayName: '银行名称' },
      { name: 'amount', displayName: '金额', type: 'number'}
    ]
  };

  $scope.addNewBank = function(){
    $scope.gridOptions.data.unshift({});
  };
  $scope.delBank = function(){
    $scope.gridOptions.data.pop();
  };
  $scope.save = function() {
    $scope.gridApi.rowEdit.flushDirtyRows( $scope.gridApi.grid );
  };

  $scope.saveRow = function( rowEntity ) {
    // create a fake promise - normally you'd use the promise returned by $http or $resource
    var promise = $q.defer();
    $scope.gridApi.rowEdit.setSavePromise( $scope.gridApi.grid, rowEntity, promise.promise );

    // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
    // $interval( function() {
    //   if (rowEntity.gender === 'male' ){
    //     promise.reject();
    //   } else {
    //     promise.resolve();
    //   }
    // }, 3000, 1);
  };

  $scope.gridOptions.onRegisterApi = function(gridApi){
    //set gridApi on scope
    $scope.gridApi = gridApi;
    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    //gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            //Do your REST call here via $hhtp.get or $http.post
            //This alert just shows which info about the edit is available
            //alert('Column: ' + colDef.name + ' ID: ' + rowEntity.id + ' Name: ' + rowEntity.name + ' Age: ' + rowEntity.age)
    //      });
  };
  $scope.showGrid = true;
  $scope.toggleOpen = function(){
    $scope.showGrid = !$scope.showGrid;
  };
}]);
