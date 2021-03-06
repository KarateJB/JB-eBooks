## Introduction

The explanation on `$q` in [AngularJS Document](https://docs.angularjs.org/api/ng/service/$q) :

> A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.


Okay, I think the ajax and async programs are few of the most difficult parts in front end.
The simple idea is that we have to keep the data source ready, and then use it.
However, the data source may come from database, http and etc.
How can we promise that the data is ready before starting to read it?


In this article, I will try to show the problem and how to use `$q`, `deferred` and `promise` to solve it.


## Implement

### Goals

I am going to create a DropDownList with dynamic options from database, through http get method.
So we will have an async method on the data source. To simplify the codes, I will use `$timeout` to simulate the http get method.

 

* HTML

```
<div ng-app="app" ng-controller="CustomerCtrl">
  <select ng-model="InCharge" ng-options="o.Title for o in CustomerOptions track by o.CustomerId" "></select></div>
```


### Failed Attempt

The following js will results in nothing in the DropDownList.
The problem is that in the main thread :

```
$scope.CustomerOptions = CustomerFactory.InitCustomerOptions();
```

The method of factory is not thread-safe. It can't promise you when the data will be took.

```
var app =
  angular.module('app', [])
  .factory('CustomerFactory', function ($q, $timeout) {

      var factory = {};

      factory.InitCustomerOptions = function () {
          var allOptions = [];

          $timeout(function () {

              //設定所有選項
              allOptions = [{
                  'CustomerId': '1',
                  'Title': 'JB'
              }, {
                  'CustomerId': '2',
                  'Title': 'Lily'
              }, {
                  'CustomerId': '3',
                  'Title': 'Leia'
              }, {
                  'CustomerId': '4',
                  'Title': 'Hachi'
              }, {
                  'CustomerId': '5',
                  'Title': 'Doogy'
              }];

              return allOptions;
          }, 3000);
      };

      return factory;
  })
  .controller('CustomerCtrl', function ($scope, $http, $q, CustomerFactory) {

      $scope.InCharge = {};

      //Initialize
      $scope.CustomerOptions = CustomerFactory.InitCustomerOptions();

  });
```



### Correct Attempt

Now we use `$q`, `deferred` and `promise` to make sure that the data source is ready before reading it in the main thread.

Modify `factory.InitCustomerOptions` :

```
var deferred = $q.defer();

$timeout(function() {  //Async method to get the data source
    //returnObject =  …
    deferred.resolve(returnObject);
};
return deferred.promise;
```

* JS

```
$scope.InCharge = {};

//Initialize
var promise = CustomerFactory.InitCustomerOptions();
promise.then(function (options) {
        $scope.CustomerOptions = options;
});
```

([See sample codes HERE](http://codepen.io/KarateJB/pen/zrBxrV))



## Reference
1. [AngularJS Document](https://docs.angularjs.org/api/ng/service/$q)

