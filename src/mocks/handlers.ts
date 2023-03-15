import {rest} from 'msw'
import {ApiError} from "../scala-api";
// import { HikersDto } from "../scala-api";
import {hikerData} from "./data/hikerData";
import {bridgeData} from "./data/bridgeData";

const mockAuthToken = Math.random().toString(36).slice(2);

export const handlers = [
    // TODO: Add interfaces to requests
    rest.get<any, any, any | ApiError>("/api/hikers", ((req, res, context) => {
        // TODO: If no hikers in sessionStorage, return default data
        return res(context.status(200), context.json({ hikerData }))
    })),

    rest.get<any, any, any | ApiError>("/api/bridges", ((req, res, context) => {
        // TODO: If no bridges in sessionStorage, return default data
        return res(context.status(200), context.json({ bridgeData }))
    })),

]
