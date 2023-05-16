import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./Sidebar.css"

export const SideBar = () => {
    return (
       <div class = "sidebar">
            <a href="/report">
                <div class ="icon-container">
                    <i class="bi bi-file-earmark-plus-fill"></i> 
                        <h1> New Report </h1>
                        <span class="oval"></span>
                </div>
            </a>
            <a>
                <div class="icon-container">
                    <i class="bi bi-clipboard2-check-fill"></i>
                        <h1> My Reports </h1>
                        <span class="oval"></span>
                </div>
            </a>
            <a>
                <div class="icon-container">
                    <i class="bi bi-person-circle"></i>
                        <h1> My Account </h1>
                        <span class ="oval"></span>
                </div>
            </a>
       </div>
    )
}

export default SideBar