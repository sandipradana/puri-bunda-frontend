import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { BASE_URL_API } from "../../config/config";

export interface AuthHistory {
    total: number;
    employee_name:string;
}


const AuthHistories: React.FC = () => {
    const columns = [
        {
            name: 'Name',
            selector: (row: AuthHistory) => row.employee_name,
            sortable: true,
        },
        {
            name: 'Total login',
            selector: (row: AuthHistory) => row.total,
            sortable: true,
        },
    ];

    const [data, setData] = useState<AuthHistory[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAuthHistories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(BASE_URL_API + `/auth-histories`);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthHistories();
    }, []);

    return (
        <div className="card my-5">
            <div className="card-body">
                <DataTable
                    title="Top Login"
                    columns={columns}
                    data={data}
                    progressPending={loading}
                />
            </div>
    </div>
    );
};

export default AuthHistories;