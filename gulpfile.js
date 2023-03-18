const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const del = require("del");
const eslint = require("gulp-eslint");
const nodemon = require("gulp-nodemon");
const postCSS = require("gulp-postcss");
const rollup = require("gulp-better-rollup");
const rollupTS = require("@rollup/plugin-typescript");
const SCSS = require("gulp-sass")(require("sass"));
const sync = browserSync.create();
const TS = require("gulp-typescript");
const uglifyCSS = require("gulp-clean-css");
const uglifyHTML = require("gulp-htmlmin");
const uglifyJS = require("gulp-terser");

const target = "dist";

function clean() {
	return del("dist");
}

function indexHTML() {
	return src("src/index.html")
		.pipe(uglifyHTML({
			caseSensitive: true,
			decodeEntities: true,
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe(dest(target))
		.pipe(connect.reload());
}

function indexCSS() {
	return src("src/styles/index.scss")
		.pipe(SCSS())
		.pipe(postCSS())
		.pipe(uglifyCSS({ compatibility: "ie8" }))
		.pipe(dest(`${target}/styles`))
		.pipe(connect.reload());
}

function indexJS() {
	return src("src/scripts/**/*.ts")
		.pipe(eslint())
		.pipe(eslint.format())
		/* .pipe(TS({
			target: "ES2017",
			module: "ESNext"
		})) */
		.pipe(rollup({ plugins: [rollupTS()] }, { format: "iife" }))
		.pipe(uglifyJS())
		.pipe(concat("index.js"))
		.pipe(dest(`${target}/scripts`))
		.pipe(connect.reload());
}

function fonts() {
	return src("src/assets/*.ttf")
		.pipe(dest(`${target}/assets`))
		.pipe(connect.reload());
}

function images() {
	return src("src/assets/*.png")
		.pipe(dest(`${target}/assets`))
		.pipe(connect.reload());
}

function lint() {
	return TS.createProject("tsconfig.json").src()
		.pipe(eslint())
		.pipe(eslint.format());
}

function server(cb) {
	sync.init(null, {
		proxy: "http://localhost:5000",
		open: true,
		files: ["dist/"],
		port: 3000,
		notify: false
	});
	cb();
}

function net(cb) {
	var started = false;
	return nodemon({
		script: "server.js",
		env: { "NODE_ENV": "development" }
	}).on("start", function() {
		if (!started) {
			cb();
			started = true;
		}
	});
}

function watchers(cb) {
	watch("src/index.html", indexHTML);
	watch("src/styles/index.scss", indexCSS);
	watch("src/scripts/**/*.ts", indexJS);
	watch("src/assets/*.ttf", fonts);
	watch("src/assets/*.png", images);
	cb();
}

const build = series(
	clean,
	parallel(
		indexHTML,
		indexCSS,
		indexJS,
		fonts,
		images,
		net
	)
);

const start = series(
	build,
	parallel(
		server,
		watchers
	)
);

exports.default = build;
exports.start = start;
exports.lint = lint;
