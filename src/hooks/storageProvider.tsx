import { createClient } from '@supabase/supabase-js'

const apiKey = import.meta.env.VITE_API_KEY;
const supabase = createClient('https://toadqdstdkrpfrjldpid.supabase.co', apiKey)

async function insertItem(bucketName: string, fileName: string, file: File) {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file)

    return { data, error }
}

export { insertItem }