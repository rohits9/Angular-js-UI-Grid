app.controller('mainCtrl', [ '$scope' ,'$log','$http','$window',function ($scope,$log,$http,$window ) {
 $http.get("https://api.myjson.com/bins/44c55").then(function(response) {$scope.names = response.data.employees;});
 $scope.rows = [{ field: 'EmployeeId' }, { field: 'EmployeeName' }, { field: 'Designation' }, { field: 'Project' }, { field: 'Location' }];
    $scope.gridOptions = { data: 'names', enableCellEdit: true ,enableGridMenu: true, enableRowSelection: true,  columnDefs: $scope.rows,enableFiltering: true,  enableSelectAll: true};
	$scope.columnDefs = [

     {name: 'EmployeeId'},
     {name: 'EmployeeName'},
	 {name: 'Designation'},
     {name: 'Project'},
	 {name: 'Location'}
   ];
	$scope.addNewItem=function(){
      $scope.names.push( { EmployeeId: 'Test add ', EmployeeName: 'Test add', Designation: 'Test add', Project: 'Test add', Location: 'Test add' });
    };
	$scope.removeItem=function(){
      $scope.names.pop( { EmployeeId: 'Test add ', EmployeeName: 'Test add', Designation: 'Test add', Project: 'Test add', Location: 'Test add' });
    };
	$scope.reset=function(){
		$window.location.reload();
	}
	$scope.deleteSelected = function(){
      angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
        $scope.names.splice($scope.names.lastIndexOf(data), 1);
      });
    }
	$scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        var msg = 'row selected ' + row.isSelected;
        $log.log(msg);
      });

      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        var msg = 'rows changed ' + rows.length;
        $log.log(msg);
      });
    };
	
}]);