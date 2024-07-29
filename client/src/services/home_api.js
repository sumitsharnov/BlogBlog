// api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function fetchTestimonials(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/testimonials`, {
      method: "GET",
      headers: { Authorization: token },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// api_call.js

export async function fetchTimeline(token) {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  try {
    const res = await fetch(`${API_BASE_URL}/api/timeline/content`, {
      method: "GET",
      headers: { Authorization: token },
    });
    const data = await res.json();
    // Sort the data based on the years mentioned in the titles
    data.message!== "Invalid token" && data.sort((a, b) => {
      const yearA = parseInt(a.title.match(/\d{4}/)[0]);
      const yearB = parseInt(b.title.match(/\d{4}/)[0]);
      return yearB - yearA; // Sort in descending order
    });

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    if(error.message === "Invalid token") throw new Error("Unauthorized");
    else throw new Error("Something went wrong");
  }
}

export async function fetchCertificates(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/certificates/cfts`, {
      method: "GET",
      headers: { Authorization: token },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function downloadCfts(cft, token) {
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    let res;
    if (cft.name === "All") {
      res = await fetch(`${API_BASE_URL}/api/download/all/files`, {
        method: "GET",
        headers: { Authorization: token },
      });
    } else {
      res = await fetch(
        `${API_BASE_URL}/api/download/${cft.name}.${cft.type}`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );
    }

    // Check if response is successful
    if (res.ok) {
      // Check if response is a ZIP file or PDF file
      const contentType = res.headers.get("content-type");
      if (
        contentType &&
        (contentType.toLowerCase().includes("application/zip") ||
          contentType.toLowerCase().includes("application/pdf"))
      ) {
        const blob = await res.blob();

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element
        const a = document.createElement("a");
        if (cft.name === "All") {
          a.download = `all_files.zip`; // Specify the filename for all files download
        } else {
          a.download = `${cft.name}.${cft.type}`;
        }
        a.href = url;
        a.click(); // Trigger the download

        // Release the object URL
        window.URL.revokeObjectURL(url);
      } else {
        // Handle non-ZIP file response
       await res.text();
        // Log or handle the response accordingly
      }
    } else {
      // Handle error responses
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
  } catch (e) {
    throw new Error("Error downloading file");
  }
}

