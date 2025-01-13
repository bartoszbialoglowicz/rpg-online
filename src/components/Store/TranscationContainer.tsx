import { useState } from "react";
import { StoreItem } from "../../types/StoreTypes";

import './TransactionContainer.css';
import Alert from "../UI/Alert";
import Button from "../UI/Button";

type Props = {
    transactionItemsBuy: StoreItem[], 
    transactionItemsSell: StoreItem[], 
    finishTransactionHandler: (amount: number) => void,
    removeTranscationItem: (item: StoreItem, isUserItem: boolean) => void
}

const TransactionContainer: React.FC<Props> = (props) => {

    let totalSellAmount = 0;
    let totalBuyAmount = 0;

    const [alertIsVisible, setAlertIsVisible] = useState(false);

    const removeTranscationItemHandler = (item: StoreItem, isUserItem: boolean) => {
        props.removeTranscationItem(item, isUserItem);
    }

    const addTransactionItemJSX = (storeItems: StoreItem[], sell: boolean) => {
        const items = storeItems.map((el, index) => { 
            if (sell)
                totalSellAmount += el.price;
            else
                totalBuyAmount += el.price;
            // Container with info about item, amount and total price
            return <div className="transaction-item" key={index}>
                <span>{el.item.name}</span>
                <span>{el.price}</span>
                <span onClick={() => {removeTranscationItemHandler(el, sell)}}>{`[-]`}</span>
            </div>
        })
        return items;
    };

    const sellItemsJSX = addTransactionItemJSX(props.transactionItemsSell, true);
    const buyItemsJSX = addTransactionItemJSX(props.transactionItemsBuy, false);

    const finishTransaction = () => {
        props.finishTransactionHandler(totalSellAmount - totalBuyAmount);
        setAlertIsVisible(false);
    }

    const alertHandler = () => {
        if (props.transactionItemsBuy.length === 0 && props.transactionItemsSell.length === 0)
            return
        setAlertIsVisible(true);
    }

    return <div className="transaction-container">
    <div className="transaction-header">
        <span>NAZWA</span>
        <span>CENA</span>
        <span/>
    </div>
    <div className="transaction-section">
        <h3>SPRZEDAŻ</h3>
        {sellItemsJSX}
    </div>
    <div className="transaction-section">
        <h3>ZAKUP</h3>
        {buyItemsJSX}
    </div>
    <div className="transaction-total-amount">
        {`Łącznie: ${totalSellAmount - totalBuyAmount}`}
    </div>
    <Button text="DOKONAJ TRANSAKCJI" onClickHandler={alertHandler} />
    {alertIsVisible && (
        <Alert
            title={'Potwierdź transakcję'}
            description={`Czy dokonać transakcji?`}
            buttonText={'POTWIERDŹ'}
            onButtonClick={finishTransaction}
            onOutOfBoxClickHandler={() => setAlertIsVisible(false)}
        />
    )}
</div>

    
    
};

export default TransactionContainer;