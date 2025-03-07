"use client";
import { useState } from "react";
import { toast } from "sonner"
import { generateRoom } from "@/actions";
import { Button } from "@/components/ui/button";
import ImageStep from "@/components/form-steps/ImageStep";
import RoomTypeStep from "@/components/form-steps/RoomTypeStep";
import DesignTypeStep from "@/components/form-steps/DesignTypeStep";
import AdditionalDetailsStep from "@/components/form-steps/AdditionalDetailsStep";
import { useMultiStepForm } from "@/hooks/use-multi-step";
import { useUploadThing } from "@/hooks/use-upload-thing";
import type { InteriorFormDataParams, InteriorFormErrors, GenerateRoomData } from "@/types";
import ResultDialog from "./dialogs/ResultDialog";



const InteriorForm = () => {

  const initialFormState: InteriorFormDataParams = {
    image: null,
    roomType: "",
    designType: "",
    details: ""
  }

  const formKeys = Object.keys (initialFormState);

  const MAX_STEPS = 4;

  const [ formData, setFormData, ] = useState<InteriorFormDataParams>(initialFormState);
  const [ formErrors, setFormErrors ] = useState<InteriorFormErrors>({});
  const [ loading, setLoading ] = useState<boolean> (false);
  const [ result, setResult ] = useState<{ image: Record<string, any> } | null>(null);
  const { step, goPrev, goNext} = useMultiStepForm ({ max_steps: MAX_STEPS });
  const { startUpload } = useUploadThing ("imageUploader");

  const setFieldValue = (name: string, value: string | File) => {

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));

  }

  const setFieldError = (name: string, error: string) => {

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

  }

  const handleGoNext = () => {

    const currentField = formKeys[step - 1];

    if (currentField == "image" && !formData.image) return setFieldError ("image", "Please select an image");
    if (currentField == "roomType" && !formData.roomType) return setFieldError ("roomType", "Please select an image");
    if (currentField == "designType" && !formData.designType) return setFieldError ("designType", "Please select an image");

    goNext ();

  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault ();

    try {

      setLoading (true);

      if (!formData.image) {
        return toast("Image is not found", {
          description: 'Please ensure the image is uploaded',
        })
      }

      const uploading = await startUpload ([formData.image]);

      if (!uploading) {
        return toast("Something went wrong", {
          description: 'Please try again later',
        })
      }

      const payload: GenerateRoomData = {
        imageUrl: uploading[0].ufsUrl,
        imageKey: uploading[0].key,
        roomType: formData.roomType,
        designType: formData.designType,
        details: formData.details
      }

      const res = await generateRoom (payload);

      console.log ("res", res);

      if (!res.data?.image) {
        throw new Error ("Image generation Error")
      }

      setResult (res.data)
      
    }
    catch (err) {
      console.log ("submit error", err);
      return toast("Something went wrong", {
        description: 'Please try again later',
      })
    }
    finally {
      setLoading (false);
    }

  }

  return !result ? (
    <form className="w-[600px] border border-gray-200">
      <div className="h-[350px]">
        { step == 1 ? <ImageStep setFieldValue={setFieldValue} error={formErrors.image} /> : null }
        { step == 2 ? <RoomTypeStep setFieldValue={setFieldValue} error={formErrors.roomType}  /> : null }
        { step == 3 ? <DesignTypeStep setFieldValue={setFieldValue} error={formErrors.designType}  selectedDesign={formData.designType} /> : null }
        { step == 4 ? <AdditionalDetailsStep setFieldValue={setFieldValue}  /> : null }
      </div>
      <div className="flex justify-between p-3 border-t-1 border-gray-200">
        {
          step > 1 ?
            <Button type="button" onClick={goPrev} variant={"outline"} disabled={loading}>Previous</Button>
          : null
        }
        {
          step < MAX_STEPS ?
            <Button type="button" onClick={handleGoNext} className="ml-auto">Next</Button>
          : <Button type="button" onClick={handleSubmit} className="ml-auto" disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </Button>
        }
        
      </div>
    </form>
  )
  :
    <ResultDialog originalImage={result.image.originalImage} newImage={result.image.newImage}  />
  ;

}



export default InteriorForm;