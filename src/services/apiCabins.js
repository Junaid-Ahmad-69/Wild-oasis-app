import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins() {

    const {data, error} = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        console.error(error)
        throw new Error('Cabins could not be loaded')
    }
    return data;
}

export async function createEditCabin(newCabin, id) {

    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    const imageUrl = hasImagePath ? newCabin.image : ` ${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

    //1. Create a Cabin
    let query = supabase.from('cabins');

    // A) Create
    if (!id) query = query.insert([{...newCabin, image: imageUrl}])

    // B)Edit
    if (id) query = query.update({...newCabin, image: imageUrl}).eq("id", id);

    const {data, error} = await query.select().single();
    if (error) {
        console.error(error)
        throw new Error('Cabins could not be created')
    }


    //2. Upload Image
    if (hasImagePath) return data;

    const {error: storageError} = await supabase
        .storage
        .from('cabins-images')
        .upload(imageName, newCabin.image)

    // 3.Delete the Cabin if there is uploading image error
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);
        console.error(storageError)
        throw new Error('Cabins image not uploaded')
    }
    return data;


}

export async function deleteCabin(id) {


    const {data, error} = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);
    if (error) {
        console.error(error)
        throw new Error('Cabins could not be deleted')
    }
    return data;
}