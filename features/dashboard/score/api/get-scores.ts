import { api } from "@/lib/api/axios"
import { Score } from "../types/score"

export const getScores = async (): Promise<Score> => {
    const response = await api.get('/scores')

    return response.data
}