import sgMail from "@sendgrid/mail";
import {getMessageForSendToMail, IPayloadMessage} from "../configs/sendgrid";
import {generateConfirmCode} from "./auth";
import {updateUser} from "./users";

export const sendMessageMailForVerify = async (email: string, logo: string, link: string) => {
    try {
        const confirmCode = generateConfirmCode();
        await updateUser(
            { email },
            { $set: { confirmCode } }
        );
        const emailFrom = (process.env.SENDGRID_MAIL_CONFIG_FROM as string);
        const payload: IPayloadMessage = {
            logo,
            link,
            confirmCode,
            title: "Welcome to Fit-trainer",
            description: (
                "We are a team of Fit-trainers, congratulations on your successful" +
                "registration. Now you can start training with us. Work out well"
            ),
            supDescriptionLink: "To verify your email follow link:",
        }
        const message: sgMail.MailDataRequired = {
            to: email,
            from: emailFrom,
            subject: 'Fit-Trainer Verify Email',
            html: getMessageForSendToMail(payload),
        }
        return await sgMail.send(message);
    } catch (error) {
        throw error;
    }
}

export const sendMessageMailForChangePassword = async (email: string, logo: string, link: string) => {
    try {
        const confirmCode = generateConfirmCode();
        await updateUser(
            { email },
            { $set: { confirmCode, isPasswordChanged: false } }
        );
        const emailFrom = (process.env.SENDGRID_MAIL_CONFIG_FROM as string);
        const payload: IPayloadMessage = {
            logo,
            link,
            confirmCode,
            title: "Change password",
            description: (
                "Hello, we are a Fit-trainer team that received a " +
                "message that you want to change your password"
            ),
            supDescriptionLink: "To change password follow link:",
        }
        const message: sgMail.MailDataRequired = {
            to: email,
            from: emailFrom,
            subject: 'Fit-Trainer Change password',
            html: getMessageForSendToMail(payload),
        }
        return await sgMail.send(message);
    } catch (error) {
        throw error;
    }
}