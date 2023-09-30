import firebase_app from "@/app/api/firebaseApi/firebaseConfig";
import { getDatabase, ref, set, child, get, remove } from "firebase/database";
import {
    getStorage,
    ref as ref_storage,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import path from "path";
import { FormDataType } from "@/app/lib/types";

// 获取所有网站数据
const getAllWebsiteData = async () => {
    const dbRef = ref(getDatabase(firebase_app));
    const snapshot = await get(child(dbRef, `server/websitesData/`));
    if (snapshot.exists()) {
        // console.log(snapshot.val());
        const websitesData = snapshot.val();
        const showData = [];
        for (const key in websitesData) {
            const eachWebsite = websitesData[key];
            try {
                eachWebsite.img = await downloadImageFile(eachWebsite.img);
                //console.log("eachWebsite.web: ", eachWebsite);
            } catch (error) {
                console.log(eachWebsite.name + " image file not found.");
                eachWebsite.img = "";
            }
            showData.push(eachWebsite);
        }
        return showData;
    } else {
        console.log("No data available");
        return [];
    }
};

// 验证表单数据, feature 至少选择一个
const validateFormData = (formData: FormDataType): void => {
    if (formData.feature.length === 0) {
        // return "Please select at least one feature.";
        alert("Please select at least one feature.");
        throw new Error("Please select at least one feature.");
    }
};

// 发送截图请求给后端
const takeScreenshotAndUploadImgToFirebase = async (formData: FormDataType) => {
    // 发送 api 请求, 截图并上传图片到 firebase
    const response = await fetch("/api/takeScreenshotAndUploadImgToFirebase", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    // 如果请求失败, 抛出错误
    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
    }
    // 如果请求成功, 查看返回的数据
    const data = await response.json();
    console.log("data: ", data);
};

// 上传图片文件
const uploadImageFile = async (
    imgFile: File,
    formData: FormDataType
): Promise<void> => {
    const storage = getStorage(firebase_app);
    const imgPath = path.resolve("/screenshots/" + formData.name + ".png");
    const storageRef = ref_storage(storage, imgPath);
    await uploadBytes(storageRef, imgFile);
    console.log("Uploaded a blob or file!");
};

// 更新数据库
const updateDatabase = async (formData: FormDataType): Promise<void> => {
    const sendFormData = {
        ...formData,
        feature: formData.feature.join(","),
        img: "/screenshots/" + formData.name + ".png",
    };
    const db = getDatabase(firebase_app);
    await set(ref(db, "server/websitesData/" + sendFormData.name), {
        ...sendFormData,
    });
};

// 更新来自表单的数据到数据库
const updateFormData = async (formData: FormDataType, imgFile: File | null) => {
    try {
        validateFormData(formData);
        // 如果有图片文件, 上传图片文件, 否则发送截图请求给后端并上传图片到 firebase
        if (imgFile !== null) {
            await uploadImageFile(imgFile, formData);
        } else {
            await takeScreenshotAndUploadImgToFirebase(formData);
        }
        // 更新数据库
        await updateDatabase(formData);
        return true;
    } catch (error) {
        console.error("error: ", error);
        alert("An error occurred. Please try again: " + error);
        return false;
    }
};

// 删除数据库中的数据
const deleteDatabaseData = async (websiteName: string) => {
    const db = getDatabase(firebase_app);
    remove(ref(db, "server/websitesData/" + websiteName));
    await deleteImageFile("/screenshots/" + websiteName + ".png");
};

// 下载图片文件
const downloadImageFile = async (imgPath: string) => {
    const storage = getStorage(firebase_app);
    const starsRef = ref_storage(storage, imgPath);
    try {
        const url = await getDownloadURL(starsRef);
        return url;
    } catch (error) {
        throw new Error(error as string);
    }
};

// 删除图片文件
const deleteImageFile = async (imgPath: string) => {
    const storage = getStorage(firebase_app);
    const desertRef = ref_storage(storage, imgPath);
    try {
        await deleteObject(desertRef);
    } catch (error) {
        throw new Error(error as string);
    }
};

export {
    getAllWebsiteData,
    uploadImageFile,
    updateFormData,
    deleteDatabaseData,
};
