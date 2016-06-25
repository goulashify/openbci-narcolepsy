var settings = {
  development: require('./development.json'),
  production:  require('./production.json')
}

exports = module.exports = function configuration() {  
  var env = process.env.NODE_ENV || 'development';

  if(!settings.hasOwnProperty(env)) throw new Error('Configuration not found.');
  
  return settings[env];
}

exports['@singleton'] = true;