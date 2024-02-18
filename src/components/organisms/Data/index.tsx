'use client'

import React, { useState, useEffect } from 'react'

const getDataFromType = async (type, hasError) => {
  if (hasError) {
    throw { message: 'Error occxred' }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (hasError) {
        reject({ message: 'Error' })
      } else {
        if (type === 'Users') resolve(88)
        else if (type === 'Comments') resolve(354)
        else if (type === 'Posts') resolve(235)
      }
    }, 2000)
  })
}

const Data = ({ type, hasError = false }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: any = await getDataFromType(type, hasError)
        setData(result)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }

    fetchData()
  }, [type, hasError])

  return (
    <div>
      {type}: {data}
    </div>
  )
}

export { Data }
