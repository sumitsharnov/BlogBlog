export const updateProfilePhoto = async (requestOptions) => {
  const response = await fetch("/api/profile/photo/update", requestOptions);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response;
};

export const updateProfilePhotoURL = async (formData) => {
  const response = await fetch("/api/profile/photo/find", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  console.log(response)
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response;
};
