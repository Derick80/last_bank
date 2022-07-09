import React from 'react'


type CardProps<Item, As extends React.ElementType> = {
    items: Item[]
    renderItem: (item: Item) => JSX.Element
    children?: React.ReactNode[] | React.ReactElement[] | JSX.Element[] | JSX.Element | React.ReactChild
    | React.ReactChild[];
    as?: As


}
export function CardList<Item, As extends React.ElementType> ({ items, renderItem, as, ...rest }: CardProps<Item, As> & Omit<React.ComponentPropsWithoutRef<As>, keyof CardProps<Item, As>>) {
    const Component = as ?? "div";
    return <Component { ...rest }>{ items.map(renderItem) }</Component>;
}
