import React, { useState } from 'react'
import { Input } from '../components/input'
import { Textarea } from '../components/textarea'
import { Button } from '../components/button'

export default function Example() {

  const [response, setResponse] = useState('')
  const [dataInput, setDataInput] = useState('')
  const [key, setKey] = useState('')
  const [instructions, setInstructions] = useState('')
  const [apiKey, setAPIKey] = useState('')

  return (
    <>
    <div className="flex flex-col items-left justify-center gap-4">
    <Input className="w-64" placeholder="API Key" onChange={(v) => setAPIKey(v.target.value)} />
    <Textarea
      defaultValue={dataInput}
      onChange={(v) => setDataInput(v.target.value)}
      className="h-4 w-full resize-none font-mono text-lg selection:bg-accent"
      placeholder="Insert the text data that you would like to run the extraction on"
    />
    <Input className="w-64" placeholder="Key to extract" onChange={(v) => setKey(v.target.value)} />

    <Textarea
      defaultValue={instructions}
      onChange={(v) => setInstructions(v.target.value)}
      className="h-2 w-full resize-none font-mono text-lg selection:bg-accent"
      placeholder="Insert any custom instructions for the extraction process here."
    />

    <Button variant="default" className="bg-gray-700 text-gray-200" size="sm"
      onClick={() => {
        fetch('https://gin-production-0e58.up.railway.app/refill', {
          method: 'POST',
          // Add bearer token
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify({
            data: [dataInput],
            key: [key],
            instructions: instructions
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setResponse(data)
          })
      }}>
      Start Refill
    </Button>
    
    <Textarea
      defaultValue={response}
      onChange={(v) => setDataInput(v.target.value)}
      className="h-1 w-full resize-none font-mono text-lg selection:bg-accent"
      placeholder="Your response will appear here."
    />

    </div>
    </>
  )
}
