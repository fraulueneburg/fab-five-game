// ----- COLORS AND ITEMS -----

let shapesArr = ['chair', 'bottle', 'book', 'ghost', 'mouse']
// let colorsLightArr = ['red', 'green', 'blue', 'white', 'grey']
// let colorsDarkArr = ['pink', 'neongreen', 'cyan', 'yellow', 'purple']

// first set colors
let colorsLightArr = [
	{
		name: 'color01',
		alias: 'red',
		cssColor: 'var(--item01-color)',
	},
	{
		name: 'color02',
		alias: 'green',
		cssColor: 'var(--item02-color)',
	},
	{
		name: 'color03',
		alias: 'blue',
		cssColor: 'var(--item03-color)',
	},
	{
		name: 'color04',
		alias: 'white',
		cssColor: 'var(--item04-color)',
	},
	{
		name: 'color05',
		alias: 'grey',
		cssColor: 'var(--item05-color)',
	},
]

// first set items
let itemsLightArr = [
	{
		name: 'item01',
		shape: 'chair',
		color: colorsLightArr[0],
		originalColor: colorsLightArr[0],
	},
	{
		name: 'item02',
		shape: 'bottle',
		color: colorsLightArr[1],
		originalColor: colorsLightArr[1],
	},
	{
		name: 'item03',
		shape: 'book',
		color: colorsLightArr[2],
		originalColor: colorsLightArr[2],
	},
	{
		name: 'item04',
		shape: 'ghost',
		color: colorsLightArr[3],
		originalColor: colorsLightArr[3],
	},
	{
		name: 'item05',
		shape: 'mouse',
		color: colorsLightArr[4],
		originalColor: colorsLightArr[4],
	},
]

// second set colors
let colorsDarkArr = [
	{
		name: 'color01',
		alias: 'pink',
		cssColor: 'var(--item01-color)',
	},
	{
		name: 'color02',
		alias: 'neongreen',
		cssColor: 'var(--item02-color)',
	},
	{
		name: 'color03',
		alias: 'cyan',
		cssColor: 'var(--item03-color)',
	},
	{
		name: 'color04',
		alias: 'yellow',
		cssColor: 'var(--item04-color)',
	},
	{
		name: 'color05',
		alias: 'purple',
		cssColor: 'var(--item05-color)',
	},
]

// second set items
let itemsDarkArr = [
	{
		name: 'item01',
		shape: 'chair',
		color: colorsDarkArr[0],
		originalColor: colorsDarkArr[0],
	},
	{
		name: 'item02',
		shape: 'bottle',
		color: colorsDarkArr[1],
		originalColor: colorsDarkArr[1],
	},
	{
		name: 'item03',
		shape: 'book',
		color: colorsDarkArr[2],
		originalColor: colorsDarkArr[2],
	},
	{
		name: 'item04',
		shape: 'ghost',
		color: colorsDarkArr[3],
		originalColor: colorsDarkArr[3],
	},
	{
		name: 'item05',
		shape: 'mouse',
		color: colorsDarkArr[4],
		originalColor: colorsDarkArr[4],
	},
]
