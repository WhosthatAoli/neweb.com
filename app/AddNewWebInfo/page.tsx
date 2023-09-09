'use client'
import { useState } from 'react';
import Banner from "../../components/banner";


export default function AddWebsite() {
  const [formData, setFormData] = useState({
    name: '',
    img: '',
    url: '',
    description: '',
    feature: ''
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form data", formData);
    
  };

  return (
    <div>
      <Banner />
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-8">Add Website</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-2 w-full border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL:</label>
            <input type="text" value={formData.img} onChange={(e) => setFormData({ ...formData, img: e.target.value })}
              className="p-2 w-full border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Website URL:</label>
            <input type="text" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="p-2 w-full border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description:</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="p-2 w-full border rounded-md" rows={4}></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Feature:</label>
            <input type="text" value={formData.feature} onChange={(e) => setFormData({ ...formData, feature: e.target.value })}
              className="p-2 w-full border rounded-md" />
          </div>

          <div>
            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
