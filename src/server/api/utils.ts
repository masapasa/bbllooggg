import { supabase } from "~/utils/supabase-client";

export const uploadFile = async (userId: string, content: File) => {
    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${userId}`, content, { upsert: true });

    if (error) return { error };

    const { data: signedURLData, error: signedURLError } =
        await supabase.storage
            .from("avatars")
            .createSignedUrl(data.path, 999_999_999);

    if (signedURLError) return { error: signedURLError };

    return { url: signedURLData.signedUrl };
};
