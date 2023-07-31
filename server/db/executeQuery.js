const Pool = require('./dbConnection').connection

module.exports.executeQuery = function (sql, args) {

    var pool = Pool;

    return new Promise((resolve, reject) => {

        try{
            pool.getConnection(function(err, connection) {
                connection.query(sql, args, (error, rows) =>{

                    if(error) {
                        throw error;
                    }
                    else return resolve(rows);

                }) //query end

                connection.release();
            }) // pool connection end
        } catch(error){
            // logger.error(error.stack);
        }
    })
}
