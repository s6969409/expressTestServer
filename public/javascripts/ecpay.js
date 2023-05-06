const App = () => {
  const data = {
    MerchantID: '3002607',
    MerchantTradeNo: 'f0a0d7e9fae1bb72bc93',
    MerchantTradeDate: '2023/04/27 03:03:33',
    PaymentType: 'aio',
    TotalAmount: 123,
    TradeDesc: '我是商品描述',
    ItemName: '我是商品名稱',
    ReturnURL: 'https://expresstestserver.onrender.com/OrderOK',
    ChoosePayment: 'ALL',
    EncryptType: 1,
    ClientBackURL: 'https://www.google.com.tw/'
  }

  const [postData, setPostData] = useState()

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
        setPostData(res)
      },
      error: (err) => {
        console.error('err', err);
      }
    });
  }

  return postData == undefined ?
    <Form data={data} submit={sb} /> :
    <EcpayOrderBuilder postData={postData} />
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);