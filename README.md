# UnNot [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[UnNot] removes `:not` selectors while preserving other selectors. This can be useful for outputting CSS for old browsers like Internet Explorer 8.

```css
/* before */

.a, .b:not(.c), d {
    color: red;
}

/* after */

.a, .d {
    color: red;
}
```

## Usage

Add [UnNot] to your build tool:

```bash
npm install postcss-unnot --save-dev
```

#### Node

```js
require('postcss-unnot')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [UnNot] as a PostCSS plugin:

```js
postcss([
    require('postcss-unnot')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [UnNot] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-unnot')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [UnNot] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-unnot')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

### Options

#### `method`

Type: `String`  
Default: `'remove'`

##### `remove`
Remove any selectors with `:not` functions.
```css
/* before */

.a, .b:not(.c), d {
    color: red;
}

/* after */

.a, .d {
    color: red;
}
```

##### `move`
Move any selectors with `:not` functions into a cloned rule.
```css
/* before */

.a, .b:not(.c), .d {}

/* after */

.b:not(.c) {
    color: red;
}

.a, .d {
    color: red;
}
```

##### `pseudo`
Remove only the `:not` functions from selectors.
```css
/* before */

.a, .b:not(.c), .d {
    color: red;
}

/* after */

.a, .b, .d {
    color: red;
}
```

##### `warn`
Warn when a `:not` function is used.

[ci]: https://travis-ci.org/jonathantneal/postcss-unnot
[ci-img]: https://travis-ci.org/jonathantneal/postcss-unnot.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[UnNot]: https://github.com/jonathantneal/postcss-unnot
