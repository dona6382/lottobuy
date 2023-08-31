import { PoolConnection } from 'mysql'; // Import the appropriate types
import {connection} from './dbConnection';


export function executeQuery(sql: string, args: any[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        try {
            connection.getConnection(function (err: Error | null, connection: PoolConnection) {
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
