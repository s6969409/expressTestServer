const App = () => {
    const datas = [
        { name: 'MerchantID', defaultValue: 'MS148396827' },
        { name: 'Version', defaultValue: '1.3' },
        { name: 'RespondType', defaultValue: 'JSON' },
        { name: 'CheckValue' },
        { name: 'TimeStamp', defaultValue: '1679218306' },
        { name: 'MerchantOrderNo', defaultValue: '1679218306' },
        { name: 'Amt', defaultValue: 81 },
    ]
    const sb = (submitDatas) => {
        console.log(submitDatas);

        $.ajax({
            url: '/query',
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

ReactDOM.createRoot(document.getElementById('root')).render(<App />);