import { useContext } from 'react';
import './StatsContainer.css';
import { StatsContext } from '../../store/stats-context';
import StatsItem from './StatsItem';

import armour from '../../assets/svgs/armoury-body-svgrepo-com.svg';
import sword from '../../assets/svgs/sword-svgrepo-com.svg';
import pentagon from '../../assets/svgs/pentagon-svgrepo-com.svg';
import health from '../../assets/svgs/health-svgrepo-com.svg';

const StatsContainer = () => {

    const statsCtx = useContext(StatsContext);
    const allStats = statsCtx.getAllStats();

    return <div className='stats-container'>
        <StatsItem name='HP' value={allStats.health} svgSrc={health} cssName='hp'/>
        <StatsItem name='Damage' value={allStats.damage} svgSrc={sword} cssName='damage'/>
        <StatsItem name='Armor' value={allStats.armor} svgSrc={armour} cssName='armor'/>
        <StatsItem name="Magic Resist" value={allStats.magicResist} svgSrc={pentagon} cssName='magic-resist'/> 
    </div>
};

export default StatsContainer;