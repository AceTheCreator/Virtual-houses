
const handler = module.exports = {};

/**
 * This triggers a balance event for building units measured
 * @param {object} options
 * @param {object} options.message
 * @param {integer} options.message.payload.buildingID - Building unique indentifier
 * @param {integer} options.message.payload.unit - Number of unit remaining from building
 */
handler.UnitBalanceUpdater = async ({message}) => {
  // Implement your business logic here...
};
