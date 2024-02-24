import React, { useState } from 'react'

export default function Example() {

    let [response, setResponse] = useState(0)

  return (
    <>
    <div className="flex flex-col items-center justify-center">
    <button
      className="bg-primary text-dark p-2 rounded-md"
      onClick={() => {
        fetch('https://gin-production-0e58.up.railway.app', {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            setResponse(data)
          })
      }}
    >
        Click here
    </button>
    <p>{response}</p>
    </div>
    </>
  )
}
