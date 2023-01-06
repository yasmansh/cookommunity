import { useEffect, useState,React } from 'react'
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon, Text } from "./SigninElements";
import axios from 'axios'
import { useForm } from "react-hook-form"
const SigninForm = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = data => alert(data.email+data.password)
/*
  useEffect(() => {
    getCourses()
  }, [])*/
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  async function getCourses() {
    try {
      const response = await axios.post('http://127.0.0.1:8000',form)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // const handleChange = (e) => {
  //   e.preventDefault()
  //   console.log(e.target.value)
  //   const { name, value } = e.target
  //   setForm((prevForm) => ({ ...prevForm, [name]: value }))
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(form)
  //   getCourses()
  //   alert(`email: ${form.email}   password: ${form.password}`)
  // }

  return (
    <Container>
      <FormWrap >
        <Icon to="/">Return To Home</Icon>
        <FormContent >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormH1>Sign in to your account</FormH1>
            <FormLabel htmlfor="for">Email</FormLabel>
            <FormInput type="email" name="email" {...register("email")} required />
            <FormLabel htmlfor="for">Password</FormLabel>
            <FormInput type="password" name="password" {...register("password")} required />
            <FormButton type="submit">Sign in</FormButton>
            <Text>Forget Password?</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SigninForm;
