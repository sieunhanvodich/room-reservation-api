var app = require('./app');
var port = require('./config/config').host.port;

app.listen(port, () => console.log('App running on port ' + port));