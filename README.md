<img src="README_Thumbnail.png" alt="Preview of my portfolio website.">

# Source code for `lau.work`

This repository contains the source code for my own portfolio website, [lau.work](https://lau.work). This was a private repository for ~2 years, but I decided to make it public because why not.

## Design Background

Maintaining a portfolio is hard. No one has time for it, and yet you always want it to look fresh and new and exciting. With that in mind, I tried to follow some general design principles around that idea:
* Big, prominent artwork. As little text as possible.
* Accessible
* Easy to iterate and upload new things.
* Overall simplicity. Less is more (as cliché as it sounds).
* Curated work, not _in-your-face-here's-all-I've-ever-done_.
* Powered by randomization, the portfolio should feel alive even if there's nothing new for a while.

## Features

### Work Randomization
The main feature of my portfolio website is work randomization. Specifically, each session gets a "seed", which then determins the order of all my portfolio items using a [Linear Congruential Generator Algorithm](https://en.wikipedia.org/wiki/Linear_congruential_generator), all within a fixed set of featured and non-featured work items (following my own "Curated work" principle). In practice, this ensures that every time someone visits my portfolio it feels like there's new stuff, or something's changed – without me doing anything.

### Artwork Randomization
Project artworks are also randomized each time you visit, although they're not tied to any fancy algorithm because I didn't have time to build that. This features also serves the general purpose of the portfolio feeling _alive_.

### Bézier Curves
This one is my personal favorite. Apart from a few exceptions, most border-radiuses on this website use bézier curves (aka. squircles) using [a technique](https://github.com/laurasandoval/lau-portfolio/blob/26bd4f53fbdd533508bf3a7f33e022003ec742de/src/Components/ProjectThumbnail/index.scss#L48) I developed along with my friend [Matías](https://github.com/matmartinez), which basically consists of a combination of [9-slice scaling](https://en.wikipedia.org/wiki/9-slice_scaling) and [image masking](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image) using a base SVG and three lines of vanilla CSS. It's wonderful. A dream come true.

### Cute Animations
Try hitting the search bar. Try again on mobile. Go to the "About" page. Try opening the site on your phone and hitting the three lines. Cute, I hope!

***

## Contributing
Consider changing something here as changing something in someone else's house. If you feel strongly about it, sure, send me a pull request. But it'll still be my house so I don't promise I'll ever review it or merge it. Thanks though.

## Permissions and Stuff
Please don't use any of this code for any type of commercial or malicious purposes. Thanks :)

## Boring, Technical Stuff

This is literally stuff that came baked-in on this README file after I ran [Create React App](https://github.com/facebook/create-react-app) so there you go.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.