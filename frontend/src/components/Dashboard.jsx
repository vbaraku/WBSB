import React from 'react'
import Graphs from './Graphs'

export default function Dashboard() {
  return (
    <div style={{display:"flex", marginTop:"100px"}}>
              {/* <QuestionNav></QuestionNav> */}
        <div style={{width:"15%"}}>we</div>
        <div style={{width:"85%"}}>
            <Graphs></Graphs>

        </div>
    </div>
  )
}
