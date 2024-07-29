const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const updateProfilePhoto = async (requestOptions) => {
  const response = await fetch(`${API_BASE_URL}/api/profile/photo/update`, requestOptions);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response;
};

export const updateProfilePhotoURL = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/profile/photo/find`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response;
};

export const deleteProfilePhoto = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/profile/photo/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response;
};
