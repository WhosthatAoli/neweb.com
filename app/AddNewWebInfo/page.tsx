"use client";
import React, { useState } from "react";
import Banner from "../../components/banner";
import { features, web3_features, GameFiHubFeatures } from "../../constant";
import { join } from "path";
import Navbar from "@/components/navbar";

export default function AddWebsite() {
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    url: "",
    description: "",
    feature: [] as string[],
  });
  const [featuresData, setFeaturesData] = useState<string[]>([
    ...new Set([...features, ...web3_features, ...GameFiHubFeatures]),
  ]);
  const [showData, setShowData] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // array to string
    const sendFormData = {
      ...formData,
      feature: formData.feature.join(","),
    };
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendFormData),
      });
      if (response.ok) {
        response.json().then((data) => {
          console.log("response info: ", data);
          setShowData(data.websitesData);
        });
        alert("Website added successfully.");
        setFormData({
          name: "",
          img: "",
          url: "",
          description: "",
          feature: [],
        });
      } else {
        const { error } = await response.json();
        alert(error);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleTestBtn = async () => {
    try {
      const response = await fetch("/api", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        response.json().then((rawData) => {
          console.log("rawData: ", rawData);
          setShowData(rawData.websitesData);
        });
      } else {
        const { error } = await response.json();
        alert(error);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleDelete = async (websiteName: string) => {
    try {
      const response = await fetch("/api", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteName }),
      });
      if (response.ok) {
        alert("Website deleted successfully.");
        // 更新状态，移除已经删除的条目
        setShowData((prev) => prev.filter((item) => item.name !== websiteName));
      } else {
        const { error } = await response.json();
        alert(error);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  const handleUpdate = async () => {
    if (editingItem) {
      // Assuming you have an endpoint to handle item updates.
      try {
        const response = await fetch("/api/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingItem),
        });
        if (response.ok) {
          alert("Item updated successfully.");
          // Update the item in the showData state or fetch all data again.
          handleTestBtn(); // This function fetches all data.
        } else {
          const { error } = await response.json();
          alert(error);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
      setEditingItem(null); // Reset the editing item.
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-8">Add Website</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL:</label>
            <input
              type="text"
              value={formData.img}
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
              className="p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Website URL:
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description:
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="p-2 w-full border rounded-md"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Feature:</label>
            {featuresData.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`feature_${index}`}
                  value={feature}
                  checked={formData.feature.includes(feature)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      setFormData((prev) => ({
                        ...prev,
                        feature: [...prev.feature, feature],
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        feature: prev.feature.filter((f) => f !== feature),
                      }));
                    }
                  }}
                />
                <label htmlFor={`feature_${index}`}>{feature}</label>
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Add
            </button>
          </div>
        </form>
        <button
          type="button"
          onClick={handleTestBtn}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          TEST-GetAllData
        </button>
        <ol>
          {showData?.map((item, index) => (
            <li key={index} className="list-decimal">
              <p>------------------------------</p>
              <ul className="list-disc">
                {editingItem && editingItem.name === item.name ? (
                  <>
                    {/* This is the editing form */}
                    <li>
                      Name:
                      <input
                        type="text"
                        className="p-2 w-full border rounded-md"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
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
                    {/* Add other fields similarly... */}
                    <li>
                      <button onClick={handleUpdate} className="mt-2 ml-2 bg-green-500 text-white p-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">Update</button>
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
                        onClick={() => handleDelete(item.name)}
                        className="mt-2 bg-red-500 text-white p-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="mt-2 ml-2 bg-yellow-500 text-white p-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      >
                        Edit
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
