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
  } finally {
    sequelize.close();
  }
};

const authenticateUser = async (userInfo) => {
  if (!userInfo) return null;
  const sequelize = new Sequelize(null, userInfo.username, userInfo.password, {
    dialect: 'mysql',
    host: 'localhost',
  });
  try {
    await sequelize.authenticate();
    return {
      data: true,
    };
  } catch (e) {
    console.log(e);
    return {
      error: e,
    };
  } finally {
    sequelize.close();
  }
};

module.exports = { runQuery, authenticateUser };
