'use client'

import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { Modal } from './Modal'
import { Heading } from '../Heading'
import { Input } from '../Inputs/Input'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { useLoginModal } from '@/app/hooks/useLoginModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'

export const LoginModal = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false
    }).then(callback => {
      setIsLoading(false)
      console.log(callback)
      if (callback?.ok) {
        toast.success('Login Bem Sucedido')
        router.refresh()
        loginModal.onClose()
      }
      if (callback?.error) {
        toast.error(callback.error)
      }
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
      <Heading title="Bem-vindo de Volta!" subtitle="Entre na sua conta" />
      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="password"
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
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
