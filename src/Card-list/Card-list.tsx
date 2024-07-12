import React, {MouseEventHandler} from "react";
import './Card-list.css'

interface CardListProps {
    data: [],
    onItemSelected: (id: string) => void
}

interface CardListItem {
    name: string,
    url: string,
    title: string
}
const CardList = ({data, onItemSelected} : CardListProps) => {

    // const {data, onItemSelected} = props;
    const items = data.map((item: CardListItem) => {
        const id = item.url.replace(/\D/gi, '');
        let title = '';
        (item.name) ? title = item.name : title = item.title;
        return (
            <li className="list-group-item"
            key={id}
            onClick = {() => onItemSelected(id)}>
                {title}
            </li>
        )
    })
  
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
}

export default CardList;