const App = () => {
  const datas = [
    { name: 'text', defaultValue: '??' },
    { name: 'url', defaultValue: 'ws://localhost:4000' }
  ]

  const sb = async(submitDatas) => {
    console.log(submitDatas);

    let url = submitDatas.url
    var ws = new WebSocket(url)
    ws.onopen = async() => {
      console.log('open connection')
      await ws.send(submitDatas.text)
    }
    ws.onclose = () => {
      console.log('close connection');
    }

    ws.onmessage = event => {
      let txt = event.data
      console.log(txt)
      //ws.close()
    }
  }

  return <Form datas={datas} submit={sb} />
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />);