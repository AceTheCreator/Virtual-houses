const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const unitBalanceUpdaterHandler = require('../handlers/unitBalanceUpdater');
module.exports = router;



/**
 * This triggers a balance event for building units measured
 */
router.useOutbound('unitBalanceUpdater', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'unitBalanceUpdater','lightMeasured','subscribe');
    await unitBalanceUpdaterHandler.UnitBalanceUpdater({message});
    next();
    
  } catch (e) {
    next(e);
  }
});
