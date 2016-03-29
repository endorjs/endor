# endor.js: the simplest and fastest HTML5 presentation framework

We were tired of bloated HTML presentation frameworks relying upon many «obsolete»
JavaScript frameworks such as jQuery that can be easily replaced by the standard
[Web APIs](https://developer.mozilla.org/en-US/docs/Web/API).
We wanted to build something simpler and faster, taking into account the simplicity
of the HTML5 Web APIs and CSS3. With that objective in mind,
**endor.js** was born!

Its main characteristics are:

+ Use of the semantic structure from the HTML5 elements.
  No need to tag the presentation slides with the
  `class="slide"` attribute (see usage section).
+ Theme creation via structured [Sass](http://sass-lang.com/)
  variables.
+ Minimum set of external dependencies (at the moment, our
  framework depends only on [hightlight.js](https://highlightjs.org/)
  for code highlighting).
+ Fonts via [Google Fonts](https://www.google.com/fonts).

## Download

There are different ways to download endor.js:

+ From **npm**:

    ```console
    $ npm install [-g] endor.js
    ```

  You can find all what you need to start your presentation under the `dist`
  directory.
+ From [GitHub as a direct download](https://github.com/endorjs/endor/archive/master.zip).
+ Copy the structure of the [index_cdn.html](https://cdn.rawgit.com/endorjs/endor/0.5.0/dist/index_cdn.html)
  file, which links the corresponding dependencies from the CDN at [RawGit](https://rawgit.com/).

## Usage

Start with the following skeleton for your HTML5 presentation:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Presentation Title</title>
    <link rel="stylesheet" href="css/main.min.css" type="text/css">
    <link href="images/favicon.ico" type="image/x-icon" rel="shortcut icon">
    <script type="application/javascript" src="highlight/highlight.pack.js"></script>
</head>
<body>
    <article>
        <!-- -->
    </article>
    <script type="application/javascript" src="scripts/endor.min.js"></script>
    <script type="application/javascript">hljs.initHighlightingOnLoad();</script>
</body>
</html>
```

Then wrap your slides within the `article` element. Add within your
`article` a single `header` section, which will contain an `h1`
heading. That will be the front page of your presentation. All
the `section` elements within the `article` will be presented as
slides. Every `section` should contain an `h2` heading.

The footer section within the article contains the running footer for the
presentation, including the slides counter. Just replace the copyright
information with your data.

```html
<article>
    <header>
        <h1>Presentation Title</h1>
        <p>Bla</p>
    </header>
    <section>
        <h2>Slide #1</h2>
        <p>Bla</p>
    </section>
    <!-- -->
    <footer>
        <address>
            © 2016 endor.js
        </address>
        <div id="counter">
            Slide <span id="slide_counter"></span> of
            <span id="slides_total"></span>
        </div>
    </footer>
</article>
```

You can find more information at: [https://endorjs.github.io/](https://endorjs.github.io/).

## Code highlighting

The only external dependency of our project is the code
highlighting framework [hightlight.js](https://highlightjs.org/).
Of course, if you do not need this functionality, you can
remove it.

To highlight some code, just wrap it up in a `<pre><code>` section
with its corresponding class:

```html
<pre class="html"><code>&lt;!doctype html>
&lt;html lang=&quot;en&quot;>
&lt;head>
    &lt;meta charset=&quot;UTF-8&quot;>
    &lt;title>Title&lt;/title>
&lt;/head>
&lt;body>
    &lt;article>
        &lt;!-- ... -->
    &lt;/article>
&lt;/body>
&lt;/html></code></pre>
```

## Coming-up features

These are the features we are trying to implement in coming releases.

+ Overlay with the overview of the existing slides
  (table of contents) with the capability to select one
+ Configurable slide transitions
+ Implementation of mouse and touch events
+ Second screen presentation and speaker notes

## Browser compatibility

We are not seeking for compatibility with old browser versions, especially with
those from Microsoft Internet Explorer. The **endor.js** framework should work
with any recent release of a modern browser.

## License

**endor.js** is distributed under the [Apache License](./LICENSE).

For third-party dependencies integrated in our code, see the table below.

| Product | URL | License type |
| ------- | --- | ------------ |
| hightlight.js | https://highlightjs.org/ | BSD |
| Font Awesome | https://fortawesome.github.io/Font-Awesome/ | MIT |
| Open Sans (Google Font) | https://www.google.com/fonts/ | Apache License, version 2.0 |
| Source Code Pro (Google Font) | https://www.google.com/fonts/ | SIL Open Font License, 1.1 |
