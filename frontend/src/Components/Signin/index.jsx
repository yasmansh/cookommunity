import { useEffect, useState,React } from 'react'
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon, Text } from "./SigninElements";

const SigninForm = () => {
  const [courses, setCourses] = useState([])

  const getCourses = () => {
    fetch('http://localhost:4000/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data)
        console.log(courses)
      })
      .catch((err) => {
        setCourses([])
      })
  }

  useEffect(() => {
    getCourses()
  }, [])
  return (
    <Container>
      <FormWrap>
        <Icon to="/">Return To Home</Icon>
        <FormContent>
          <Form action="#">
            <FormH1>Sign in to your account</FormH1>
            <FormLabel htmlfor="for">Email</FormLabel>
            <FormInput type="email" required />
            <FormLabel htmlfor="for">Password</FormLabel>
            <FormInput type="password" required />
            <FormButton type="submit">Sign in</FormButton>
            <Text>Forget Password?</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SigninForm;
