import {Sidebar, SidebarItems} from "flowbite-react"
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

function DashSidebar() {
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
        <Sidebar className="w-full md:w-56">
            <SidebarItems>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item active={tab === "profile"} icon={HiUser} label="User" labelColor="dark" className="cursor-pointer">Profile</Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} labelColor="dark" className="cursor-pointer" >Sign Out</Sidebar.Item>
                </Sidebar.ItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}

export default DashSidebar
