import axios from "axios";
import { useRouter } from "next/router";
import { url } from "./constants";

export function logout() {
    axios.post(`${url}/logout`)
    const router = useRouter()
    router.push('/')
}