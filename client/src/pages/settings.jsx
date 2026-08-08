import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

function Settings() {

    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    const [notifications, setNotifications] = useState(
        localStorage.getItem("notifications") !== "false"
    );

    const [emailNotifications, setEmailNotifications] = useState(
        localStorage.getItem("emailNotifications") !== "false"
    );

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    const [showPassword, setShowPassword] = useState(false);

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }

        return () => {
            document.body.classList.remove("dark-theme");
        };
    }, [darkMode]);

    // =========================
    // Toggle Functions
    // =========================

    const handleNotifications = () => {
        const value = !notifications;

        setNotifications(value);
        localStorage.setItem("notifications", value);
    };

    const handleEmailNotifications = () => {
        const value = !emailNotifications;

        setEmailNotifications(value);
        localStorage.setItem("emailNotifications", value);
    };

    const handleDarkMode = () => {
        const value = !darkMode;

        setDarkMode(value);
        localStorage.setItem("darkMode", value);

        if (value) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    };

// =========================
// Password Change
// =========================

const handlePasswordChange = (e) => {
    setPasswordData({
        ...passwordData,
        [e.target.name]: e.target.value,
    });
};

const handleChangePassword = (e) => {

    e.preventDefault();

    if (
        !passwordData.currentPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmPassword
    ) {
        alert("Please fill all password fields.");
        return;
    }

    if (passwordData.newPassword.length < 6) {
        alert("New password must contain at least 6 characters.");
        return;
    }

    if (
        passwordData.newPassword !==
        passwordData.confirmPassword
    ) {
        alert("New passwords do not match.");
        return;
    }

    alert("Password change request submitted successfully.");

    setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    setShowPassword(false);
};

// =========================
// Logout
// =========================

const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
};

// =========================
// Delete Account
// =========================

const handleDeleteAccount = () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Account removed from this device.");

    navigate("/register");
};

return (

    <div className={`settings-page ${darkMode ? "dark" : ""}`}>

        <div className="settings-container">

            {/* Header */}

            <div className="settings-header">

                <div>

                    <h1>⚙ Settings</h1>

                    <p>
                        Manage your SkillSync account and preferences.
                    </p>

                </div>

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

            </div>


            {/* =========================
            Account
        ========================= */}

            <section className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-section-icon">
                        👤
                    </div>

                    <div>
                        <h2>Account Information</h2>
                        <p>Your SkillSync account details</p>
                    </div>

                </div>

                <div className="account-box">

                    <div className="settings-avatar">

                        {storedUser.fullName
                            ?.charAt(0)
                            .toUpperCase() || "S"}

                    </div>

                    <div className="account-details">

                        <h3>
                            {storedUser.fullName || "Student"}
                        </h3>

                        <p>
                            {storedUser.email || "No email available"}
                        </p>

                        <span>
                            {storedUser.role === "student"
                                ? "Student Account"
                                : storedUser.role || "User Account"}
                        </span>

                    </div>

                </div>

            </section>


            {/* =========================
            Preferences
        ========================= */}

            <section className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-section-icon">
                        🎛️
                    </div>

                    <div>
                        <h2>Preferences</h2>
                        <p>Customize your SkillSync experience</p>
                    </div>

                </div>


                {/* Notifications */}

                <div className="setting-row">

                    <div className="setting-info">

                        <div className="setting-icon">
                            🔔
                        </div>

                        <div>
                            <h3>Notifications</h3>

                            <p>
                                Receive important job and application updates.
                            </p>
                        </div>

                    </div>

                    <button
                        className={`switch ${notifications ? "active" : ""
                            }`}
                        onClick={handleNotifications}
                    >
                        <span></span>
                    </button>

                </div>


                {/* Email */}

                <div className="setting-row">

                    <div className="setting-info">

                        <div className="setting-icon">
                            📧
                        </div>

                        <div>
                            <h3>Email Notifications</h3>

                            <p>
                                Get job recommendations and updates by email.
                            </p>
                        </div>

                    </div>

                    <button
                        className={`switch ${emailNotifications ? "active" : ""
                            }`}
                        onClick={handleEmailNotifications}
                    >
                        <span></span>
                    </button>

                </div>


                {/* Dark Mode */}

                <div className="setting-row">

                    <div className="setting-info">

                        <div className="setting-icon">
                            🌙
                        </div>

                        <div>
                            <h3>Dark Mode</h3>

                            <p>
                                Use the dark interface across SkillSync.
                            </p>
                        </div>

                    </div>

                    <button
                        className={`switch ${darkMode ? "active" : ""
                            }`}
                        onClick={handleDarkMode}
                    >
                        <span></span>
                    </button>

                </div>

            </section>


            {/* =========================
            Security
        ========================= */}

            <section className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-section-icon">
                        🔒
                    </div>

                    <div>
                        <h2>Security</h2>
                        <p>Keep your account secure</p>
                    </div>

                </div>


                <div className="security-action">

                    <div>

                        <h3>Change Password</h3>

                        <p>
                            Update your password regularly to keep
                            your account secure.
                        </p>

                    </div>

                    <button
                        className="secondary-btn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword
                            ? "Cancel"
                            : "Change Password"}
                    </button>

                </div>


                {showPassword && (

                    <form
                        className="password-form"
                        onSubmit={handleChangePassword}
                    >

                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                        />

                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                        />

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            Update Password
                        </button>

                    </form>

                )}

            </section>


            {/* =========================
            Danger Zone
        ========================= */}

            <section className="settings-card danger-card">

                <div className="settings-card-header">

                    <div className="settings-section-icon danger-icon">
                        ⚠️
                    </div>

                    <div>
                        <h2>Account Actions</h2>
                        <p>Manage your account session</p>
                    </div>

                </div>


                <div className="danger-actions">

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                    <button
                        className="delete-btn"
                        onClick={handleDeleteAccount}
                    >
                        🗑️ Delete Account
                    </button>

                </div>

            </section>

        </div>

    </div>
);
}

export default Settings;