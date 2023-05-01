function handleResponse(data) {
  console.log(data);
}

const App = () => {
  const datas = [
    { name: 'MerchantID', defaultValue: '3002607' },
    { name: 'MerchantTradeNo', defaultValue: 'F3BC68DA-CDE1-4E2C-9B06-3E06A7C0134C' },
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
    console.log("submitDatas", submitDatas);
    
    $.ajax({
      url: '/createOrder',
      type: 'POST',
      //dataType: 'json',//php server要註解掉
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(submitDatas),
      success: (res) => {
        console.log('success', res);
        createOrder(res)
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

  const createOrder = (submitDatas) => {
    axios.post('https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5', submitDatas)
      .then((res) => { console.log('success', res); })
      .catch((err) => { console.error('err', err) })
    return
    $.ajax({
      url: `https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5`,
      type: 'POST',
      dataType: 'json',//php server要註解掉
      contentType: 'application/x-www-form-urlencoded',
      data: JSON.stringify(submitDatas),
      success: (res) => {
        console.log('success', res);
      },
      error: (err) => {
        console.error('err', err);
      }
    });
  }
  const temp = () => {
    axios.post('https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5', {
      "MerchantID": "3002607",
      "MerchantTradeNo": "F3BC68DA-CDE1-4E2C-9B06-3E06A7C0134C",
      "MerchantTradeDate": "2023/04/27 03:03:33",
      "PaymentType": "aio",
      "TotalAmount": "123",
      "TradeDesc": "我是商品描述",
      "ItemName": "我是商品名稱",
      "ReturnURL": "https://expresstestserver.onrender.com/OrderOK",
      "ChoosePayment": "ALL",
      "CheckMacValue": "D5FD74C2EFC34D054D81F2EB3A5D8D0FC7229E0F260C710DA72568F318C9B73A",
      "EncryptType": "1",
      "ClientBackURL": "https://www.google.com.tw/"
    })
  }


  fetch('https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "MerchantID": "3002607",
      "MerchantTradeNo": "F3BC68DA-CDE1-4E2C-9B06-3E06A7C0134C",
      "MerchantTradeDate": "2023/04/27 03:03:33",
      "PaymentType": "aio",
      "TotalAmount": "123",
      "TradeDesc": "我是商品描述",
      "ItemName": "我是商品名稱",
      "ReturnURL": "https://expresstestserver.onrender.com/OrderOK",
      "ChoosePayment": "ALL",
      "CheckMacValue": "D5FD74C2EFC34D054D81F2EB3A5D8D0FC7229E0F260C710DA72568F318C9B73A",
      "EncryptType": "1",
      "ClientBackURL": "https://www.google.com.tw/"
    }),
    mode: 'no-cors'
  })

  return <Form datas={datas} submit={sb} />
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />);