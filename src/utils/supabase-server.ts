import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "~/shared/types/supabase.types";

export const createClient = () =>
    createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    });
