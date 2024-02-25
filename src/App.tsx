import './index.css'
import React from 'react'
import RefillForm from './pages/refill'
import '@radix-ui/themes/styles.css';


function App() {
  return (
      <body
        className={`flex h-screen flex-col bg-background font-mono text-foreground`}
      >
        <h1 className="text-4xl font-bold text-center p-4 mt-6 bg-primary text-dark">Refill</h1>
        <div className="flex-grow flex-shrink overflow-hidden p-4 md:px-16 md:py-6 lg:px-32">
      <RefillForm />
        </div>
      </body>
  )
}

export default App
