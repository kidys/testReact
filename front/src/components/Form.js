import React from 'react';
import Input from './Input';

class Form extends React.Component {
    state={
        fields: {
            login: null,
            password: null
        },
        notification: {
            style: {},
            message: null
        },
        currentTarget: null
    };

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    onSubmit(event) {
        console.log("Submit form!");
        event.preventDefault();

        fetch("http://localhost:3005/graphql?query=query(%24login%3A%20String!%2C%20%24password%3A%20String!)%20%7B%0A%20%20isLogin(login%3A%20%24login%2C%20password%3A%20%24password)%20%7B%0A%20%20%20%20token%0A%20%20%20%20tokenLength%0A%20%20%7D%0A%7D&variables=%7B%0A%20%20%22login%22%3A%20%22"+this.state.fields.login+"%22%2C%0A%20%20%22password%22%3A%20%22"+this.state.fields.password+"%22%0A%7D")
            .then(result => result.json())
            .then(data => {
                if(data.data.isLogin) {
                    this.setState({ notification: {
                        style: { backgroundColor: "green", color: "white", margin: "5px auto", padding: "1rem", textAlign: "center",
                            display: "block" },
                        message: data.data.isLogin.token
                    }});
                    console.log(data.data.isLogin);
                } else {
                    this.setState({ notification: {
                        style: { backgroundColor: "red", color: "white", margin: "5px auto", padding: "1rem",
                            textAlign: "center", display: "block" },
                        message: data.errors[0].message
                    }});
                    console.error(data.errors[0].message);
                }
            });
    }

    onChangeInput(event) {
        this.setState({
            currentTarget: { name: event.target.name, value: event.target.value }
        }, () => {
            this.setState((state) => {
                for(let key in state.fields) {
                    if(key === state.currentTarget.name) {
                        return state.fields[key] = state.currentTarget.value;
                    }
                }
            });
        });
    }

    render() {
        const contentForm = this.props.type === "login"
            ? <>
                <Input type="text" name="login" onChange={(event) => this.onChangeInput(event)}/>
                <Input type="password" name="password" onChange={(event) => this.onChangeInput(event)}/>
              </>
            : <>Поля для регистрации</>;

        return (
            <section datatype={this.props.type === "login" ? "form-login" : "form-registration"} style={{
                backgroundColor: "#ececec",
                padding: "1rem",
                borderRadius: "5px",
                boxShadow: "54px 58px 5px -8px rgba(0,0,0,0.56)"
            }}>
                <h2 style={{ textAlign: "center", color: "#333333" }}>{this.props.type === "login" ? "Member Login" : "Member Registration"}</h2>
                <span style={this.state.notification.style}>{this.state.notification.message}</span>
                <form onSubmit={this.onSubmit.bind(this)}>
                    {contentForm}
                    <button type="submit">
                        {this.props.type === "login" ? "Авторизоваться" : "Зарегистрироваться"}
                    </button>
                </form>
            </section>
        )
    }
}

export default Form;