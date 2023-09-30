import React from 'react';

type FormProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formData: any;
    setFormData: any;
    featuresData: any;
    isLoading: boolean;
    setImgFile: any;
    imgFile: any;
}

function Form({ onSubmit, formData, setFormData, featuresData, isLoading,imgFile, setImgFile }: FormProps) {
    const [imgUrl, setImgUrl] = React.useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImgUrl(url);
            setImgFile(file);
            const filePath = "/screenshots/"+file.name;
            setFormData({ ...formData, img: filePath });
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-2">Name: (required)</label>
                <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    className="p-2 w-full border rounded-md"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Image File:</label>
                <input type="file" onChange={handleFileChange} key={imgFile}/>
                {imgUrl && imgFile && <img src={imgUrl} alt="Chosen" />}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Website URL: (required)
                </label>
                <input
                    required
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
                <label className="block text-sm font-medium mb-2">Feature: (required)</label>
                {featuresData.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id={`feature_${index}`}
                            value={feature}
                            checked={formData.feature.includes(feature)}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    setFormData((prev: { name: string, img: string, url: string, description: string, feature: string[] }) => ({
                                        ...prev,
                                        feature: [...prev.feature, feature],
                                    }));
                                } else {
                                    setFormData((prev: { name: string, img: string, url: string, description: string, feature: string[] }) => ({
                                        ...prev,
                                        feature: prev.feature.filter((f: string) => f !== feature),
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
                    disabled={isLoading}
                    className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Add
                </button>
                {isLoading && <span className="ml-4">Loading...</span>}
            </div>
        </form>
    );
}

export default Form;
