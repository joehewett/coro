import React, { useState } from 'react'
import { Input } from '../components/input'
import { Textarea } from '../components/textarea'
import { Button } from '../components/button'
import { Loading } from '../components/loading'

function splitKeys(keys: string) {
  return keys.split(',').map((key) => key.trim())
}

export default function Example() {

  const prodAPI = 'https://gin-production-0e58.up.railway.app/refill'
  const devAPI = 'http://localhost:8080/refill'

  const [response, setResponse] = useState('')
  const [dataInput, setDataInput] = useState('')
  const [keys, setKeys] = useState('')
  const [instructions, setInstructions] = useState('')
  const [apiKey, setAPIKey] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div></div>
    <div className="flex flex-col items-left justify-center gap-4 lg:col-span-2">
      Extract structured data from unstructured text. Insert some text data and add some comma-separated keys to get started.
    <Input className="w-64" placeholder="OpenAI API Key" onChange={(v) => setAPIKey(v.target.value)} />
    <Textarea
      defaultValue={dataInput}
      onChange={(v) => setDataInput(v.target.value)}
      className="h-96 w-full font-mono text-lg selection:bg-accent"
      placeholder="Insert the text data that you would like to run the extraction on"
    />
    <Input className="w-full text-lg" placeholder="Keys to extract (comma separated)" onChange={(v) => setKeys(v.target.value)} />

    <Textarea
      defaultValue={instructions}
      onChange={(v) => setInstructions(v.target.value)}
      className="h-2 w-full resize-none font-mono text-lg selection:bg-accent"
      placeholder="Insert any custom instructions for the extraction process here"
    />

    <Button variant="default" className="bg-gray-700 gap-4 text-gray-200" size="sm"
      onClick={() => {
        setLoading(true)
        fetch(devAPI, {
          method: 'POST',
          // Add bearer token
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify({
            data: [dataInput],
            keys: splitKeys(keys),
            instructions: instructions,
            openai_api_key: apiKey
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setResponse(data)
            setLoading(false)
          })
          .catch((error) => {``
            console.error('Error:', error)
            setLoading(false)
          })
      }}>
      Start Refill 
      <Loading loading={loading} />
    </Button>
    
    <Textarea
      defaultValue={response}
      className="h-1 w-full resize-none font-mono text-lg selection:bg-accent"
      placeholder="Your response will appear here"
    />

    </div>
    <div></div>
    </div>
    </>
  )
}
