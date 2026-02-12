import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUserPost } from '../../redux/postSlice';
import api from '../../services/api';

const CreateModal = ({isOpen , onClose}) => {

    const [caption,setCaption] = useState('');
    const [images,setImages] = useState([]);
    const [previews,setPreviews] = useState([]);
    const [loading,setLoading]= useState(false);
    const [error , setError] = useState("");

    const dispatch = useDispatch();

    //disable scroll here
    useEffect(()=>{
            document.body.style.overflow = isOpen ? 'hidden' :'auto';
    },[isOpen])

    if(!isOpen){
        return null;
    }

    const handleFile = (e)=>{
        const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
        const validImages = selectedFiles.filter(file => file.type.startsWith("image/"));
        if (validImages.length !== selectedFiles.length) {
            setError("Some files were not images and were skipped.");
        }
        const newPreviews = validImages.map(file => URL.createObjectURL(file));  //creates a temporary browser-only link
      
       setImages((prev) => [...prev, ...validImages]);
       setPreviews((prev) => [...prev, ...newPreviews]);
    }
    const handlePost = async()=>{
        if(!caption){
            return setError("caption is required");
        }
        try {
            setLoading(true);
            let imageUrls = [];
            if(images.length > 0){
                const formData = new FormData();
                images.forEach(img =>{
                    formData.append("images",img)
                })
                const res = await api.post("/upload", formData);
                imageUrls = res.data.imageUrls;
            }
            await dispatch(addUserPost({ 
                content: caption, 
                image: imageUrls // Sending the array
            })).unwrap();

            onClose();
            // Reset states
            setImages([]);
            setPreviews([]);
            setCaption('');
        } catch (error) {
            setError(error.message || "Failed to create post");
        }finally {
            setLoading(false);
        }
    }
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90'>
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className='text-xl font-bold mb-4'>Create New Post</h2>
            <div className='className="flex gap-2 overflow-x-auto mb-4'>
                {previews.map((url,indx)=>(
                    <img key={indx} src={url} className="w-20 h-20 object-cover rounded shadow" alt="preview"/>
                ))}
                <label className="w-20 h-20 border-2 border-dashed flex items-center justify-center cursor-pointer">
                        +
                        <input type="file" hidden multiple onChange={handleFile} accept="image/*" />
                    </label>
            </div>
            <textarea 
                    className="w-full border p-2 rounded" 
                    placeholder="What's on your mind?"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
                    <button 
                        onClick={handlePost} 
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
            </div>
        </div>
    </div>
  )
}

export default CreateModal