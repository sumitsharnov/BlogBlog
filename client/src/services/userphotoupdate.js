export const updateProfilePhoto = async (requestOptions) => {
  const response = await fetch("/api/profile/photo/update", requestOptions);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response;
};
