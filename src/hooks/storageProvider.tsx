import { createClient } from '@supabase/supabase-js'

const apiKey = import.meta.env.VITE_API_KEY;
const supabase = createClient('https://toadqdstdkrpfrjldpid.supabase.co', apiKey)

async function insertItem(bucketName: string, fileName: string, file: File) {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file)

    return { data, error }
}

async function getImages(bucketName: string) {
    const { data } = await supabase.storage
        .from(bucketName)
        .list();

    const urls = data?.map(file => {
        const { data } = supabase.storage
            .from(bucketName)
            .getPublicUrl(file.name);

        return data;
    }).filter(publicUrl => publicUrl !== null);

    return { data: urls };
}

async function createBucket(bucketName: string) {
    const { data, error } = await supabase.storage.
        createBucket(bucketName)

    return { data, error }
}

export { insertItem, createBucket, getImages }