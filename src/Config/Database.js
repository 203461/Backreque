module.exports = debuggerConfig = {
    host: 'localhost',
    port: '8080',
    user: 'root',
    password: 'root',
    database: 'debugger',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0, // 0 = unlimited
    debug: false,
};
