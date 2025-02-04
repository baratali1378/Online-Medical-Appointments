"use client"
import { useState } from "react";

interface FetchResult {
    success: boolean;
    message?: string;
}

const useFetch = () => {
    const [loading, setLoading] = useState(false);

    const postData = async (url: string, values: object): Promise<FetchResult> => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            return { success: true, message: data.message || "Success" };
        } catch (error: any) {
            setLoading(false);
            return { success: false, message: error.message };
        }
    };

    return { postData, loading };
};

export default useFetch;
