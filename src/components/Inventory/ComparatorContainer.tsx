import { useContext, useEffect } from 'react';
import './ComparatorContainer.css';
import { StatsContext } from '../../store/stats-context';
import ItemContainer from './ItemContainer';
import Button from '../UI/Button';
import { Item, ItemRarity } from '../../types/ItemTypes';
import { InventoryContext } from '../../store/inventory-context';

const ComparatorContainer: React.FC = () => {
    const statsCtx = useContext(StatsContext);
    const inventoryCtx = useContext(InventoryContext);

    const comparedItem = statsCtx.comparedItem;
    const equippedItem = statsCtx.equippedItem;

    const renderStatComparison = (statName: string, comparedValue: number, equippedValue: number) => {
        const difference = comparedValue - equippedValue;
        const differenceClass = difference > 0 ? 'stat-positive' : difference < 0 ? 'stat-negative' : '';

        return (
            <div className="stat-row" key={statName}>
                <span className="stat-name">{statName}:</span>
                <span className="stat-value">{comparedValue}</span>
                <span className={`stat-difference ${differenceClass}`}>
                    {difference !== 0 ? `(${difference > 0 ? '+' : ''}${difference})` : ''}
                </span>
            </div>
        );
    };

    const renderItemRarity = (rarity: ItemRarity) => {
        let name = '';
        switch (rarity) {
            case 'common':
                name = 'Zwykły';
                break;
            case 'rare':
                name = 'Rzadki';
                break;
            case 'mythic':
                name = 'Mityczny';
                break;
            case 'legendary':
                name = 'Legendarny';
                break;
        }

        return name;
    }

    const replaceItemHandler = (item: Item) => {
        try {
            inventoryCtx.replaceEquipmentItem(item);
        } catch(error) {
            // TODO: show alert
            
        }
    }

    useEffect(() => {
        return () => {
            statsCtx.clearComparedItem();
        }
    }, []);

    return (
        <div className="comparator-container">
            {comparedItem && equippedItem && (
                <>
                    <div className="comparator-container-item">
                        <div className="comparator-container-item-image">
                            <ItemContainer item={comparedItem} />
                        </div>
                        <div className={`comparator-container-item-name`}>{comparedItem.name}</div>
                        <div className={`comparator-container-item-rarity rarity-${comparedItem.rarity}`}>{renderItemRarity(comparedItem.rarity)}</div>
                        <div className="comparator-container-item-lvl">Wymagany poziom: {comparedItem.lvlRequired}</div>
                    </div>
                    <div className="comparator-stats">
                        {renderStatComparison('Obrona', comparedItem.armor || 0, equippedItem.armor || 0)}
                        {renderStatComparison('Magiczna odporność', comparedItem.magicResist || 0, equippedItem.magicResist || 0)}
                        {renderStatComparison('Zdrowie', comparedItem.health || 0, equippedItem.health || 0)}
                        {renderStatComparison('Obrażenia', comparedItem.damage || 0, equippedItem.damage || 0)}
                        {renderStatComparison('Szansa na cios krytyczny', comparedItem.criticalHitChance || 0, equippedItem.criticalHitChance || 0)}
                        {renderStatComparison('Obrażenia krytyczne', comparedItem.criticalHitDamage || 0, equippedItem.criticalHitDamage || 0)}
                    </div>
                    <div className='comparator-actions'>
                        <Button text='ZAŁÓŻ' onClickHandler={() => {replaceItemHandler(comparedItem)}}/>
                    </div>
                </>
            )}
        </div>
    );
};

export default ComparatorContainer;
