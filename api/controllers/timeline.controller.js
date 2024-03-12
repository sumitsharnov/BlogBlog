import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const timeline = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    // If no token is found, return 401 Unauthorized
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object for future use
    req.userId = decoded.id;

    // Example content data
    const content = [
      {
        image: `${process.env.BASE_URL}/images/3PillarGlobal.jpg`,
        url: "https://www.3pillarglobal.com/",
        title: "3Pillar Global | 2021 - current",
        description:
          "I actively contributed to the development of MERN stack applications, utilizing tools such as React for frontend development, Node.js and Express.js for backend implementation, and MongoDB for database management. My focus was on building responsive and scalable web applications while collaborating with teams to ensure efficient development workflows and optimal user experiences.",
        content: "3Pillar Global",
      },
      {
        image: `${process.env.BASE_URL}/images/nagarro.png`,
        title: "Nagarro",
        description:
          "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
        content: "Nagarro",
      },
      {
        image: `${process.env.BASE_URL}/images/img3.jpg`,
        title: "Version control",
        description:
          "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: "Version control",
      },
      {
        title: "Running out of content",
        description:
          "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: "Running out of content",
      },
      {
        title: "Running out of content",
        description:
          "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: "Running out of content",
      },
      {
        title: "Running out of content",
        description:
          "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: "Running out of content",
      },
      {
        title: "Sumit",
        description:
          "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: "Running out of content",
      },
    ];

    // Return the content JSON as a response
    res.status(200).json(content);
  } catch (error) {
    // If token verification fails, return 403 Forbidden
    return res.status(403).json({ message: "Invalid token" });
  }
};
