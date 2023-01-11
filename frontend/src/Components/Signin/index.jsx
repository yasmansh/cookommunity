import { useEffect, useState,React } from 'react'
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon, Text } from "./SigninElements";
import axios from 'axios'
const SigninForm = () => {

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
  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    getCourses()
    alert(`email: ${form.email}   password: ${form.password}`)
  }

  return (
    <Container>
      <FormWrap >
        <Icon to="/">Return To Home</Icon>
        <FormContent >
          <Form onSubmit={handleSubmit}>
            <FormH1>ورود به حساب کاربری</FormH1>
            <FormLabel htmlfor="for">ایمیل</FormLabel>
            <FormInput type="email" name="email" onChange={handleChange} required />
            <FormLabel htmlfor="for">گذرواژه</FormLabel>
            <FormInput type="password" name="password" onChange={handleChange} required />
            <FormButton type="submit">ورود</FormButton>
            <Text> گذرواژه خود را فراموش کردید؟</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SigninForm;
