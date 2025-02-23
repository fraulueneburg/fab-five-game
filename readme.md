![image](https://github.com/fraulueneburg/fab-five-game/assets/122455194/996cf23b-297c-4714-8c0c-77ab65ddf475)

# The Fab Five Game

### <span aria-hidden="true">👉&nbsp;&nbsp;</span>Play it at&nbsp;&nbsp;[fraulueneburg.github.io/fab-five-game/](https://fraulueneburg.github.io/fab-five-game/)

<br />

## Introduction

This is a project that I made at Ironhack as part of their 2023 Web Development Bootcamp. It is a logic game, based on a German card game. I’m especially proud of the fact that I built it entirely in Javascript, HTML and CSS – no canvas elements here.

I used one inline svg for each shapes, then cloned them via the `<use>` element. This makes it easy to change the shapes, if needed. The colours are equally easy to adjust via CSS custom properties. The game comes with dark and light mode and scales to mobile, of course.

## Features

- <span aria-hidden="true">😎&nbsp;&nbsp; </span>nice simple gaming fun without signup
- <span aria-hidden="true">🌈&nbsp;&nbsp; </span>clever colour switching via SVGs and CSS custom properties
- <span aria-hidden="true">⏰&nbsp;&nbsp; </span>time adapts when you’re fast
- <span aria-hidden="true">🌄&nbsp;&nbsp; </span>random cheesy motivational quote when you’ve lost a round
- <span aria-hidden="true">🌙&nbsp;&nbsp; </span>light and dark mode

## Demo

<span aria-hidden="true">👉&nbsp;&nbsp;</span>Play it at&nbsp;&nbsp;[fraulueneburg.github.io/fab-five-game/](https://fraulueneburg.github.io/fab-five-game/) (no sign-up required)

---

## Content

1. [Setup](#1-setup)
2. [Customization](#2-customization)
3. [Game Rules](#3-game-rules)
4. [About me](#4-about-me)
5. [Contact](#5-like-this-project-follow-my-progress-and-lets-connect)

## 1. Setup

If you’d like to view my game in your browser:

- `git clone https://github.com/fraulueneburg/fab-five-game.git` in your terminal
- `cd fab-five-game`
- open `index.html`
- or, you know, just visit [the game demo](https://fraulueneburg.github.io/fab-five-game/) and start the gaming fun right away 🚀

## 2. Customization

### Item Colours

To customize the item colours, just change the CSS custom properties inside `css/items.css`.

### Shapes

The shapes are embedded as inline svgs in `index.html`. The wrapper code for all svgs stays the same:

```html
<svg display="none" width="0" height="0" version="1.1" role="none" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<!-- CODE FOR ALL SVGS -->
	</defs>
</svg>
```

Inside that wrapper code, paste the inline svg code of your items and wrap each one with the following `<symbol>` tag. Adjust the number inside the `id` attribute accordingly (`item01`, `item02` etc.). Make sure your svg has a square artboard so all items will be displayed correctly.

```html
<symbol id="item01" focusable="false" role="none" viewBox="0 0 160 160">
	<!-- svg code of first item -->
</symbol>
```

Put together, it looks like this:

```html
<svg display="none" width="0" height="0" version="1.1" role="none" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<symbol id="item01" focusable="false" role="none" viewBox="0 0 160 160">
			<!-- svg code of first item -->
		</symbol>
		<symbol id="item02" focusable="false" role="none" viewBox="0 0 160 160">
			<!-- svg code of second item -->
		</symbol>
		<!-- ... etc ... --->
	</defs>
</svg>
```

## 3. Game Rules

The rules are explained on the startscreen of the game as well as throughout the game.

## 4. About me

I’m a Full Stack Web Developer and UI/UX Designer currently living in Hamburg, Germany.  
Usability is a top priority in my work and I am also strongly advocating for (and keep learning about) web accessibility.

## 5. Like this project? <br />Follow my progress and let’s connect:

<a href="https://linkedin.com/in/fraulueneburg" target="_blank">
<img alt="LinkedIn" src="https://img.shields.io/badge/-linkedin-1572B6?&style=for-the-badge&logo=css3&logoColor=white" />
</a>
