
angular.module('searchFormModule', []).controller('searchForm', ['$scope','$rootScope','$http', function($scope,$rootScope,$http){
 $scope.passengerlimit = [1,2,3,5,6,7,8,9];
 $scope.tabs = [{
            title: 'One-way'
        }, {
            title: ' Return'
   }];
  $scope.returnonly = false;
   $scope.onClickTab = function (tab, evt) {
       $('.serchContainer ul li ').removeClass('active');
       $(evt.target).addClass('active');
        if(tab.title.trim()=='Return'){
            $scope.returnonly= true;
        }else{
            $scope.returnonly = false
        }
       }
  
       var dataObj = {
          "request": {
            
          }
        }
      $scope.loader =false;  
      $scope.searchresult = false  
      $scope.formData = {};            
      $scope.search = function(){
        $scope.loader = true;
         dataObj.request['slice'] = [];
         if( $scope.formData.startPlace) {
            dataObj.request['slice'].push({"origin": $scope.formData.startPlace ,
              "destination": $scope.formData.endPlace,
              'date': $scope.formData.depart.toJSON().slice(0,10).split('-').join('-') 
             })
         }   
         if($scope.formData.return) {
             dataObj.request['slice'].push({"origin": $scope.formData.endPlace ,
              "destination": $scope.formData.startPlace,
              'date': $scope.formData.return.toJSON().slice(0,10).split('-').join('-') 
             })
         }       

        
         dataObj.request['passengers'] = {
              "adultCount": $scope.formData.adult?$scope.formData.adult:null,
              "infantInSeatCount": $scope.formData.infant?$scope.formData.infant:null,
              "childCount": $scope.formData.child?$scope.formData.child:null
         }
         dataObj.request['solutions'] = 20;
         dataObj.request['refundable'] = false;    
         if($scope.searchForm.$valid){
            $http({
                    method : 'POST',
                    url : "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAvLMxCBnpSuvovOiz_VlR5caFtKIZgbHU",
                    data : dataObj
                    }).then(function successCallback(response) {
                     if(response){
                        $scope.loader = false;
                        if(response.data.trips.tripOption.length){
                            $scope.aircraft = response.data.trips.data.aircraft;
                            $scope.airport = response.data.trips.data.airport;
                            $scope.tripsoption = response.data.trips.tripOption;
                            $scope.searchresult = true;
                         }else{
                            alert('Please enter valid input');
                             $scope.searchresult = false;
                            $scope.loader = false;   
                         }
                     }   
                        
               },function errorCallback(response) {
                   alert('Access Not Configured use valid key with www.googleapis.com/qpxExpress/v1/trips/search ');
                    $scope.searchresult = false ;
                     $scope.loader = false;  
                });
         }else{
             $scope.loader = false;  
            alert('Please enter valid input');
         }
      }

}]);