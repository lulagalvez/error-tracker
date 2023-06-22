import React, { useEffect, useState } from "react";
import ReassignationRow from "./ReassignationRow";
import ReassignationExpansion from "./ReassignationExpansion";
import APIService from "../../services/APIService";

function ReassignationsView() {
    const [selectedReassignation, setSelectedReassignation] = useState(null);
    const [reassignations, setReassignations] = useState([]);
    const [devs, setDevs] = useState([]);

    const api_service = new APIService();

    const handleReassignationClick = (reassignation) => {
        setSelectedReassignation(reassignation === selectedReassignation ? null : reassignation);
    };

    const updateReassignation = (developer) => {
        
    };

    useEffect(() => {
        async function fetchData() {
            const reassignations_response = await api_service.get('reassignations');
            setReassignations(reassignations_response);

            const devs_response = await api_service.get('devs');
            setDevs(devs_response);
        }
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Reasignaciones pendientes</h1>
            <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Tracking ID</th>
                        <th scope="col">ID de reporte</th>
                        <th scope="col">Desarrollador</th>
                        <th scope="col">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {reassignations &&
                        reassignations.map((reassignation, key) => (
                            <React.Fragment key={key}>
                                <ReassignationRow
                                    handleClick={handleReassignationClick}
                                    reassignation={reassignation}
                                    developers={devs}
                                    selectedReassignation={selectedReassignation}
                                />
                                {selectedReassignation === reassignation && (
                                    <ReassignationExpansion
                                        developers={devs}
                                        reassignation={reassignation}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
        </div>

    );
}

export default ReassignationsView;