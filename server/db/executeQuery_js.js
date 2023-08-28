const Pool = require('./dbConnection').connection


module.exports.executeQuery = function (sql, args) {

    var pool = Pool;

    return new Promise((resolve, reject) => {
        try {
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query(sql, args, (error, rows) => {
                    connection.release();

                    if (error) {
                        reject(error);
                    } else {
                        resolve(rows);
                    }
                });
            });
        } catch(error) {
            reject(error);
        }
    });
};






