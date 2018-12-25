const {injectBabelPlugin, getLoader} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.resolve.alias = {
        'react-native': 'react-native-web',
        'native-base' : 'native-base-web',
        'react/lib/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry',
        ...config.resolve.alias
    }

    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
        config);


    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#1DA57A" },
        javascriptEnabled: true,
    })(config, env);

    return config;
}