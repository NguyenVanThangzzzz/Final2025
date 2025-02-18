import { motion } from "framer-motion";
import { Loader, Save, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useCinemaStore } from "../../Store/cinemaStore";

const EditCinemaForm = ({ cinema, onClose }) => {
  const { updateCinema, loading, fetchAllCinemas } = useCinemaStore();
  
  // Define requiredFields outside of handleSubmit
  const requiredFields = {
    name: "Cinema Name",
    country: "Country",
    state: "State", 
    streetName: "Street Name"
  };

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    state: "",
    streetName: "",
    postalCode: "",
    phoneNumber: "",
    image: "",
  });

  useEffect(() => {
    if (cinema) {
      setFormData({
        name: cinema.name || "",
        country: cinema.country || "",
        state: cinema.state || "",
        streetName: cinema.streetName || "",
        postalCode: cinema.postalCode || "",
        phoneNumber: cinema.phoneNumber || "",
        image: cinema.image || "",
      });
    }
  }, [cinema]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    const emptyFields = [];
    
    if (!formData.name?.trim()) emptyFields.push("Cinema Name");
    if (!formData.country?.trim()) emptyFields.push("Country");
    if (!formData.state?.trim()) emptyFields.push("State");
    if (!formData.streetName?.trim()) emptyFields.push("Street Name");

    // Nếu có trường bắt buộc bị bỏ trống
    if (emptyFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${emptyFields.join(", ")}`
      );
      return;
    }

    // Validate image if it's a new upload
    if (formData.image && formData.image.startsWith('data:image')) {
      const imageSize = formData.image.length * (3 / 4) - 
        (formData.image.match(/=/g) ? formData.image.match(/=/g).length : 0);
      if (imageSize > 10 * 1024 * 1024) {
        toast.error("Image size exceeds 10MB limit.");
        return;
      }
    }

    try {
      await updateCinema(cinema._id, formData);
      await fetchAllCinemas();
      onClose();
    } catch (error) {
      console.error("Error updating cinema:", error);
    }
  };

  // Kiểm tra khi người dùng thay đổi giá trị input
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Nếu xóa hết nội dung của trường bắt buộc
    if (!value.trim() && ['name', 'country', 'state', 'streetName'].includes(field)) {
      toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, image: "" });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-gray-800 rounded-lg p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
          Edit Cinema
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Cinema Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
              required
            />
          </div>

          {/* Street Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Street Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.streetName}
              onChange={(e) => handleInputChange('streetName', e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
              required
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Postal Code
            </label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
            />
          </div>

          {/* Image Upload */}
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Change Image
            </label>
          </div>

          {formData.image && (
            <div className="relative mt-2">
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={handleImageRemove}
                className="absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white"
                style={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &times;
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditCinemaForm;