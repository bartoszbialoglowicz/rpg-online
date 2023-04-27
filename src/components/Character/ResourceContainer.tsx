import { useContext, useEffect } from "react";
import { useHttp } from "../../hooks/use-http";
import ResourceItem from "./ResourceItem";
import { UserContext } from "../../store/user-context";

const ResourceContainer = () => {

    const userCtx = useContext(UserContext);

    const sendRequest = useHttp('api/resources', 'GET', undefined, userCtx.user.authToken);

    useEffect(() => {
        const fetchData = async () => {
            const {data, code} = await sendRequest();
            console.log([data, code]);
        }
        fetchData();
    }, [])

    return <div className="character-resource-container">
        <ResourceItem name="GOLD" value={100}/>
    </div>
};

export default ResourceContainer;