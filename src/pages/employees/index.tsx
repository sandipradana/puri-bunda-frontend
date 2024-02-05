import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { BASE_URL_API } from "../../config/config";
import Create from "./create";
import Update from "./update";
import Delete from "./delete";

export interface Unit {
    id: number;
    name: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface Employee {
    id: number;
    name: string;
    username: string;
    unit: Unit
    roles: Role[]
}

const Employees: React.FC = () => {

    const columns = [
        {
            name: 'ID',
            selector: (row: Employee) => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row: Employee) => row.name,
            sortable: true,
        },
        {
            name: 'Username',
            selector: (row: Employee) => row.username,
            sortable: true,
        },
        {
            name: 'Unit',
            selector: (row: Employee) => row.unit.name,
            sortable: true,
        },
        {
            name: 'Jabatan',
            selector: (row: Employee) => row.roles.map((role) => role.name).join(', '),
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row: Employee) => <div className="btn-group"><div className="btn btn-primary btn-sm" onClick={() => { setSelectedEmployee(row); setUpdateModal(true) }}>Update</div><div className="btn btn-danger btn-sm" onClick={() => { setSelectedEmployee(row); setDeleteModal(true) }}>Delete</div></div>,
        },
    ];

    const [data, setData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setCreateModal] = useState(false);
    const [showUpdateModal, setUpdateModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get(BASE_URL_API + `/employees`);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [showCreateModal, showDeleteModal, showUpdateModal]);

    return (
        <div className="card my-5">
            <div className="card-body">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={() => setCreateModal(true)}>Tambah</button>
                </div>
                <DataTable
                    title="Karyawan"
                    columns={columns}
                    data={data}
                    progressPending={loading}
                />
            </div>
            {showCreateModal ? <Create setShowModal={setCreateModal} /> : null}
            {showUpdateModal ? <Update setShowModal={setUpdateModal} employee={selectedEmployee} /> : null}
            {showDeleteModal ? <Delete setShowModal={setDeleteModal} employee={selectedEmployee} /> : null}
        </div>
    );
};

export default Employees;
