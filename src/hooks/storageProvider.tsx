import { generateBlurhash } from '@/lib/encodeBlurHash';
import { successToast, supabaseInstance, warningToast } from '@/lib/utils';
import { insertBlurhash } from './dbProvider';

const supabase = supabaseInstance();

async function insertItem(bucketName: string, fileName: string, file: File) {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file)

    if (error?.message == "The resource already exists")
        return warningToast("File already exists", "Please choose another file name")

    const imageUrl = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName).data.publicUrl;

    const blurhash = await generateBlurhash(imageUrl);

    if (data)
        insertBlurhash(blurhash, data.id);

    successToast("File uploaded", "File uploaded successfully")

    return { data, error }
}

async function getImagesUrls(bucketName: string) {
    const { data } = await supabase.storage
        .from(bucketName)
        .list();

    const imgUrls = data?.map(file => {
        const { data } = supabase.storage
            .from(bucketName)
            .getPublicUrl(file.name);

        return data;
    }).filter(publicUrl => publicUrl !== null);

    return { data: imgUrls };
}

async function getImages(bucketName: string) {
    const { data } = await supabase.storage
        .from(bucketName)
        .list();

    var imgs = data;
    return { imgs };
}

async function createBucket(bucketName: string) {
    const { data, error } = await supabase.storage.
        createBucket(bucketName)

    return { data, error }
}

export { insertItem, createBucket, getImagesUrls, getImages }