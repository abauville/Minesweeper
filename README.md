## To do

- flag and question: img -> fontawsome
- Implement winning end game condition


## How to run on development mode

Bundle with webpack (automatically rebuilds thanks to the `watch: true` config in `webpack.config.js`): 

```>>> ./node_modules/webpack/bin/webpack.js ./lib/index.js --output-filename=main.js --mode=development```

See [this tutorial](https://www.sitepoint.com/bundle-static-site-webpack/) to set up webpack.

Run a local server in another terminal: 
```>>> python3 -m http.server```

## Background & Objectives

We want to create a the classic game [Minesweeper](https://www.google.com/search?tbm=isch&q=minesweeper+windows) in our browser.

A boilerplate is provided to get you started, containing:

- `index.html`: a 2x2 grid for the game. Make it bigger if you like!
- `minseweeper.css`: contains classes that you can apply to your table cells (`td`) to display the relevant tile image. Here, we are using an svg file as the `background-image`. Then, we set the file size to 24 pixels (you can make it bigger or smaller if you want)
- `lib/minesweeper.js`: this is where you should put your code!

## Specs

Take some time to think of the rules of the game. How would you start?

- The boilerplate grid is 2x2, maybe you should make it bigger?
- What is behind each `unopened` tile? How do you store this information?
- What happens when we left-click on a tile? right-click?
- When do we win? When do we lose?

### Going further

If you are done with the basics, you could:

- Change the images
- Add a frame and a little yellow smiley at the top, which puts on sunglasses
  when the game is won, or which restarts a new game when clicked on.
- Add a timer
