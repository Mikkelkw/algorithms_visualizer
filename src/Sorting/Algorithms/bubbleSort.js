// Exports the bubble sort animation array
export function getBubbleSortAnimations(array) {
    const animations = []
    bubbleSort(array, animations)
    return animations
}
//Implementation of bubble sort
function bubbleSort(array, animations) {
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length - i - 1; j++) {
            if(array[j] > array[j + 1]) {
                animations.push([j, j + 1, 0])
                animations.push([j, array[j + 1], 2])
                animations.push([array[j], j + 1, 3])
                animations.push([j, j + 1, 1])
                let temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }
        } 
    }

    if(animations.length === 0) {
        for(let i = 0; i < array.length; i++) {
            for(let j = 0; j < array.length - i - 1; j++) {
                animations.push([j, j + 1, 0])
                animations.push([j, j + 1, 1])
            }
        }
    }
}