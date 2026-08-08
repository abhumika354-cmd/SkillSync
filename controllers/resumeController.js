const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

// =========================
// Upload Resume
// =========================
exports.uploadResume = async (req, res) => {
    try {

        console.log("========== Resume Upload ==========");
        console.log("File Received:", req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume",
            });
        }

        const streamUpload = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "SkillSync/Resumes",
                        resource_type: "raw",
                    },
                    (error, result) => {
                        if (error) {
                            console.log("Cloudinary Error:", error);
                            return reject(error);
                        }

                        resolve(result);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        console.log("Uploading to Cloudinary...");

        const result = await streamUpload();

        const user = await User.findById(req.user._id);

        user.resume = result.secure_url;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Resume Uploaded Successfully",
            resume: result.secure_url,
        });

    } catch (error) {

        console.log("Resume Upload Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};