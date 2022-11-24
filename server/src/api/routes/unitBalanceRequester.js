const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const unitBalanceRequesterHandler = require('../handlers/unitBalanceRequester');
module.exports = router;



/**
 * This triggers a request action for each building about the balance
 */
router.useOutbound('unitBalanceRequester', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'unitBalanceRequester','lightBalanceRequester','subscribe');
    await unitBalanceRequesterHandler.BalanceRequester({message});
    next();
    
  } catch (e) {
    next(e);
  }
});
