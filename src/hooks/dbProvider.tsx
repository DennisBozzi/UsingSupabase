import { supabaseInstance } from "@/lib/utils";

const supabase = supabaseInstance();

export async function insertBlurhash(hash: string, imageId: string) {
  const { data, error } = await supabase
    .from('files')
    .insert({
      blur_hash: hash,
      id_image: imageId,
    })

  if (error)
    console.log(error.message)

  return { data, error }
}