/******************************************************************
 *
 * Copyright (C) 2017 Philip Luk - All Rights Reserved
 *
 * Coursera John Hopkins University AngularJS Course 2017
 * https://github.com/jhu-ep-coursera/fullstack-course5
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 *
 ******************************************************************/

(function () { // IFFI to guard against local variables leaking into global scope
'use strict';  // guard against careless mistakes

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope']; // protect dependency injection from minification
function LunchCheckController($scope) {
  $scope.lunchListStr = "";
  $scope.message = "";
  $scope.msgColor = "#ccc";

  var dishDelimeter = ",";
  var msg_no_data   = "Please enter data first";
  var msg_good      = "Enjoy!";
  var msg_too_much  = "Too much!";
  var msg_err       = "Whoops. Something went wrong.";

  $scope.updateMessage = function () {
    var numDishes = getNumDishes ($scope.lunchListStr);
    
    if (numDishes == 0) {
      $scope.message = msg_no_data;
      $scope.msgColor = "red";
    }
    else if (numDishes <= 3) {
      $scope.message = msg_good;
      $scope.msgColor = "green";
    }
    else if (numDishes >  3) {
      $scope.message = msg_too_much;
      $scope.msgColor = "green";
    }
    else {
      $scope.message = msg_err;
    }
  }; /* END $scope.updateMessage() */

  function getNumDishes (list) {
    var numDishes = 0;
    var prunedList = pruneEmptyDishes(list);

    if (prunedList != "") {
      numDishes = prunedList.split(dishDelimeter).length;
    }
    console.log("DEBUG: numDishes:" + numDishes);
    return numDishes;
  } /* END getNumDishes() */
  
  function pruneEmptyDishes (list) {
    var dishListArray = list.split(dishDelimeter);
    var prunedList = "";
    var isFirstDish = true;

    for (var i=0; i<dishListArray.length; i++) {
      if (dishListArray[i] != "") {
        if (isFirstDish == true) isFirstDish = false;
        else                     prunedList += ",";
        prunedList += dishListArray[i];
        
      }
      // console.log("DEBUG: orig:"+list);
      // console.log("DEBUG: prun:"+prunedList);
    }
    return prunedList;
  } /* END pruneEmptyDishes() */

} /* END LunchCheckController() */

})();