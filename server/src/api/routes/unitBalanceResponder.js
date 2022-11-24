const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const unitBalanceResponderHandler = require('../handlers/unitBalanceResponder');
module.exports = router;



/**
 * This triggers a balance event for building units measured
 */
router.use('unitBalanceResponder', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'unitBalanceResponder','lightMeasured','publish');
    await unitBalanceResponderHandler.BalanceResponder({message});
    // next();
    
  } catch (e) {
    next(e);
  }
});
