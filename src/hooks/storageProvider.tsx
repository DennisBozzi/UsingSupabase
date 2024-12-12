import { generateBlurhash } from '@/lib/encodeBlurHash';
import { successToast, supabaseInstance, warningToast } from '@/lib/utils';
import { getBlurhash, insertBlurhash } from './dbProvider';
import { sortBy } from 'lodash';

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

    const blurHashs = await getBlurhash();

    var imagesAndBlurs: any = [];

    data?.map(file => {
        blurHashs?.map(blurHash => {
            if (file.id === blurHash.id_image) {
                imagesAndBlurs.push({
                    fileId: file.id,
                    fileName: file.name,
                    blurHash: blurHash.blur_hash,
                    created_at: file.created_at,
                    publicUrl: supabase.storage
                        .from(bucketName)
                        .getPublicUrl(file.name).data.publicUrl
                })
            }
        })
    })

    imagesAndBlurs = sortBy(imagesAndBlurs, ['created_at']).reverse();

    return { data: imagesAndBlurs };
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