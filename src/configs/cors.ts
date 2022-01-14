import { CorsOptions } from "cors";

const configCors = (): CorsOptions => {
    let origin: string | string[] = "";
    if (process.env.NODE_ENV === 'develop') {
        origin = ["http://localhost:3000", "http://localhost:8080"];
    }
    return {
        origin,
        credentials: true
    }
}

export default configCors;