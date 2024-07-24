import React, { ChangeEvent, useContext } from "react";
import './Card-list.css'
import { ThemeContext } from "../Context/Context";
import { addItem, deleteItem, deleteAll } from "../store/saveItemSlice";
import { useDispatch, useSelector } from "react-redux";

interface CardListProps {
    data: [],
    search: string,
    onItemSelected: (id: string) => void
}

interface CardListItem {
    name: string,
    url: string,
    title: string
}

const CardList = ({data, onItemSelected, search} : CardListProps) => {

    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);

    const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        if(target.dataset.id !== undefined) {
             const id = +target.dataset.id;
             if(target.checked) {
                dispatch(addItem(data[id]))
            } else {
                dispatch(deleteItem(data[id]))
            }
        }
    }

    const items = data.map((item: CardListItem, idx) => {

        const id = item.url.replace(/\D/gi, '');
        let title = '';
        if (item.name) {
            title = item.name; 
        }else{
            title = item.title;
        } 
        
        const  favChecked: number = favorites.findIndex((favItem: CardListItem) => favItem.name === item.name);
        let chekedValue: boolean = false;
        if (favChecked === -1) {
            // favChecked = 0;
            chekedValue = false;
        } else {
            // favChecked = 1;
            chekedValue = true;
        } 
        return (
            <li className={`list-group-item ${theme}`}
                key={id}
                onClick = {() => onItemSelected(id)}>
                <input type="checkbox" data-id={idx} className="checkItem" onChange={onChecked} checked={chekedValue}/>
                {title}
            </li>
        )
    })

    type MyParentNode = {
        href: string,
        download: string
    }

    const downloadCSV = (e: React.MouseEvent) => {
        const saveItems = favorites.map((item: object) => JSON.stringify(item))
        const blob = new Blob([saveItems], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob)
        const fileName = `${favorites.length}_${search}.csv`
        if (e.target instanceof HTMLElement){
            const link = e.target.parentNode as unknown as MyParentNode;
            link.href= url;
            link.download = fileName;
        }
    }
    
    const deleteAllItems = () => {
        dispatch(deleteAll())
    }

    return (
        <>
            <ul className="item-list list-group">
                {items}
            </ul>
            {favorites.length > 0 && 
                <div>
                    <div className="favorites">{favorites.length} items are selected</div>
                    <div className="btn-fGroup">
                        <button className={theme} onClick={deleteAllItems}>Unselect all</button>
                        <a><button className={theme} onClick={downloadCSV}>Download</button></a>
                    </div>
                </div>
            }
        </>
    )
}

export default CardList;