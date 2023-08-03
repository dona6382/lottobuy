const query = {
    SELECT_NOW : `select now()`,
    INSERT_USER_INFO : `INSERT into lotto.user_info(identification, password, reg_dt) 
                        values(?, ?, now());`,
    GET_USER_INFO : `SELECT * from lotto.user_info;`,

}

module.exports.query = query;