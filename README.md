# Bootstrap Quill Editor

A rich text editor based on [Quill](https://github.com/quilljs/quill) with custom Theme, Modules and Parchments. See [Adding Quill to Your Build Pipeline](https://quilljs.com/guides/adding-quill-to-your-build-pipeline) for a detailed guide.

Themes and UI are customized to use [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/) and [Material Design Icons (MDI)](https://materialdesignicons.com/).

Using [Yarn](https://yarnpkg.com/), [Webpack](https://webpack.js.org/) and [SCSS](https://sass-lang.com/)

*Note: Built on Quill 2.0*

## Usage
Install using yarn or npm and use it the same way as [Quill](https://github.com/quilljs/quill)

```bash
yarn add bootstrap-quill
```

See [demo](demo/index.html) for configuration example.

## Modules and extensions
The editor has extensions for @mentions, #hashtags and autolinks as well as integrated form support

- [quill-form](https://github.com/weavy/quill-form)
- [quill-autoformat](https://github.com/weavy/quill-autoformat)

## Build

```bash
yarn
yarn build
```

### License

MIT
