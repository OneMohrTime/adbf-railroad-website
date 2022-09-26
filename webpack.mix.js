const mix = require('laravel-mix');
const dotenv = require('dotenv');
// const tailwindcss = require('tailwindcss');
require('mix-tailwindcss');

mix
    .disableSuccessNotifications()
    .js('web/app/themes/adbf-railroad/src/scripts/app.js', 'web/app/themes/adbf-railroad/js')
    .sass('web/app/themes/adbf-railroad/src/styles/app.scss', 'css')
    // .sass('web/app/themes/adbf-railroad/src/styles/objects/_header.scss', 'css')
    .sass('web/app/themes/adbf-railroad/src/styles/noscript.scss', 'css')
    // .postCss('web/app/themes/adbf-railroad/src/styles/app-tailwind.css', 'css')
    // .tailwind('./tailwind.config.js')
    .setPublicPath('web/app/themes/adbf-railroad')
    // .copyDirectory('src/images', 'public/assets/img')
    .options({
        processCssUrls: false,
    });

if (!mix.inProduction()) {
    dotenv.config({ path: './.env' });
    mix
        .sourceMaps()
        .browserSync({
            proxy: process.env.WP_HOME,
            files: [
                'web/app/themes/adbf-railroad/templates/*.twig',
                'web/app/themes/adbf-railroad/templates/**/*.twig',
                'web/app/themes/adbf-railroad/src/styles/*.css',
                'web/app/themes/adbf-railroad/src/styles/*.scss',
                'web/app/themes/adbf-railroad/src/scripts/*.js',
            ]
        });
}

if (mix.inProduction()) {
  mix
    .version()
}
