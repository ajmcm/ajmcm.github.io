# Adam McMillan’s website

A plain static HTML website. No build step, dependencies, or JavaScript. Small inline CSS rules set the font to Georgia and wrap text around the photo on larger screens; everything else uses browser defaults.

Edit `index.html` for the homepage. The portrait lives in `assets/adam-profile.jpg`
and the current CV download is `docs/cv_latest.pdf`.

Preview locally from the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Stop the server with Ctrl-C.

GitHub Pages can serve the repository root directly. `.nojekyll` disables Jekyll
processing. The `/about/` and `/about.html` pages forward to the homepage;
`/cv/` forwards to the current CV PDF.

This branch is a local redesign; deployment still follows the repository’s
GitHub Pages branch settings.
