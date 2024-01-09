import axios from "axios"
import { useEffect, useState } from "react"

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchData = async (url) =>{
            setIsLoading(true)
            try {
                const response = await axios.get(url)
                setData(response.data)
                setIsLoading(false)
            } catch (error) {
                setError(error.message)
                setIsLoading(false)
                setData([])                
            }
        }
        fetchData(dataUrl)
    },[dataUrl])

    return {data, error, isLoading}
}

export default useAxiosFetch