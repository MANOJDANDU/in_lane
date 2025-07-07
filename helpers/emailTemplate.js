"use strict";
const express = require("express");
const app = express();
app.use(express.json());

class MailTemplates {
    async userWelcomeMail(userId, name) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to RND Family</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .header {
                        background-color:rgb(146, 240, 23);
                        color: #ffffff;
                        text-align: center;
                        padding: 20px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .content p {
                        margin: 15px 0;
                        font-size: 16px;
                        color: #333333;
                    }
                    .footer {
                        background-color: #f1f1f1;
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #666666;
                    }
                    a {
                        color:rgb(8, 12, 113);
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Header -->
                    <div class="header">
                        <h1>Welcome to the LANE Family!</h1>
                    </div>
                    <!-- Content -->
                    <div class="content">
                        <p>Dear ${name} ,</p>
                        <p>User ID: ${userId}</p>
                        <p>
                            Thank you for registering with LANE! We are delighted to have you as part of our community.
                        </p>
                        <p>
                            You have successfully Submitted the documents, Once documents verified you will get notification.
                        </p>
                        <p>
                            If you have any questions or need assistance, please do not hesitate to contact our support team.
                        </p>
                        <p>
                            Welcome aboard, and we look forward!
                        </p>
                        <p style="font-weight: bold;">Warm regards,</p>
                        <p style="font-weight: bold;">The LANE Team</p>
                    </div>
                    <!-- Footer -->
                    <div class="footer">
                        &copy; 2025 LANE | <a href="mailto:info@inlane.com"></a>
                    </div>
                </div>
            </body>
            </html>
        `;
    };

    async userRegMailAdmin(userId, name, email, phone) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to RND Family</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .header {
                        background-color:rgb(146, 240, 23);
                        color: #ffffff;
                        text-align: center;
                        padding: 20px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .content p {
                        margin: 15px 0;
                        font-size: 16px;
                        color: #333333;
                    }
                    .footer {
                        background-color: #f1f1f1;
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #666666;
                    }
                    a {
                        color:rgb(8, 12, 113);
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Content -->
                    <div class="content">
                        <p>Hi Admin,</p>
                        <p>
                            A new user has successfully submitted their registration details and uploaded the documents for verification.
                        </p>

                        <p><strong>User Details:</strong></p>
                            <ul>
                                <li><strong>Name:</strong> ${name}</li>
                                <li><strong>Email:</strong> ${email}</li>
                                <li><strong>Phone:</strong> ${phone}</li>
                                <li><strong>User ID:</strong> ${userId}</li>
                            </ul>
                        <p>
                            Please review the submitted documents and proceed with the verification process at your earliest convenience.
                        </p>

                        <p>
                            If you need to take any action or view further details, please log in to the admin dashboard.
                        </p>
                        <p style="font-weight: bold;">Warm regards,</p>
                        <p style="font-weight: bold;">The LANE Team</p>
                    </div>
                    <!-- Footer -->
                    <div class="footer">
                        &copy; 2025 LANE | <a href="mailto:info@inlane.com"></a>
                    </div>
                </div>
            </body>
            </html>
        `;
    };

    async userApprovedMail(userId, name) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to RND Family</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .content p {
                        margin: 15px 0;
                        font-size: 16px;
                        color: #333333;
                    }
                    .footer {
                        background-color: #f1f1f1;
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #666666;
                    }
                    a {
                        color:rgb(8, 12, 113);
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Content -->
                    <div class="content">
                        <p>Dear ${name} ,</p>
                        <p>User ID: ${userId}</p>
                        <p>
                            Your Documents verified successfully, Go safe Journey with Lane.
                        </p>
                        <p>
                            If you have any questions or need assistance, please do not hesitate to contact our support team.
                        </p>
                        <p style="font-weight: bold;">Warm regards,</p>
                        <p style="font-weight: bold;">The LANE Team</p>
                    </div>
                    <!-- Footer -->
                    <div class="footer">
                        &copy; 2025 LANE | <a href="mailto:info@inlane.com"></a>
                    </div>
                </div>
            </body>
            </html>
        `;
    };

    async userRejectMail(userId, name) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to RND Family</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .content p {
                        margin: 15px 0;
                        font-size: 16px;
                        color: #333333;
                    }
                    .footer {
                        background-color: #f1f1f1;
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #666666;
                    }
                    a {
                        color:rgb(8, 12, 113);
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Content -->
                    <div class="content">
                        <p>Dear ${name} ,</p>
                        <p>User ID: ${userId}</p>
                        <p>
                            Sorry to say you that Documents is not upto the mark.
                        </p>
                        <p>
                            You can update the documents by contacting our support team.
                        </p>
                        <p>
                            If you have any questions or need assistance, please do not hesitate to contact our support team.
                        </p>
                        <p style="font-weight: bold;">Warm regards,</p>
                        <p style="font-weight: bold;">The LANE Team</p>
                    </div>
                    <!-- Footer -->
                    <div class="footer">
                        &copy; 2025 LANE | <a href="mailto:info@inlane.com"></a>
                    </div>
                </div>
            </body>
            </html>
        `;
    };
}
module.exports = new MailTemplates();