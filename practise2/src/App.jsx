import { useEffect, useState } from 'react'

function App() {
  const [items, setItems] = useState([{
    key: '',
    value: ''
  }])

  const addItem = () => {
    setItems(items => [...items, {
      key: '',
      value: ''
    }])
  }

  const removeItem = (index) => {
    setItems(items => items.filter((_, i) => i !== index))
  }

  const handleChange = (e, index) => {
    let { name, value } = e.target;

    setItems(items => items.map((item, i) => {
      if (i === index) {
        item[name] = value;
      }
      return item;
    }))
  }

  const pastHandle = (e, index) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text');
    console.log(pastedData)
    if (pastedData) {
      const datas = pastedData.split("\n").map(text => {
        if (/([\w]+)\s*=(.+?)/.test(text)) {
          let [key, value] = text.split('=')
          let isSame = items.find(item => item.key === key)
          if(!isSame || isSame?.key === items[index].key){
            return { key, value }
          }
        }
      }).filter(Boolean)
      console.log(datas)
      if(datas.length > 0) {
        setItems(items => [...items.slice(0, index), ...datas, ...items.slice(index+1)])
      }

    }
  }

  const handleCheckKey = (e, index) => {
    const keyExists = items.some((item, i) => item.key === e.target.value && i !== index);
    if(keyExists){
     alert("KEY need to be unique!!")
     removeItem(index)
    }
  }

  useEffect(()=> {
    if(items.length === 0) {
      setItems([{
        key: '',
        value: ''
      }])
    }
  }, [items])
  //console.log(items)

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          <input onBlur={e => handleCheckKey(e, index)} onPaste={e => pastHandle(e, index)} onChange={e => handleChange(e, index)} name="key" type='text' value={item.key} />
          <input onChange={e => handleChange(e, index)} name="value" type='text' value={item.value} />
          <button onClick={() => removeItem(index)}>-</button>
        </div>
      ))
      }
      <button onClick={addItem}>New item</button>
      <pre>{JSON.stringify(items, null, 1)}</pre>
    </>
  )
}

export default App
