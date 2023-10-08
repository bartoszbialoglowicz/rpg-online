import { useState } from "react";
import { StoreItem } from "../../utils/types";
import CharacterStatsTitle from "../Character/CharacterStatsTitle";

import './TransactionContainer.css';
import Alert from "../UI/Alert";

const TransactionContainer: React.FC<{transactionItemsBuy: StoreItem[][], transactionItemsSell: StoreItem[][], finishTransactionHandler: () => void}> = (props) => {

    let totalSellAmount = 0;
    let totalBuyAmount = 0;


    const [alertIsVisible, setAlertIsVisible] = useState(false);

    const addTransactionItemJSX = (storeItems: StoreItem[][], sell: boolean) => {
        const items = storeItems.map(arr => {
            // Total price of every item in current group
            const itemsGroupAmount: number = arr.reduce(
                (prev,current) => prev + current.price, 0
            );

            // Set the total price of every items in every group
            if (sell) {
                totalSellAmount += itemsGroupAmount;
            } else {
                totalBuyAmount += itemsGroupAmount;
            }

            // Container with info about item, amount and total price
            return <div className="transaction-item" key={`${arr[0].item.name}${arr.length}`}>
                <span>"testsetestests tes test</span>
                <span>{`${arr.length}x`}</span>
                <span>{itemsGroupAmount}</span>
            </div>
        })
        return items;
    };

    const sellItemsJSX = addTransactionItemJSX(props.transactionItemsSell, true);
    const buyItemsJSX = addTransactionItemJSX(props.transactionItemsBuy, false);

    const finishTransaction = () => {
        props.finishTransactionHandler();
        setAlertIsVisible(false);
    }

    return <div className="transaction-container">
        <CharacterStatsTitle title="TRANSAKCJA"/>
        <div className="transaction-container-items">
            <div className="transaction-item">
                <span>NAZWA</span>
                <span>ILOŚĆ</span>
                <span>CENA</span>
            </div>
            <div>SPRZEDAŻ</div>
            {sellItemsJSX}
            <div>ZAKUP</div>
            {buyItemsJSX}
        </div>
        <div className="transaction-total-amount">
            {`Łącznie: ${totalSellAmount - totalBuyAmount}`}
        </div>
        <div className="transaction-controls">
            <button onClick={() => setAlertIsVisible(true)}>DOKONAJ TRANSAKCJI</button>
        </div>
        {alertIsVisible && <Alert 
            title={'Potwierdź transakcję'} 
            description={`Czy dokonać transakcji?`} 
            buttonText={'POTWIERDŹ'}
            onButtonClick={finishTransaction}
            onOutOfBoxClickHandler={()=>{setAlertIsVisible(false)}}/>
        }
    </div>
    
    
};

export default TransactionContainer;