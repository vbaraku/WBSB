import React from 'react'
import Graphs from './Graphs'
import MiniDrawer from './drawer/MiniDrawer'

export default function Dashboard() {
  return (
    <div style={{display:"flex", marginTop:"100px"}}>
              {/* <QuestionNav></QuestionNav> */}
        <div style={{width:"15%"}}> <MiniDrawer></MiniDrawer></div>
        <div style={{width:"85%"}}>
            <Graphs></Graphs>

        </div>
    </div>
  )
}
