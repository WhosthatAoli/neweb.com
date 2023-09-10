"use client";
import React, { useState } from "react";
import Banner from "../../components/banner";
import { features, web3_features, GameFiHubFeatures } from "../../constant";
import { join } from "path";

export default function AddWebsite() {
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    url: "",
    description: "",
    feature: [] as string[],
  });
  const [featuresData, setFeaturesData] = useState<string[]>(
    [...new Set([...features, ...web3_features, ...GameFiHubFeatures])]
  );

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
        response.json().then((data) => {
          console.log("data: ", data);
        });
        alert("Test successfully.");
      } else {
        const { error } = await response.json();
        alert(error);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Banner />
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
                      setFormData(prev => ({
                        ...prev,
                        feature: [...prev.feature, feature]
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        feature: prev.feature.filter(f => f !== feature)
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
      </div>
    </div>
  );
}
