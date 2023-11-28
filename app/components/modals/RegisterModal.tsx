'use client'

import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import { Modal } from './Modal'
import { Heading } from '../Heading'
import { Input } from '../Inputs/Input'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { signIn } from 'next-auth/react'
import { useLoginModal } from '@/app/hooks/useLoginModal'

export const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    axios
      .post('http://localhost:3500/users', data)
      .then(() => {
        toast.success('Usuário Registrado com Sucesso!')
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch(err => {
        console.log(err)
        toast.error('Algo Deu Errado')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div
      className="
  flex 
  flex-col 
  gap-4"
    >
      <Heading title="Bem-vindo ao Rolé!" subtitle="Crie uma conta" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Senha"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Faça login com sua conta Google"
        icon={FcGoogle}
        onClick={() => {
          signIn('google')
        }}
      />
      <div className="flex flex-row items-center justify-center gap-2">
        <div>Você já tem uma conta?</div>
        <div
          className="cursor-pointer text-neutral-800 hover:underline"
          onClick={toggle}
        >
          <div>Faça o login</div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Crie sua conta"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
