# Adrian & Blissfield Railroad

## Requirements
- WordPress 6.1
- Timber 1.21
- PHP 8.1
- Composer 2.5
- Node 16.x
- NPM 9.3

### Additional Technologies

- [Timber Templating](https://timber.github.io/docs/)
- [Advanced Custom Fields](https://advancecustomfields.com/)
- [Roots Bedrock](https://roots.io/bedrock/)

## Sites

### Server Info

Servers provisioned and maintained by ServerPilot. Manage them here: [https://manage.serverpilot.io/servers](https://manage.serverpilot.io/servers)

#### DigitalOcean
>**Reserved IP:** 161.35.252.107<br>
>**Droplet:** adbf.do<br>
>**Spaces Bucket:** adbf<br>
>**Domain:** https://abrailroad.com

#### ServerPilot
>**Paths:** ~/apps/adbf-prod/<br>
>**Databases:** adbf_production

#### Buddy
| Production | Sync Assets |
|[![buddy pipeline](https://app.buddy.works/onemohrtime-1/adbf-railroad-website/pipelines/pipeline/431720/badge.svg?token=6bcffe8f4e35d4d2c9e61aa4f7caf1b910bebe86fd6b7a052347cd830845cd5f "buddy pipeline")](https://app.buddy.works/onemohrtime-1/adbf-railroad-website/pipelines/pipeline/431720)|-|
|`x`|`x`|

### NPM Packages

| Package Name | `--save-dev`? | Description |
|-|-|-|
|`autoprefixer`| | Write your CSS rules without vendor prefixes |
|`browser-sync`| &check; | Keep multiple browsers & devices in sync when building websites |
|`bourbon`| | A lightweight sass tool set |
|`dotenv`| &check; | zero-dependency module that loads environment variables from a `.env` file into `process.env` |
|`include-media`| | Simple, elegant and maintainable media queries in Sass |
|`laravel-mix`| &check; | Clean, fluent API for defining basic webpack build steps for your applications |
|`locomotive-scroll`| | Detection of elements in viewport & smooth scrolling with parallax effects |
|`modujs`| | Dead simple modular JavaScript framework for ES modules |
|`modularload`| | Dead simple page transitions and lazy loading |
|`normlize.css`| | A modern alternative to CSS resets |
|`sass`| &check; | Provides a command-line sass executable and a Node.js API |
|`sass-loader`| &check; | Loads a Sass/SCSS file and compiles it to CSS |

### Composer Packages

| Package Name | `require-dev`? | Description |
|-|-|-|
|`craftcms/redactor`| | Edit rich text content in Craft CMS |
|`ether/logs`| | Access logs from the CP |
|`presseddigital/linkit`| | One link field to rule them all |
|`misterbk/mix`| | Helper plugin for Laravel Mix in Craft CMS templates |
|`verbb/kint`| &check; | Craft CMS plugin for Kint debugging |
|`mmikkel/cp-field-inspect`| &check; | Inspect field handles and easily edit field and element source settings |
|`nystudio107/craft-imageoptimize`| | Automatically create & optimize responsive image transforms, using either native Craft transforms or a service like imgix, with zero template changes |
|`nystudio107/craft-minify`| | A simple plugin that allows you to minify blocks of HTML, CSS, and JS inline in Craft CMS templates |
|`nystudio107/craft-retour`| | Retour allows you to intelligently redirect legacy URLs, so that you don't lose SEO value when rebuilding & restructuring a website |
|`nystudio107/craft-seomatic`| | SEOmatic facilitates modern SEO best practices & implementation for Craft CMS 3 |
|`nystudio107/craft-typogrify`| | Typogrify prettifies your web typography by preventing ugly quotes and "widows" and more |
|`putyourlightson/craft-blitz`| | Intelligent static page caching for creating lightning-fast sites |
|`putyourlightson/craft-blitz-recommendations`| | Adds a utility that provides templating performance recommendations |
|`solspace/craft-freeform`| | The most reliable, intuitive and powerful form builder for Craft |
|`spicyweb/craft-neo`| | A Matrix-like field type that uses existing fields |
|`vaersaagod/dospaces`| | DigitalOcean Spaces integration for Craft CMS |
|`verbb/expanded-singles`| | A simple plugin for Craft CMS that alters the Entries Index sidebar to list all Singles, rather than grouping them under a "Singles" link |
|`verbb/navigation`| | A Craft CMS plugin to create navigation menus for your site |
|`vlucas/phpdotenv`| | Loads environment variables from `.env` to `getenv()`, `$_ENV` and `$_SERVER` automagically |

### Add site to DDEV
```zsh
cd ~/path/to/folder/
git clone git@github.com:mightyinthemidwest/adbf-railroad-website.git
cd adbf-railroad-website
ddev configure
ddev start
```

## Questions

`FAQ to be added here as necessary`
