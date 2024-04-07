// api.js

export async function fetchTestimonials(token) {
  try {
    const res = await fetch("/api/testimonials", {
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
 await new Promise((resolve) => {setTimeout(resolve,3000)});
  try {
    const res = await fetch("/api/timeline/content", {
      method: "GET",
      headers: { Authorization: token },
    });
    const data = await res.json();

    // Sort the data based on the years mentioned in the titles
    data.sort((a, b) => {
      const yearA = parseInt(a.title.match(/\d{4}/)[0]);
      const yearB = parseInt(b.title.match(/\d{4}/)[0]);
      return yearB - yearA; // Sort in descending order
    });

    if (!res.ok) {
     throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function fetchCertificates(token) {
   try {
     const res = await fetch("/api/certificates", {
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

