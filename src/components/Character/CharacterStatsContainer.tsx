import { useContext, useEffect, useState } from 'react';
import characterImg from '../../assets/images/tmp_avatar2.png';
import { useHttp } from '../../hooks/use-http';
import { UserContext } from '../../store/user-context';
import { Character, Item, ItemStatsValues, ItemType, StatType } from '../../utils/types';

import './CharacterStatsContainer.css';
import CharacterInfoContainer from './CharacterInfoContainer';
import CharacterImage from './CharacterImage';
import CharacterStatsTitle from './CharacterStatsTitle';
import { EquipmentContext } from '../../store/equipment-context';

const CharacterStatsContainer: React.FC<{statsHasChanged?: boolean, itemToCompare?: Item}> = (props) => {
    const userCtx = useContext(UserContext);
    const eqCtx = useContext(EquipmentContext);
    const sendRequest = useHttp<Character[]>('api/character/', 'GET', undefined, userCtx.user?.authToken);

    const [stats, setStats] = useState<Character>({damage: 0, health: 0, armor: 0, magicResist: 0, user: 0});
    const [error, setError] = useState<string | null>('Czekam na pobranie statystyk');

    const getStat = (item: Item, statType: StatType) => {
        const tmpItem = eqCtx[item.itemType];
        if (tmpItem !== undefined) {
            return item[statType] - tmpItem[statType];
        }
        return item[statType];
    }

    const compareStats = () => {
        if (props.itemToCompare) {
            const stats: ItemStatsValues = {
                armor: getStat(props.itemToCompare, 'armor'),
                health: getStat(props.itemToCompare, 'health'),
                damage: getStat(props.itemToCompare, 'damage'),
                magicResist: getStat(props.itemToCompare, 'magicResist')
            }
            return stats;
        }
        return undefined;
    }

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();

            if (code === 200) {
                setStats((prevStats) => ({
                    ...prevStats,
                    damage: data[0].damage,
                    health: data[0].health,
                    armor: data[0].armor,
                    magicResist: data[0].magicResist
                }));
                setError(null);
                console.log('stats updated');
            }
            else {
                console.log('error');
                setError('Nie udało pobrać się danych z serwera');
            }
        };
        getData();
    }, [props.statsHasChanged])

    const statsJSX = <>
        <CharacterImage src={characterImg} />
        <div className='character-stats-container-info'>
            <CharacterInfoContainer statsToCompare={compareStats()} damage={stats!.damage} health={stats!.health} armor={stats!.armor} magicResist={stats!.magicResist} user={stats!.user}/>
        </div>
    </>

    return <div className="character-stats-container">
        <CharacterStatsTitle title='Twoja postać' />
        {error && error}
        {!error && statsJSX}
        </div>
};

export default CharacterStatsContainer;