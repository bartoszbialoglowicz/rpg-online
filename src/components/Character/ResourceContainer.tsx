import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import ResourceItem from "./ResourceItem";
import { UserContext } from "../../store/user-context";
import { resurcesResponse } from "../../utils/types";

const ResourceContainer = () => {

    const [gold, setGold] = useState(0);
    const [lvl, setLvl] = useState(0);
    const [exp, setExp] = useState(0);
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<resurcesResponse>('api/resources', 'GET', undefined, userCtx.user.authToken);

    useEffect(() => {
        const fetchData = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                setGold(data[0].gold)
                setExp(data[0].exp)
                setLvl(data[0].lvl)
            }
        }
        fetchData();
    }, [])

    return <div className="character-resource-container">
        <ResourceItem name="GOLD" value={gold}/>
        <ResourceItem name="LVL" value={lvl}/>
        <ResourceItem name="EXP" value={exp}/>
    </div>
};

export default ResourceContainer;