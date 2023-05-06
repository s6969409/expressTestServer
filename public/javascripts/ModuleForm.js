const { useState,useRef,useEffect } = React;

const Input = ({ name, defaultValue }) => {
    const [value, setValue] = useState(defaultValue || '')
    const onChg = e => setValue(e.target.value)
    const type = () => {
        switch (typeof (defaultValue)) {
            case 'number':
                return 'number'
            default:
                return 'text'
        }
    }

    return <input className="form-control" type={type()} placeholder={name} name={name} aria-label="default input example" value={value} onChange={onChg}></input>
}
const Form = ({ data, submit }) => {
    const sb = (e) => {
        e.preventDefault()
        const formData = {}
        for (let i = 0; i < e.target.elements.length; i++) {
            const element = e.target.elements[i];
            if (e.target.elements[i].type !== 'submit') {
                formData[element.name] = element.value;
            }
        }
        submit(formData)
    }

    return <form onSubmit={sb}>
        {Object.keys(data).map((key) => <Input name={key} defaultValue={data[key]} key={key} />)}
        <input className="form-control" type="submit" aria-label="default input example"></input>
    </form>
}

const EcpayOrderBuilder = ({ postData }) => {
    const ref = useRef()

    useEffect(()=>{
        ref.current.submit();
    })
    return <form ref={ref} action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5" method="POST">
        {Object.keys(postData).map((key) =>
            <input key={key} type='hidden' name={key} value={postData[key]}></input>
        )}
    </form>
}