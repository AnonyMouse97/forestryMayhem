import React from "react"
import { useAsync } from "react-async"
import ViewMap from "./Map/map"
import Topbar from "./Topbar/Topbar"
import ProfileBar from "./user/ProfileBar"



const loadAllTrees = async () => {
    const res = await fetch(`${process.env.API_URL}api/tree/`)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
}

const MainPage = () => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadAllTrees })
    if (isLoading) {
        return "Loading"
    }
    if (error) {
        return `Something went wrong: ${error.message}`
    }
    if (data) {
        return (
            <div>
                <Topbar />
                <ProfileBar />
                <ViewMap data={data} />
            </div>
        )
    }
    return null

}

export default MainPage