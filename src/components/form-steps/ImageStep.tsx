import { useState } from "react";
import { Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FormStepProps } from "@/types";

type ImageStepProps = FormStepProps & {};

const ImageStep = ({ setFieldValue, error }: ImageStepProps) => {

  const [ image, setImage ] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    const image = e.target.files![0];

    setImage (URL.createObjectURL (image));

    setFieldValue ("image", image);

  }

  return (
    <div className="h-full flex justify-center items-center p-3">
      {image ? 
          <img src={image} alt="image" className="h-full" /> 
        :
        <>
          <label htmlFor="image" className="flex flex-col gap-1 justify-center items-center cursor-pointer h-full w-full">
            <div className="text-lg">Select Image Room</div>
            <Image size={45} strokeWidth={1} />
            { error ? <div className="text-red-500">Please select an image</div> : null}
          </label>
        </>
      }
      <Input type="file" name="image" id="image" style={{ display: "none" }} onChange={handleUpload} />
    </div>
  );

}



export default ImageStep;