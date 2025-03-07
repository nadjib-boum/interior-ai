import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { roomItems } from "@/config";
import type { FormStepProps } from "@/types";

type RoomTypeStepProps = FormStepProps & {};

const RoomTypeStep = ({ setFieldValue, error }: RoomTypeStepProps) => {

  const handleValueChange = (value: string) => {

    setFieldValue ("roomType", value);

  }

  return (
    <div className="h-full flex flex-col justify-center items-center gap-2 p-3">
      <div className="text-lg">
        Select Room Type
      </div>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a room type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            { roomItems.length > 0 ? <SelectLabel>{roomItems[0].label}</SelectLabel> : null }
            { roomItems.map((room, index) => <SelectItem key={`${index}_${room}`} value={room.name}>{room.label}</SelectItem>) }
          </SelectGroup>
        </SelectContent>
      </Select>
      { error ? <div className="text-red-500">Please select a room type</div> : null}
    </div>
  );

}



export default RoomTypeStep;