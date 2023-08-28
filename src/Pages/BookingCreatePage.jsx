import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import myApi from '../api/service'

function BookingCreatePage() {
    const [workshop, setWorkshop]= useState({})
    const {workshopId} = useParams()
    const [] = useState()

    useEffect(() => {
        myApi.get("/api/workshops/" + workshopId).then(({data}) => {
            setWorkshop(data)
        }).catch(e => console.log(e))
    }, [])
  return (
    <div>{workshop.title}</div>
  )
}

export default BookingCreatePage