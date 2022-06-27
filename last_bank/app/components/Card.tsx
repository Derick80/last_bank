import React, { ReactNode } from 'react'

type Props<Item, As extends React.ElementType> = {
    items: Item[]
    renderItem?: (item: Item) => React.ReactNode
    as?: As
    key?: string
}
export default function Card<Item, As extends React.ElementType> ({
    items,
    renderItem,
    as,
    key,
    ...rest
}: Props<Item, As> & Omit<React.ComponentPropsWithoutRef<As>, keyof Props<Item, As>>) {
    return <div className="card" { ...rest }>{ items.map(item => {
        return <CardListItem renderItem={ item } key={ item } />
    }) }</div>;
}

const CardListItem = ({ props }: any) => {
    return (
        <>
            <div className="card" key={ props.id }>
                <div>{ props.source }</div>
            </div>
        </>
    );
};