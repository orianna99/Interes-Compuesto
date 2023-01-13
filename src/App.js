import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button.js'
import Container from './components/Container' 
import Section from './components/Section'
import Balance from './components/Balance'

const compundInterest = (deposito, contribution, years, rate) => {
  let total = deposito
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}

const formate = new Intl.NumberFormat('es-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const App = () => {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compundInterest(Number (deposit), Number (contribution), Number (years), Number (rate))
    setBalance(formate.format(val));
  }
  return (
    <Container>
      <Section>
        <Formik
        initialValues={{
          deposit: '',
          contribution: '',
          years: '',
          rate: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          deposit: Yup.number().required('Campo requerido').typeError('Debe ser un numero'),
          contribution: Yup.number().required('Campo requerido').typeError('Debe ser un numero'),
          years: Yup.number().required('Campo requerido').typeError('Debe ser un numero'),
          rate: Yup.number().required('Campo requerido')
          .typeError('Debe ser un numero').min(0, 'El valor minimo es 0').max(1, 'El valor maximo es 1'),
        })}
        >
          <Form>
            <Input name="deposit" label="Deposito Inicial" ></Input>
            <Input name="contribution" label="Contribucion Anual" ></Input>
            <Input name="years" label="Años" ></Input>
            <Input name="rate" label="Interes estimado" ></Input>
            <Button type='submit' >Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance Final: {balance}</Balance> : null}
      </Section>
    </Container>
  )
}

export default App
