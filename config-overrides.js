module.exports = function override(config, env) {
  //do stuff with the webpack config...
  console.log(config.resolve);
  config.resolve.alias = {
    'react-native': 'react-native-web',
		'native-base' : 'native-base-web',
		'react/lib/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry',
    ...config.resolve.alias
  }
  return config;
}