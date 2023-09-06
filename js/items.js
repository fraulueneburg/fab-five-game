let shapes = ['chair', 'bottle', 'book', 'ghost', 'mouse']
let colorsLight = ['red', 'green', 'blue', 'white', 'grey']
let colorsDark = ['pink', 'neongreen', 'cyan', 'yellow', 'purple']

function createColorsArr(arr) {
	return arr.map((colorName, index) => {
		let num = (index + 1).toString().padStart(2, '0')
		return {
			name: `color${num}`,
			alias: colorName,
			cssColor: `var(--item${num}-color)`,
		}
	})
}

function createItemsArray(shapesArr, colorsArr) {
	return shapesArr.map((shape, index) => {
		let num = (index + 1).toString().padStart(2, '0')
		return {
			name: `item${num}`,
			shape: shape,
			color: colorsArr[index],
			originalColor: colorsArr[index],
		}
	})
}

let colorsLightArr = createColorsArr(colorsLight)
let colorsDarkArr = createColorsArr(colorsDark)

let itemsLightArr = createItemsArray(shapes, colorsLightArr)
let itemsDarkArr = createItemsArray(shapes, colorsDarkArr)
