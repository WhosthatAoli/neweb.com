"use client";
import React, { useState } from "react";
import { features, web3_features, GameFiHubFeatures } from "../lib/constant";
import Navbar from "@/app/components/navbar";
import Form from "./Form";
import WebsiteList from "./WebsiteList";
import {getAllWebsiteData, updateFormData, deleteDatabaseData} from "@/app/api/firebaseApi/firebaseFunc";
import { FormDataType } from "@/app/lib/types";

export default function AddWebsite() {
  const [formData, setFormData] = useState<FormDataType>({
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
    setIsLoading(true);
    await updateFormData(formData, imgFile);
    setIsLoading(false);
    // 刷新列表
    setShowData(await getAllWebsiteData());
    // 清空表单
    setFormData({
      name: "",
      img: "",
      url: "",
      description: "",
      feature: [] as string[],
    });
    setImgFile(null);
  };

  // 获取所有数据
  const handleTestBtn = async () => {
    setShowData(await getAllWebsiteData());
  };

  // 删除条目
  const handleDelete = async (websiteName: string) => {
    deleteDatabaseData(websiteName);
    // 刷新列表
    setShowData(await getAllWebsiteData());
  };

  // switch 到修改条目
  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  // 更新条目
  const handleUpdate = async () => {};

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
          imgFile={imgFile}
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
