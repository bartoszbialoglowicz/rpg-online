import './CharacterStatsTitle.css';

const CharacterStatsTitle: React.FC<{title: string}> = (props) => {
    return <div className='character-stats-container-title'>
    <h3>{props.title}</h3>
</div>
};

export default CharacterStatsTitle;