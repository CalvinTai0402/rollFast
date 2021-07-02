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

class CustomerEdit extends Component {
    state = {
        name: "",
        email: "",
        errors: [],
        loading: false
    }

    handleChange = event => { this.setState({ [event.target.name]: event.target.value }); };

    handleUpdate = async event => {
        event.preventDefault();
        const { name, email } = this.state;
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            const id = this.props.match.params.id;
            const res = await axios.put(`/customers/${id}`, {
                name: name,
                email: email
            });
            if (res.data.status === 200) {
                this.setState({ errors: [], loading: false });
                this.props.history.push("/customers");
            }

            // firebase
            //     .auth()
            //     .signInWithEmailAndPassword(this.state.email, this.state.password)
            //     .then(signedInUser => {
            //         console.log(signedInUser);
            //         this.setState({ loading: false })
            //     })
            //     .catch(err => {
            //         console.error(err);
            //         this.setState({
            //             errors: this.state.errors.concat(err),
            //             loading: false
            //         });
            //     });
        }
    };

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : "";
    };

    isFormValid = ({ name, email }) => name && email;

    async componentDidMount() {
        const id = this.props.match.params.id;
        const res = await axios.get(`/customers/${id}/edit`);
        this.setState({ name: res.data.customer.name });
        this.setState({ email: res.data.customer.email });
    }

    render() {
        const { name, email, errors, loading } = this.state;
        return (
            <div>
                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h1" icon color="blue" textAlign="center">
                            <Icon name="customer" color="blue" />
                            Edit Customer
                        </Header>
                        <Form onSubmit={this.handleUpdate} size="large">
                            <Segment stacked>
                                <Form.Field>
                                    <label>Name</label>
                                    <Form.Input
                                        fluid
                                        name="name"
                                        onChange={this.handleChange}
                                        value={name}
                                        className={this.handleInputError(errors, "name")}
                                        type="name"
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
                                    Update
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

export default CustomerEdit;