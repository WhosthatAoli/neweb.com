import React from 'react';
import WebsiteListItem from './WebsiteListItem';

interface Props {
    data: any[];
    onDelete: (name: string) => void;
    onEdit: (item: any) => void;
    editingItem: any;
}

function WebsiteList({ data, onDelete, onEdit, editingItem }: Props) {
    return (
        <ol>
            {data?.map((item: any, index: number) => (
                <WebsiteListItem key={index} item={item} onDelete={onDelete} onEdit={onEdit} editingItem={editingItem} />
            ))}
        </ol>
    );
}

export default WebsiteList;

