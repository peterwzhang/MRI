import Router from "next/router";
import React, { FormEvent, useState } from "react";
import styled from 'styled-components';
import { theme } from '../constants';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => email.length > 0 && password.length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()){
      Router.push('/home');
      console.log(`email: ${email}; pass: ${password}`);
    }
  }

  return (
    <Wrapper>
      <h1>Sign in to HPC Interface</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
          <label>
            <Input placeholder="email" type="text" onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            <Input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <BtnWrapper type="submit">Submit</BtnWrapper>
      </Form>
    </Wrapper>
    )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; 
`
const Form = styled.form`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  width: 15rem;
  gap: 1rem;
`
const Input = styled.input`
  border: none;
  box-shadow: 0 .1rem .25rem ${() => theme.BOXSHADOW};
  border-radius: .5rem;
  padding: 1rem;
  width: 100%;
  outline: none;
`
const BtnWrapper = styled.button`
  background: ${() => theme.PRIMARY};
  color: white;
  border: none;
  border-radius: .5rem;
  padding: 1rem;
  width: 100%;
  font-size: 1rem;
`

export default Login;