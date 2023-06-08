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
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
        
                {/*CANTIDAD DE ELEMENTOS ENCONTRADOS*/}
                <p className="text-muted m-1"> ({filteredBugReports.length})</p>
        
                {/* SPACER */}
                <div className="w-100"></div>
        
                 {/* SOFTWARE DROPDOWN MENU */}
                 <select
                  className="form-control"
                  value={selectedSoftware}
                  onChange={handleSoftwareChange}
                >
                  <option value="">Softwares</option>
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
                <option value="">Prioridades</option>
                {urgencyOptions &&
                    urgencyOptions.map((urgency) => (
                    <option key={urgency} value={urgency}>
                        {urgency}
                    </option>
                    ))}
                </select>

                {/* SPACER */}
                <div className="mx-1"></div>
                {/* DEV DROPDOWN MENU */}
                <select
                className="form-control mr-1"
                value={selectedFilterDev}
                onChange={handleFilterDevChange}
                >
                <option value="">Depuradores</option>
                {devOptions &&
                    devOptions.map((dev) => (
                    <option key={dev} value={dev}>
                        {dev}
                    </option>
                    ))}
                </select>                
                {/* SPACER */}
                <div className="mx-1"></div>
        
                {/* STATUS DROPDOWN MENU */}
                <select
                  className="form-control mr-1"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value="">Estados</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
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