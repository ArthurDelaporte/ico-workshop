const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImageToBucket = async (file, fileName) => {
    // Vérification du type MIME de l'image
    if (!file.mimetype.startsWith('image/')) {
        throw new Error('Le fichier doit être une image.');
    }

    // Uploader l'image dans Supabase
    const { data, error } = await supabase.storage
        .from("card-images")
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });

    if (error) {
        throw new Error("Erreur lors de l'upload de l'image : " + error.message);
    }

    // Générer l'URL publique de l'image
    const { publicUrl } = supabase.storage.from("card-images").getPublicUrl(data.path);
    return publicUrl;
};

module.exports = { uploadImageToBucket };
