var path = require('path');
const SpritePlugin = require('svg-sprite-loader/plugin');

module.exports = (env, argv) => {

  const source = [
    'editor.js',
    'core.js',
    'blots',
    //'formats',
    'modules',
    'themes',
    'ui',
  ].map(file => {
    return path.resolve(__dirname, '..', file);
  });

  const jsRules = {
    test: /\.js$/,
    include: source,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [[
            '@babel/preset-env',
            {
              targets: {
                browsers: [
                  'last 2 Chrome major versions',
                  'last 2 Firefox major versions',
                  'last 2 Safari major versions',
                  'last 2 Edge major versions',
                  'last 2 iOS major versions',
                  'last 2 ChromeAndroid major versions',
                ]
              }
            }
          ]],
          cacheDirectory: true,
          cacheCompression: false
        }
      }
    ]
  };

  const tsRules = {
    test: /\.ts$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            declaration: false,
            module: 'es6',
            sourceMap: argv.mode === 'development',
            target: 'es6'
          },
          transpileOnly: false
        }
      }
    ]
  };

  const svgRules = {
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          esModule: false,
          runtimeGenerator: require.resolve('./svg-extracting-runtime-generator.js')
        }
      }, 
      {
        loader: 'svgo-loader',
        options: {
          plugins: [{
            removeAttrs: { attrs: '(fill|class)'},
            removeViewBox: false
          }]
        }
      }
    ]
  };

  return {
    entry: {
      'bootstrap-quill': ['./bootstrap-quill.js'],
      'bootstrap-quill.core': ['./core.js'],
    },
    output: {
      filename: '[name].js',
      library: 'Quill',
      libraryExport: 'default',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, '../dist/'),
    },
    target: "web",
    resolve: {
      alias: {
        'parchment': path.resolve(__dirname + '/..', 'node_modules/parchment/src/parchment.ts'),
        'quill$': path.resolve(__dirname + '/..', 'node_modules/quill/core.js'),
      },
      extensions: ['.js', '.ts', '.svg']
    },
    module: {
      rules: [jsRules, tsRules, svgRules]
    },
    devtool: argv.mode === 'development' ? "cheap-source-map" : false,
    plugins: [
      new SpritePlugin({
        plainSprite: false,
        spriteAttrs: {
          width: 0,
          height: 0,
          style: "position: absolute;"
        }
      })
    ]
  }

}