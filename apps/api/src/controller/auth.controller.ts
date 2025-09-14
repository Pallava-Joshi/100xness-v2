import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const register = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET!);
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });

  const info = await transporter.sendMail({
    from: '"Exness" <onboarding@resend.dev>',
    to: email,
    subject: "Sign in to Exness",
    text: "Sign in by clicking on the link below.",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333;">Welcome to Exness!</h2>
      <p style="color: #555;">Click the button below to sign in to your account. If you did not request this, you can safely ignore this email.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.BASE_URL}?token=${token}" 
           style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Sign In
        </a>
      </div>
      <p style="color: #888; font-size: 12px;">This link will expire in 15 minutes.</p>
    </div>
  `, // HTML body
  });
  // console.log(info);
  return res.json({
    message: token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token)
    return res.status(400).json({
      error: "token invalid",
    });
  const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
  const { email } = decoded as { email: string };
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    })
    .redirect(`${process.env.FRONTEND_URL}/dashboard`);
};
