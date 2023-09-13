let shapes = ['chair', 'bottle', 'book', 'ghost', 'mouse']

let colorsArr = shapes.map((shape, index) => {
	let num = (index + 1).toString().padStart(2, '0')
	return {
		alias: `color${num}`,
		cssColor: `var(--item${num}-color)`,
	}
})

function createItemsArray(shapesArray, colorsArray) {
	return shapesArray.map((shape, index) => {
		let num = (index + 1).toString().padStart(2, '0')
		return {
			name: `item${num}`,
			shape: shape,
			color: colorsArray[index],
			originalColor: colorsArray[index],
		}
	})
}

let itemsLightArr = createItemsArray(shapes, colorsArr)
let itemsDarkArr = createItemsArray(shapes, colorsArr)
