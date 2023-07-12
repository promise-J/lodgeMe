import { Suspense, lazy, useMemo, useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
// import useLoginModal from "../../hooks/useLoginModal";
// import useMenuHook from "../../hooks/useMenuModal";
import useRentalHook from "../../hooks/useRentalModal";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
// import Map from "../Map";

const enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESRIPTION = 4,
  PRICE = 5,
}

const RentalModal = () => {
  const registerModal = useRegisterModal();
  // const loginModal = useLoginModal();
  // const useMenu = useMenuHook();
  const rentalModal = useRentalHook();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [previewImg, setPreviewImg] = useState('')
  // const [isLoading, setIsLoading] = useState(false);
  
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((step) => step + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: null,
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount")
  const roomCount = watch("roomCount")
  const selectedImg = watch("imageSrc")

  let Map = useMemo(() => lazy(() => import("../Map")), []);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: false,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtite="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((cat) => (
          <div key={cat.label}>
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === cat.label}
              label={cat.label}
              icon={cat.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located"
          subtite="Help guest find you"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Suspense fallback={<p>Loading...</p>}>
          <Map center={location?.latlng} />
        </Suspense>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtite="What amenities do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you allow?"
        />
        <hr />
      </div>
    );
  }

  if(step === STEPS.IMAGES){
    bodyContent = (
      <div className="flex flex-col gap8">
        <Heading title="Add a photo of your place" subtite="Show guests what your place looks like!" />
        <ImageUpload 
        setSelectedImg={(value)=> {
          setCustomValue('imageSrc', value)}
         }
         setPreviewImg={setPreviewImg}
         previewImg={previewImg} 
         />
      </div>
    )
  }


  return (
    <Modal
      // disabled={isLoading}
      isOpen={rentalModal.isOpen}
      title="Airbnb your home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={()=> {
        const confirmation = confirm('Do you want to discard your progress?')
        if(confirmation){
          rentalModal.onClose()
          setPreviewImg('')
          reset()
          setStep(STEPS.CATEGORY)
        }else{
          rentalModal.onClose()
        }
      }}
      onSubmit={onNext}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default RentalModal;
