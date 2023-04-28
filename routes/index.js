var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var axios = require('axios');


//#region 定義 HashKey 和 HashIV...
const HASHKEY = 'Gs0GDVGlQiJJ8OhH1CX9TzU7rzHgXJsE'//'Gs0GDVGlQiJJ8OhH1CX9TzU7rzHgXJsE';//AAAvw3YlqoEk6G4HqRKDAYpHKZWxBBB
const HASHIV = 'Cavy0PKL3QPxynGP'//'Cavy0PKL3QPxynGP';//AAAC1FplieBBB
const NotifyURL = 'https://set-energy.com.tw/Duke/CashFlow/apiServer.php/notify';
const ReturnURL = 'https://set-energy.com.tw/Duke/CashFlow/apiServer.php/return';

//#endregion
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/cashFlowTest', function (req, res, next) {
  res.render('reactRootTemplate', {
    title: 'cashFlowTest',
    myJs: [
      { src: '/javascripts/ModuleForm.js', type: 'text/babel' },
      { src: '/javascripts/cashFlowTest.js', type: 'text/babel' }
    ],
    content:''
  });
});
router.post('/cashFlowTest', async function (req, res, next) {
  console.log(req.body)

  let reqStr = `MerchantID=${req.body.MerchantID}&TimeStamp=${req.body.TimeStamp}&Version=${req.body.Version}&RespondType=${req.body.RespondType}&MerchantOrderNo=${req.body.MerchantOrderNo}&Amt=${parseInt(req.body.Amt)}&NotifyURL=${encodeURIComponent('https://webhook.site/d4db5ad1-2278-466a-9d66-78585c0dbadb')}&ReturnURL=${''}$ItemDesc=${encodeURIComponent(req.body.ItemDesc)}`//&Email=${encodeURIComponent(req.body.Email)}`

  const strAES256 = encodeAES256(reqStr, HASHKEY, HASHIV)
  const strSHA256 = encodeSHA256(strAES256, HASHKEY, HASHIV)

  const postData = {
    MerchantID: req.body.MerchantID,
    TradeInfo: strAES256,
    TradeSha: strSHA256,
    Version: req.body.Version
  }

  console.log(postData)
  //#region POST data
  await axios.post('https://ccore.spgateway.com/MPG/mpg_gateway', postData)
    .then(resp => res.send(resp))
    .catch(err => res.status(500).send(err))
  //#endregion
  res.end()
});
router.get('/query', function (req, res, next) {
  res.render('query', { title: 'query' });
});
router.post('/query', async function (req, res, next) {
  let tt = `IV=${HASHIV}&Amt=${req.body.Amt}&MerchantID=${req.body.MerchantID}&MerchantOrderNo=${req.body.MerchantOrderNo}&Key=${HASHKEY}`

  let cv = encodeSHA256(tt, HASHKEY, HASHIV)
  console.log(cv)

  req.body.CheckValue = cv
  console.log(req.body)



  //#region POST data
  await axios.post('https://ccore.newebpay.com/API/QueryTradeInfo', req.body)
    .then(resp => res.send(resp))
    .catch(err => res.status(500).send(err))
  //#endregion

  res.end();
});
router.get('/socket', function (req, res, next) {
  res.render('reactRootTemplate', {
    title: 'socket',
    myJs: [
      { src: '/javascripts/ModuleForm.js', type: 'text/babel' },
      { src: '/javascripts/socket.js', type: 'text/babel' }
    ],
    content: 'Test11111'
  });
});
router.get('/ecpayTest', function (req, res, next) {
  res.render('reactRootTemplate', {
    title: 'ecpayTest',
    myJs: [
      { src: '/javascripts/ModuleForm.js', type: 'text/babel' },
      { src: '/javascripts/ecpay.js', type: 'text/babel' }
    ],
    content: ''
  });
});
router.post('/createOrder', function (req, res, next) {
  const hashKey = 'pwFHCqoQZGmho4w6';
  const hashIV = 'EkRm7iFT261dpevs';
  
  let chkStr = generateCheckMacValue(req.body,hashKey,hashIV)
  console.log(chkStr);
  res.send(chkStr)
  res.end()
});
router.get('/OrderOK', function (req, res, next) {
  res.send('1|OK')
  res.end()
});

function generateCheckMacValue(params, hashKey, hashIV) {
  // Step 1: sort parameters by alphabet order
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((obj, key) => {
      obj[key] = params[key];
      return obj;
    }, {});

  // Step 2: concatenate sorted parameters with HashKey and HashIV
  let checkString = `HashKey=${hashKey}`;
  for (let key in sortedParams) {
    checkString += `&${key}=${sortedParams[key]}`;
  }
  checkString += `&HashIV=${hashIV}`;

  // Step 3: URL encode
  checkString = encodeURIComponent(checkString)
    .replace(/%20/g, '+')
    .replace(/%2d/g, '-')
    .replace(/%5f/g, '_')
    .replace(/%2e/g, '.')
    .replace(/%21/g, '!')
    .replace(/%2a/g, '*')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')');

  // Step 4: to lowercase
  checkString = checkString.toLowerCase();

  // Step 5: SHA256 encryption
  const sha256 = require('crypto').createHash('sha256');
  sha256.update(checkString);
  const encryptedString = sha256.digest('hex');

  // Step 6: to uppercase
  const checkMacValue = encryptedString.toUpperCase();

  return checkMacValue;
}

const encodeAES256 = (str, hashKey, hashIV) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', hashKey, hashIV);
  let encrypted = cipher.update(str, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted
}
const decodeAES256 = (encodeStr, hashKey, hashIV) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', hashKey, hashIV);
  let decrypted = decipher.update(encodeStr, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted
}
const encodeSHA256 = (str, hashKey, hashIV) => {
  const sha256 = crypto.createHash('sha256');
  const content = `HashKey=${hashKey}&${str}&HashIV=${hashIV}`;
  return sha256.update(content).digest('hex').toUpperCase();
}

module.exports = router;
require('./socketHandler')