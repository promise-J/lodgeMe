import  { useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import {toast} from 'react-hot-toast'
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "../../hooks/useLoginModal";
import useMenuHook from "../../hooks/useMenuModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const useMenu = useMenuHook()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        console.log(error)
        toast.error('something went wrong')
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSwitch = ()=>{
    registerModal.onClose()
    loginModal.onOpen()
    useMenu.onClose()
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading title="Welcome To Airbnb" subtite="Create an account" />
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
        <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={()=> console.log('man')} />
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={()=> console.log('man')} />
      <div className="text-neutral-500 text-center mt-4 footer-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account</div>
          <div className="text-neutral-800 cursor-pointer hover:underline" onClick={handleSwitch}>Log in</div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={()=> {registerModal.onClose(); useMenu.onClose()}}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
