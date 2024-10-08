import asyncHandler from "express-async-handler";
import Users from "../models/UserModel.js";
import { successResponse, ApiError, ENVIRONMENT, USERS_DATA } from "../lib/index.js";


const verifyPermission = () => {
    if (ENVIRONMENT !== "dev") {
        throw new ApiError(403, "Permission denied.");
    }
};

// ╭────────────────────────────────────────────────────────╮
// │      Seed Users
// ╰────────────────────────────────────────────────────────╯
export const seedUsers = asyncHandler(async (req, res) => {
    verifyPermission();

    await Users.deleteMany({});

    // Insert users
    const insertedUsers = await Users.create(USERS_DATA);

    successResponse(res, {
        statusCode: 201,
        message: "Users inserted successfully.",
        data: { insertedUsers }
    });
});
