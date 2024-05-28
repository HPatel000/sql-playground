const { Sequelize } = require('sequelize');

const runQuery = async (queryInfo) => {
  if (!queryInfo?.query) return null;
  const sequelize = new Sequelize(
    queryInfo.db,
    queryInfo.username,
    queryInfo.password,
    {
      dialect: 'mysql',
      host: 'localhost',
    }
  );

  try {
    const [result, metadata] = await sequelize.query(queryInfo.query);
    return {
      data: result,
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};

module.exports = runQuery;
