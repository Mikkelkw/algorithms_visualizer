//exports mergesort
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  //function we use to do mergesort
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  //merge sort function
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
     
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  //exports quick sort
  export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }

  //method we call for quicksort
  function quickSortHelper(arr,low,high,animations) 
    { 
        if (low < high) 
        { 

            let pi = partition(arr, low, high,animations); 
            quickSortHelper(arr, low, pi-1, animations); 
            quickSortHelper(arr, pi+1, high, animations); 
        } 
    }
    
    function partition( arr,  low, high,animations) 
    { 
        let pivot = arr[high];  
        let i = (low-1); 
        for (let j=low; j<high; j++) 
        { 
            animations.push([j,high,0,0]);
            animations.push([j,high,0,1]);
            if (arr[j] < pivot) 
            { 
                i++; 
                let temp = arr[i]; 
                arr[i] = arr[j]; 
                arr[j] = temp; 
                animations.push([i,arr[i],1,0]);
                animations.push([j,arr[j],1,0]);
            } 
        } 
        let temp = arr[i+1]; 
        arr[i+1] = arr[high]; 
        arr[high] = temp; 
        animations.push([i+1,arr[i+1],1,0]);
        animations.push([high,arr[high],1,0]);
        return i+1; 
    }