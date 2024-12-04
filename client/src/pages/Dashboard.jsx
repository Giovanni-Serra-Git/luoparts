/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "./DashSidebar.jsx"
import DashProfile from "./DashProfile.jsx"

function Dashboard() {
    const location = useLocation()
    const [tab, setTab] = useState()
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const tabFormUrl = queryParams.get("tab")
        if (tabFormUrl) {
            setTab(tabFormUrl)
        }
    }, [location.search])

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-56">
                <DashSidebar />
            </div>
            {tab === "profile" && <DashProfile />}
        </div>
    )
}

export default Dashboard
