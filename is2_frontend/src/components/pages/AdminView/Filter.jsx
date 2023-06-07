import React from 'react'
 
 
 const Filter= ({
    searchTerm,
    selectedStatus,
    selectedSoftware,
    selectedUrgency,
    selectedFilterDev,
    handleSearch,
    handleStatusChange,
    handleSoftwareChange,
    handleUrgencyChange,
    handleFilterDevChange,
    filteredBugReports,
    statusOptions,
    softwareOptions,
    urgencyOptions,
    devOptions
    }) =>{
    
          return (
            <div className="container">
              <div className="d-flex mb-2">
                {/* SEARCH BAR */}
                <input
                  type="text"
                  className="form-control mr-1"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
        
                {/*CANTIDAD DE ELEMENTOS ENCONTRADOS*/}
                <p className="text-muted m-1"> ({filteredBugReports.length})</p>
        
                {/* SPACER */}
                <div className="w-100"></div>
        
                {/* STATUS DROPDOWN MENU */}
                <select
                  className="form-control mr-1"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value="">All Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
        
                {/* SPACER */}
                <div className="mx-1"></div>
        
                {/* SOFTWARE DROPDOWN MENU */}
                <select
                  className="form-control"
                  value={selectedSoftware}
                  onChange={handleSoftwareChange}
                >
                  <option value="">All Software</option>
                  {softwareOptions.map((software) => (
                    <option key={software} value={software}>
                      {software}
                    </option>
                  ))}
                </select>
                        {/* SPACER */}
            <div className="mx-1"></div>

                {/* PRIORITY DROPDOWN MENU */}
                <select
                className="form-control mr-1"
                value={selectedUrgency}
                onChange={handleUrgencyChange}
                >
                <option value="">All Urgency</option>
                {urgencyOptions &&
                    urgencyOptions.map((urgency) => (
                    <option key={urgency} value={urgency}>
                        {urgency}
                    </option>
                    ))}
                </select>
            </div>
                {/* SPACER */}
            <div className="mx-1"></div>
                {/* PRIORITY DROPDOWN MENU */}
        </div>

    )
    

};
export default Filter;