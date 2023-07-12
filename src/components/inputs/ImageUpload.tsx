import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";


interface ImageUploadProps {
    setSelectedImg: (file: File | null)=> void;
    setPreviewImg: (file: string)=> void;
    previewImg: string | null
}

const ImageUpload: React.FC<ImageUploadProps> = ({setSelectedImg, previewImg, setPreviewImg}) => {
//   const [selectedImg, setSelectedImg] = useState<null | File>(null);
//   const [imgPreview, setImgPreview] = useState<null | string>("");
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.split("/")[0] === "image") {
        setSelectedImg(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImg(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="min-h-[30vh] flex flex-col justify-center items-center border border-muted-400 gap-3 my-4">
      {previewImg ? (
        <img
          className="w-[50%] mx-auto"
          src={previewImg}
          alt="your home image"
          style={{objectFit: 'cover'}}
        />
      ) : (
        <>
          <input
            type="file"
            id="input-file"
            style={{ display: "none" }}
            placeholder="upload file"
            onChange={handleImgChange}
          />
          <label htmlFor="input-file">
            <BiImageAdd
              size={84}
              title="Upload an image"
              style={{ cursor: "pointer" }}
            />
          </label>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
