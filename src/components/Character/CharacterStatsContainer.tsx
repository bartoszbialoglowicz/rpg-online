import { useContext, useEffect, useState } from 'react';
import characterImg from '../../assets/images/tmp_avatar2.png';
import { useHttp } from '../../hooks/use-http';
import { UserContext } from '../../store/user-context';
import { Character } from '../../utils/types';

import './CharacterStatsContainer.css';
import CharacterInfoContainer from './CharacterInfoContainer';
import CharacterImage from './CharacterImage';
import CharacterStatsTitle from './CharacterStatsTitle';

const CharacterStatsContainer = () => {
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<Character[]>('api/character/', 'GET', undefined, userCtx.user?.authToken);

    const [stats, setStats] = useState<Character>({damage: 0, health: 0, armor: 0, magicResist: 0, user: 0});
    const [error, setError] = useState<string | null>('Czekam na pobranie statystyk');

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();

            if (code === 200) {
                setStats(data[0]);
                setError(null);
            }
            else {
                console.log('error');
                setError('Nie udało pobrać się danych z serwera');
            }
        };

        getData();
    }, [])

    const statsJSX = <>
        <CharacterImage src={characterImg} />
        <div className='character-stats-container-info'>
            <CharacterInfoContainer damage={stats!.damage} health={stats!.health} armor={stats!.armor} magicResist={stats!.magicResist} user={stats!.user}/>
        </div>
    </>

    return <div className="character-stats-container">
        <CharacterStatsTitle title='Twoja postać' />
        {error && error}
        {!error && statsJSX}
        </div>
};

export default CharacterStatsContainer;