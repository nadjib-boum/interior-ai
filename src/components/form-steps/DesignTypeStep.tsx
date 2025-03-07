import { designItems } from "@/config";
import type { DesignItem, FormStepProps } from "@/types";

type DesignItemProps = {
  item: DesignItem;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected: boolean;
};

const DesignItem = ({ item, handleChange, isSelected = false }: DesignItemProps) => {
  return (
    <li className="w-[100px] cursor-pointer flex flex-col text-center text-lg">
      <label>
        <img src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.url}`} className="w-full rounded-md border border-3" style={{ borderColor: `${isSelected ? "black" : "transparent"}` }} />
        <span className={`${isSelected ? "text-gray-900" : "text-gray-500"} capitalize`}>{item.label}</span>
        <input type="radio" name="designType" value={item.label} onChange={handleChange} style={{ display: "none" }} />
      </label>
    </li>
  );
}


type DesignTypeStepProps = FormStepProps & {
  selectedDesign: string;
};

const DesignTypeStep = ({ selectedDesign, setFieldValue, error }: DesignTypeStepProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFieldValue ("designType", e.target.value);

  }

  return (
    <div>
      <div className="text-lg text-center py-2 mt-2">Select Design Type</div>
      { error ? <div className="text-red-500 text-center">Please select a design type</div> : null}
      <ul className="grid grid-cols-4 place-items-center gap-3 p-3">
        { 
          designItems.map((item, index) => (
            <DesignItem 
              key={`${index}_${item.label}`}
              item={item}
              handleChange={handleChange}
              isSelected={item.label == selectedDesign}
            />
          ))
        }
      </ul>
    </div>
  );

}

export default DesignTypeStep;