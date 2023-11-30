import React, { useState, useCallback, useEffect, useMemo, } from 'react'

function App() {
  const [colored, setColored] = useState(false)
  const [count, setCount] = useState(1)

  const styles = {
    color: colored ? 'white' : 'black',
    backgroundColor: colored ? 'black' : 'white'
  }

  const addItem = useCallback((indexNumber) => {
    return new Array(count).fill('New Item').map((item , index) => `${item} № ${index + indexNumber}`)
  }, [count])

  const handleClick = () => {
    const newCount = count + 1
    setCount(newCount)
  }

  const hardComplexFunction = useMemo(() => {
    console.log('Result');
    return count
  }, [count])

  return (
    <div style={styles}>
      <h1>Number of elements: {hardComplexFunction}</h1>
      <button className={'btn btn-success'} onClick={() => handleClick()}>Add Item</button>
      <button className={'btn btn-warning'} onClick={() => setColored(!colored)}>Dark mode: {colored ? 'ON' : 'OFF'}</button>

      <ItemsList getItems={addItem} />
    </div>
  )
}

export default App

function ItemsList({ getItems }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const newItems = getItems(1)
    setItems(newItems)
    console.log('render')
  }, [getItems])

  return (
    <ul>
      { items.map(i => <li key={i}>{i}</li>) }
    </ul>
  )
}