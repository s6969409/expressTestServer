const App = () => {
  const datas = [
    { name: 'MerchantID', defaultValue: '3002607' },
    { name: 'MerchantTradeNo', defaultValue: '1222222222222asdasdasd' },
    { name: 'MerchantTradeDate', defaultValue: '2023/04/27 03:03:33' },
    { name: 'PaymentType', defaultValue: 'aio' },
    { name: 'TotalAmount', defaultValue: 123 },
    { name: 'TradeDesc', defaultValue: '我是商品描述' },
    { name: 'ItemName', defaultValue: '我是商品名稱' },
    { name: 'ReturnURL', defaultValue: 'https://expresstestserver.onrender.com/OrderOK' },
    { name: 'ChoosePayment', defaultValue: 'ALL' },
    { name: 'CheckMacValue', defaultValue: '' },
    { name: 'EncryptType', defaultValue: 1 },
    { name: 'ClientBackURL', defaultValue: 'https://www.google.com.tw/' }
  ]

  const sb = async (submitDatas) => {
    console.log(submitDatas);

    $.ajax({
      url: '/createOrder',
      type: 'POST',
      //dataType: 'json',//php server要註解掉
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(submitDatas),
      success: (res) => {
        console.log('success', res);
        submitDatas.CheckMacValue = res

        let urlPara = buildUrlPara(submitDatas)
        window.location.assign(`https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5/?${urlPara}`);
      },
      error: (err) => {
        console.error('err', err);
      }
    });
  }

  const buildUrlPara = (params) => {
    let checkString = '';
    for (let key in params) {
      checkString += `&${key}=${params[key]}`;
    }
    return checkString.substring(1);
  }

  return <Form datas={datas} submit={sb} />
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />);