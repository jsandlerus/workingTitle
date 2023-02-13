module.exports = {
    plugins: {
        'cssnano':{
            preset: 'default',
        },
        'postcss-preset-env':{
        stage: 0,
        features: {
          'nesting-rules': true
        }
      }
    }
  };
