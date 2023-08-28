import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import myApi from '../api/service'

function SeeMySessions() {
    const {workshopId} = useParams()
    const [sessions, setSessions] = useState(null)

   useEffect(() => {
    myApi.getWorkshopSessions(workshopId)
    .then((response) => {
        setSessions(response.data)
    })
    .catch((error) => {
        console.log(error);
    })
    
   }, [workshopId])

  return (
    <div>
        <h1>My workshop sessions</h1>
       {/* {workshop.sessionsAvailable && workshop.sessionsAvailable.length > 0 ? (
        workshop.sessionsAvailable.map((sessionDate, index) => (
            <div key={index}>
            <h2></h2>

        ))
       )} */}
    </div>
  )
}

export default SeeMySessions