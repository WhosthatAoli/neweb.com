import React from 'react';

interface WebsiteListItemProps {
    item: {
        name: string;
        img: string;
        url: string;
        description: string;
        feature: string;
    };
    onDelete: (name: string) => void;
    onEdit: (item: any) => void;
    editingItem: any;
}

function WebsiteListItem({ item, onDelete, onEdit, editingItem }: WebsiteListItemProps) {
    return (
        <li className="list-decimal">
            <p>------------------------------</p>
            <ul className="list-disc">
                {editingItem && editingItem.name === item.name ? (
                    <>
                        <li>
                            Name:
                            <input
                                type="text"
                                className="p-2 w-full border rounded-md"
                                value={editingItem.name}
                                onChange={(e) => onEdit({ ...editingItem, name: e.target.value })}
                            />
                        </li>
                        <li>Name: {item.name}</li>
                        <li>Image URL: {item.img}</li>
                        <li>
                            Website URL:{" "}
                            <a href={item.url} target="_blank" className="text-blue-600">
                                {item.url}
                            </a>
                        </li>
                        <li>Description: {item.description}</li>
                        <li>Feature: {item.feature}</li>
                        <li>
                            <button className="mt-2 ml-2 bg-green-500 text-white p-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">Update</button>
                            <button onClick={() => onEdit(null)} className="mt-2 ml-2 bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Cancel</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>Name: {item.name}</li>
                        <li>Image URL: {item.img}</li>
                        <li>
                            Website URL:{" "}
                            <a href={item.url} target="_blank" className="text-blue-600">
                                {item.url}
                            </a>
                        </li>
                        <li>Description: {item.description}</li>
                        <li>Feature: {item.feature}</li>
                        <li>
                            <button
                                onClick={() => onDelete(item.name)}
                                className="mt-2 bg-red-500 text-white p-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => onEdit(item)}
                                className="mt-2 ml-2 bg-yellow-500 text-white p-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            >
                                Edit
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </li>
    );
}

export default WebsiteListItem;
