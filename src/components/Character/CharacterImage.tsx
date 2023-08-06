import './CharacterImage.css';

const CharacterImage: React.FC<{src: string}> = (props) => {
    return <div className="character-stats-container-image">
        <div className='character-stats-container-image-content'>
            <img src={props.src} alt="Character Avatar" />
        </div>
</div>
}

export default CharacterImage;