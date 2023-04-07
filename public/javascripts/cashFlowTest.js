const App = () => {
    const datas = [
        { name: 'MerchantID', defaultValue: 'MS148396827' },
        { name: 'RespondType', defaultValue: 'JSON' },
        { name: 'TimeStamp', defaultValue: '1679218306' },
        { name: 'Version', defaultValue: '2.0' },
        { name: 'MerchantOrderNo', defaultValue: '1679218306' },
        { name: 'Amt', defaultValue: 81 },
        { name: 'ItemDesc', defaultValue: '商品資訊' },
        { name: 'Email', defaultValue: 's6969409@gmail.com' },
    ]
    const sb = (submitDatas) => {
        console.log(submitDatas);

        $.ajax({
            url: '/cashFlowTest',
            type: 'POST',
            //dataType: 'json',//php server要註解掉
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(submitDatas),
            success: (res) => {
                console.log('ok');
                console.log(res);
            },
            error: (res) => {
                console.log('err');
                console.error(res);
            }
        });
    }

    return <Form datas={datas} submit={sb} />
}
/*
轉道藍新金流,成功user端轉道return,並通知後端notify
  
    會有個問題,通知後端notify,後端沒完成資料庫處理,前端就user已經return要到資料庫拿資料
    A:直接顯示狀況?等到後端notify完成,用即時通訊完成?或是在RESTAPI一次?
  
  要串網址參數時,一些特殊字元(中文、@...)要轉成%FF(URL編碼),用js內建encodeURI()
*/
ReactDOM.createRoot(document.getElementById('root')).render(<App />);