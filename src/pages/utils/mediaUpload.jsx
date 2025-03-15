import { createClient } from '@supabase/supabase-js'

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0Z3JwemV3cG1raGJwbnNlY3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MjQ3MjUsImV4cCI6MjA1NzAwMDcyNX0.zann3qr0KgqfipQA-gCIpdan-Lvx_uLLb5fRFaPmym0"
const supabase_url = "https://ctgrpzewpmkhbpnsecqi.supabase.co"



const supabase = createClient(supabase_url, anon_key)


export default function mediaUpload(file) {
return new Promise((resolve, reject) => {

    if(file==null){
        reject("no file selected")
    }


const timestamp = new Date().getTime();
const filename= timestamp+file.name
supabase.storage.from('Images').upload(filename, file, {
    cacheControl: '3600',
    upsert: false,

}).then(() => {

    const publicUrl = supabase.storage.from('Images').getPublicUrl(filename).data.publicUrl;
    resolve(publicUrl)
}).catch((err) => {
    reject("Error uploading file")
})    
})

  
    
}