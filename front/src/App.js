import React from 'react';
import Form from './components/Form';

function App() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h1 style={{
        fontSize: "1.15rem"
      }}>Приложение авторизация/регистрация пользователей</h1>
      <Form type="login"/>
    </div>
  );
}

export default App;
