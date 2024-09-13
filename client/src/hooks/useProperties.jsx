import React from 'react'
import {  useQuery } from 'react-query'
import { getAllProperties } from '../utils/api'

const useProperties = () => {
  // make return a object which give data , isError , isLoading , refetch
  // refetchonwindowfocus : false beacaue use to much network 
  const {data , isLoading , isError , refetch} = useQuery(
      "allProperties",getAllProperties,{refetchOnWindowFocus:false} 
  )

  
 
  return {
    data , isError , isLoading , refetch
  }
}

export default useProperties
