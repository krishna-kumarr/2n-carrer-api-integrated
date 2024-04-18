import React from 'react'
import DashboardNavbar from '../../components/Navbar/DashboardNavbar'
import Dashboard from '../../layouts/Dashboard'


const Home = () => {
    const professionalPageDashboardMenu = ['Home', 'Learning', 'Community']

    const queryParams = new URLSearchParams(window.location.search);
    const authenticationToken = queryParams.get("token");

    if (authenticationToken !== null) {
        console.log(authenticationToken);
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }

        localStorage.setItem("Token", authenticationToken);
    }

    return (
        <>
            <DashboardNavbar profileImage="https://github.com/mdo.png" profileName="George Martin" dashboadMenus={professionalPageDashboardMenu} />

            <Dashboard />
        </>
    )
}

export default Home
