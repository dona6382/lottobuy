import { connection as Pool } from './dbConnection';

export function executeQuery(sql: string, args: any[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        try {
            Pool.getConnection(function (err, connection) {
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
        } catch (error) {
            reject(error);
        }
    });
}
