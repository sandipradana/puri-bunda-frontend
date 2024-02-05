import { useEffect, useState } from "react";
import { BASE_URL_API } from "../../config/config";
import axios from "axios";
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { ActionMeta, MultiValue } from "react-select";

const animatedComponents = makeAnimated();

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Unit {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
}

interface Option {
    value: number;
}


const Create: React.FC<Props> = ({ setShowModal }) => {

    const [units, setUnits] = useState<Unit[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const [rolesOptions, setRolesOptions] = useState<any[]>([]);
    const [roleIsLoading, setRoleIsLoading] = useState(false);

    const [employeeName, setEmployeeName] = useState<string>("");
    const [employeeUsername, setEmployeeUsername] = useState<string>("");
    const [employeePassword, setEmployeePassword] = useState<string>("");
    const [employeeUnit, setEmployeeUnit] = useState<number | null>(null);
    const [employeeRoles, setEmployeeRoles] = useState<Role[]>([]);

    async function fetchUnits() {
        const response = await axios.get(BASE_URL_API + `/units`);
        setUnits(response.data.data);
    }

    async function fetchRoles() {
        const response = await axios.get(BASE_URL_API + `/roles`);
        setRoles(response.data.data);
    }

    useEffect(() => {
        fetchUnits();
        fetchRoles();
    }, []);

    useEffect(() => {
        const options = roles.map((item) => ({ value: item.id, label: item.name }));
        setRolesOptions(options);
    }, [roles]);

    const handleCreateRole = async (input: string) => {
        try {
            setRoleIsLoading(true);
            const response = await axios.post(BASE_URL_API + `/roles`, { name: input });
            const newRole = { value: response.data.id, label: response.data.name };
            setRolesOptions((prevOptions) => [...prevOptions, newRole]);
        } catch (error) {
            console.error("Error creating role:", error);
        } finally {
            setRoleIsLoading(false);
        }
    }

    const handleCreateEmployee = async () => {
        try {
            const response = await axios.post(BASE_URL_API + `/employees`, {
                name: employeeName,
                username: employeeUsername,
                password: employeePassword,
                unit_id: employeeUnit,
                roles: employeeRoles,
            });
            console.log("Employee created successfully:", response.data);
        } catch (error) {
            console.error("Error creating employee:", error);
        } finally {
            setShowModal(false);
        }
    }

    return (
        <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Tambah</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" onChange={(e) => setEmployeeName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="username" className="form-control" id="username" onChange={(e) => setEmployeeUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" onChange={(e) => setEmployeePassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="unit" className="form-label">Unit</label>
                                <select className="form-select" onChange={(e) => setEmployeeUnit(Number(e.target.value))}>
                                    {units.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <CreatableSelect
                                    closeMenuOnSelect={false}
                                    isLoading={roleIsLoading}
                                    components={animatedComponents}
                                    isMulti
                                    options={rolesOptions}
                                    onCreateOption={handleCreateRole}
                                    onChange={(option: readonly Option[], actionMeta: ActionMeta<Option>) => {
                                        const filter = roles.filter(function (role) {
                                            return option.find((x) => {
                                                return x.value == role.id
                                            })
                                        })
                                        setEmployeeRoles(filter)
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleCreateEmployee}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;
