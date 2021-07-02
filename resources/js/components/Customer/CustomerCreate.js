import React, { Component } from 'react';
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon
} from "semantic-ui-react";

class CustomerCreate extends Component {
    state = {
        name: "",
        email: "",
        errors: [],
        loading: false
    }

    handleChange = event => { this.setState({ [event.target.name]: event.target.value }); };

    handleStore = async event => {
        event.preventDefault();
        const { name, email } = this.state;
        if (this.isFormValid(this.state)) {
            this.setState({ loading: true });
            const res = await axios.post('/customers', {
                name: name,
                email: email
            });
            if (res.data.status === 201) {
                this.setState({loading: false });
                this.props.history.push("/customers");
            }
        }
    };

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error}</p>);

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.toLowerCase().includes(inputName)) ? "error" : "";
    };

    isFormValid = ({ name, email }) => {
        if (name && email){return true}
        this.setState({ errors: [] }, ()=>{
            const {errors} = this.state;
            if (name.length == 0) {
                errors.push("Name cannot be empty")
            }
            if (email.length == 0) {
                errors.push("Email cannot be empty")
            }
            this.setState({errors})
        });
    };

    render() {
        const { name, email, errors, loading } = this.state;
        return (
            <div>
                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h1" icon color="blue" textAlign="center">
                            <Icon name="customer" color="blue" />
                            Create Customer
                        </Header>
                        <Form onSubmit={this.handleStore} size="large">
                            <Segment stacked>
                                <Form.Field>
                                    <label>Name</label>
                                    <Form.Input
                                        fluid
                                        name="name"
                                        onChange={this.handleChange}
                                        value={name}
                                        className={this.handleInputError(errors, "name")}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Email</label>
                                    <Form.Input
                                        fluid
                                        name="email"
                                        onChange={this.handleChange}
                                        value={email}
                                        className={this.handleInputError(errors, "email")}
                                        type="email"
                                    />
                                </Form.Field>
                                <Button
                                    disabled={loading}
                                    className={loading ? "loading" : ""}
                                    color="blue"
                                    fluid
                                    size="large"
                                >
                                    Create customer
                                </Button>
                            </Segment>
                        </Form>
                        {errors.length > 0 && (
                            <Message error>
                                <h3>Error</h3>
                                {this.displayErrors(errors)}
                            </Message>
                        )}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default CustomerCreate;