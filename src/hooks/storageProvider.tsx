import { successToast, supabaseInstance, warningToast } from '@/lib/utils';

const supabase = supabaseInstance();

var hasMore: boolean = false;

async function insertItem(bucketName: string, fileName: string, file: File) {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file)

    if (error?.message == "The resource already exists")
        return warningToast("File already exists", "Please choose another file name")

    successToast("File uploaded", "File uploaded successfully")

    return { data, error }
}

async function getImagesUrls(bucketName: string, offset: number, quantity: number) {

    var coolArray: any = [];

    const { data } = await supabase.storage
        .from(bucketName)
        .list('', {
            limit: quantity, offset: offset, sortBy: {
                column: 'created_at', order: 'desc'
            }
        });

    data?.map(file => {
        coolArray.push({
            fileId: file.id,
            fileName: file.name,
            created_at: file.created_at,
            publicUrl: supabase.storage
                .from(bucketName)
                .getPublicUrl(file.name).data.publicUrl
        })
    })

    hasMore = coolArray.length < quantity ? false : true;

    return { data: coolArray };
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

export { insertItem, createBucket, getImagesUrls, getImages, hasMore }