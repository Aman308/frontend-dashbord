import React from 'react'
import Table from './components/Table'
import Barchart from './components/Barchart'
import Statistics from './components/Statistics'

const App = () => {
  return (
    <div>
      <Table/>
      <div className='flex justify-between bg-black flex-col py-20 md:flex-row'>
      <Statistics className="w-50%"/>
      <Barchart className="w-50%"/>
      </div>
    </div>
  )
}

export default App
