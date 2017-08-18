'use strict';

const usdocker = require('usdocker');

const SCRIPTNAME = 'mysql';

let config = usdocker.config(SCRIPTNAME);
let configGlobal = usdocker.configGlobal();

function getContainerDef() {

    let docker = usdocker.dockerRunWrapper(configGlobal);
    return docker
        .containerName(SCRIPTNAME + configGlobal.get('container-suffix'))
        .port(config.get('port'), 3306)
        .volume(config.get('folder'), '/var/lib/mysql')
        .volume(config.getUserDir('conf.d'), '/etc/mysql/conf.d')
        .volume(config.getUserDir('home'), '/root')
        .env('MYSQL_ROOT_PASSWORD', config.get('rootPassword'))
        .env('TZ', configGlobal.get('timezone'))
        .isDetached(true)
        .isRemove(true)
        .imageName(config.get('image'))
    ;
}

module.exports = {
    setup: function(callback)
    {
        config.setEmpty('image', 'mysql:5.7');
        config.setEmpty('folder', config.getDataDir());
        config.setEmpty('port', 3306);
        config.setEmpty('rootPassword', 'password');

        config.copyToUserDir(__dirname + '/mysql/conf.d');
        config.copyToUserDir(__dirname + '/mysql/home');
        callback(null, 'setup loaded for ' + SCRIPTNAME);
    },

    client: function(callback, extraArgs)
    {
        usdocker.exec(SCRIPTNAME, ['mysql'].concat(extraArgs), callback);
    },

    connect: function(callback, extraArgs)
    {
        usdocker.exec(SCRIPTNAME, ['bash'].concat(extraArgs), callback);
    },

    dump: function(callback, extraArgs)
    {
        usdocker.exec(SCRIPTNAME, ['bash', '/root/mysqldump.sh'].concat(extraArgs), callback);
    },

    analyse: function(callback, extraArgs)
    {
        usdocker.exec(SCRIPTNAME, ['perl', '/root/mysqltuner.pl'].concat(extraArgs), callback);
    },

    debugcli(callback) {
        let result = usdocker.outputRaw('cli', getContainerDef());
        callback(result);
    },

    debugapi(callback) {
        let result = usdocker.outputRaw('api', getContainerDef());
        callback(result);
    },

    up: function(callback)
    {
        usdocker.up(SCRIPTNAME, getContainerDef(), callback);
    },

    status: function(callback) {
        usdocker.status(SCRIPTNAME, callback);
    },

    down: function(callback)
    {
        usdocker.down(SCRIPTNAME, callback);
    },

    restart: function(callback)
    {
        usdocker.restart(SCRIPTNAME, getContainerDef(), callback);
    }
};