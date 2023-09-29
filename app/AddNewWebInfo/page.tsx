"use client";
import React, { useState } from "react";
import { features, web3_features, GameFiHubFeatures } from "../lib/constant";
import Navbar from "@/app/components/navbar";
import firebase_app from "@/app/api/firebaseApi/firebaseConfig";
import { getDatabase, ref, set, child, get, remove } from "firebase/database";
import Form from "./Form";
import WebsiteList from "./WebsiteList";
import { getStorage, ref as ref_storage, uploadBytes } from "firebase/storage";
import path from "path";

export default function AddWebsite() {
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    url: "",
    description: "",
    feature: [] as string[],
  });
  const [featuresData, _] = useState<string[]>([
    ...new Set([...features, ...web3_features, ...GameFiHubFeatures]),
  ]);
  const [showData, setShowData] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);

  // 添加新数据
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 检查 feature 是否为空
    if (formData.feature.length === 0) {
      alert("Please select at least one feature.");
      return;
    }
    const db = getDatabase(firebase_app);
    const sendFormData = {
      ...formData,
      feature: formData.feature.join(","),
    };
    try {
      setIsLoading(true);
      const response = await fetch("/api/addNewWebInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendFormData),
      });
      if (response.ok) {
        const data = await response.json();
        if (imgFile !== null) {
          const storage = getStorage(firebase_app);
          const imgPath = path.resolve(
            "/screenshots/" + formData.name + ".png"
          );
          const storageRef = ref_storage(storage, imgPath);
          uploadBytes(storageRef, imgFile).then((snapshot) => {
            console.log("Uploaded a blob or file!");
          });
        }
        sendFormData.img = data.img;
        set(ref(db, "server/websitesData/" + sendFormData.name), {
          ...sendFormData,
        });
        alert("Website added successfully.");
        // 刷新输入框
        setFormData({
          name: "",
          img: "",
          url: "",
          description: "",
          feature: [],
        });

        // 刷新列表
        getAllWebsiteData();
      } else {
        const { error } = await response.json();
        alert(error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("error: ", error);
      alert("An error occurred. Please try again.");
    }
  };

  // 获取所有数据
  const handleTestBtn = async () => {
    getAllWebsiteData();
  };

  // 删除条目
  const handleDelete = async (websiteName: string) => {
    const db = getDatabase(firebase_app);
    console.log("websiteName: ", websiteName);
    remove(ref(db, "server/websitesData/" + websiteName));
    // 刷新列表
    getAllWebsiteData();
  };

  // switch 到修改条目
  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  // 更新条目
  const handleUpdate = async () => {};

  // ==================== help func ====================
  const getAllWebsiteData = async () => {
    const dbRef = ref(getDatabase(firebase_app));
    get(child(dbRef, `server/websitesData/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          const websitesData = snapshot.val();
          const showData = [];
          for (const key in websitesData) {
            const eachWebsite = websitesData[key];
            showData.push(eachWebsite);
          }
          setShowData(showData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-8">Add Website</h1>
        <Form
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          featuresData={featuresData}
          isLoading={isLoading}
          setImgFile={setImgFile}
        />
        <button
          type="button"
          onClick={handleTestBtn}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          TEST-GetAllData
        </button>
        <WebsiteList
          data={showData}
          onDelete={handleDelete}
          onEdit={handleEdit}
          editingItem={editingItem}
        />
      </div>
    </div>
  );
}
