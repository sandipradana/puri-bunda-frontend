import { useEffect, useState } from "react";
import { BASE_URL_API } from "../../config/config";
import axios from "axios";
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { ActionMeta, MultiValue } from "react-select";
import { Employee } from ".";

const animatedComponents = makeAnimated();

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    employee: Employee | null;
}


const Delete: React.FC<Props> = ({ setShowModal, employee }) => {

    const handleDeleteEmployee = async () => {
        try {
            const response = await axios.delete(BASE_URL_API + `/employees/` + employee?.id, {});
            console.log("Employee deleted successfully:", response.data);
        } catch (error) {
            console.error("Error deleting employee:", error);
        } finally {
            setShowModal(false);
        }
    }

    return (
        <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete</h5>
                    </div>
                    <div className="modal-body">
                       Apakah anda yakin ingin menghapus data ini ?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleDeleteEmployee}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delete;
