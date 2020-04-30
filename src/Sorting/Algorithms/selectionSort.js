//Exports the selection sort animation
export function getSelectionSortAnimations(array) {
    const animations = []
    selectionSort(array, animations)
    return animations
}
//implementation of selection sort
function selectionSort(array, animations) {
    for(let i = 0; i < array.length; i++) {
        let minimum = i
        for(let j = i + 1; j < array.length; j++) {
            if(array[j] < array[minimum]) {
                minimum = j
            }
            animations.push([i, j, 0])
            animations.push([i, j, 1])
        }
        animations.push([i, array[minimum], 2])
        animations.push([array[i], minimum, 3])
        let temp = array[i]
        array[i] = array[minimum]
        array[minimum] = temp 
    }
}