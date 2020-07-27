import { Response } from "express"

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie('tok', token , {httpOnly: true})
}