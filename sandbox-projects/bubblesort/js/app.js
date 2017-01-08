/******************************************************************
 *
 * Copyright (C) 2017 Philip Luk - All Rights Reserved
 *
 * Simple little sort implementation
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 *
 ******************************************************************/

(function () { // IFFI to guard against local variables leaking into global scope
'use strict';  // guard against careless mistakes

angular.module('ListSorter', [])
.controller('ListSorterController', ListSorterController);

ListSorterController.$inject = ['$scope']; // protect dependency injection from minification
function ListSorterController($scope) {
  $scope.inputListStr = "";
  $scope.message      = "";
  $scope.msgColor     = "#ccc";

  var elementDelimeter = ",";
  var msg_no_data   = "Please enter data first";
  var msg_err       = "Whoops. Something went wrong.";

  $scope.updateMessage = function () {
    
    var prunedList  = pruneEmptyElements($scope.inputListStr);
    
    if (prunedList == "") {
      $scope.msgColor = "red";
      $scope.message  = msg_no_data;
    }
    else {
      var numElements = prunedList.split(elementDelimeter).length;
      var sortedList  = bubbleSortElements(prunedList);
      $scope.msgColor = "#ccc";
      $scope.message  = numElements+" ITEMS SORTED: " + sortedList;
    }
    
  }; /* END $scope.updateMessage() */

  function pruneEmptyElements (list) {
  /******************************************************************
   * remove empty list elements
   ******************************************************************/
    var elementListArray = list.split(elementDelimeter);
    var prunedList = "";

    for (var i=0; i<elementListArray.length; i++) {
      if (elementListArray[i] != "") {
        prunedList = addToList(prunedList, elementListArray[i], elementDelimeter, i==0);
      }  
    }
    // console.log("DEBUG: orig:"+list);
    // console.log("DEBUG: prun:"+prunedList);

    return prunedList;
  } /* END pruneEmptyElements() */

  function bubbleSortElements (list) {
  /******************************************************************
   * bubble sort algorithm
   ******************************************************************/

    var origList = list.split(elementDelimeter);
    var len = origList.length;

    console.log("DEBUG: working list: "+origList);
    for (var i=0; i<len; i++) {
      for (var j=0; j<len-1; j++) {
         console.log ("DEBUG: sorting origList["+j+"] "+origList[j]);
         if (origList[j] > origList[j+1]) {
           // if  element is larger than neighbor.. swap! (i.e. bubble to the right)
          console.log("DEBUG:   (swapping)"+origList[j]+" is gt "+origList[j+1]);
          console.log("DEBUG:   pre-working list: "+origList);
          origList = swapArrayElements(origList,j,j+1);
          console.log("DEBUG:   post-working list: "+origList);
        }
        else {
          console.log("DEBUG:   (no op)"+origList[j]+" is lte "+origList[j+1]);  
        }
      }
    }
      
    return origList;
  } /* END bubbleSortElements() */

  function addToList (list, elem, delim, isFirstElement) {
    var newList = list;
    if (isFirstElement == false) newList += delim;         
    newList += elem;
    return newList;
  } /* END addToList() */  

  function swapArrayElements (array, index1, index2) {
    var temp      = array[index2];
    array[index2] = array[index1];
    array[index1] = temp;
    return array;
  } /* END swapArrayElements() */  


} /* END LunchCheckController() */

})();