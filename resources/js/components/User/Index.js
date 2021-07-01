import React from 'react';
import ServerTable from 'react-strap-table';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

class Index extends React.Component {
    state = {
        selectedUsers: [],
        usersIDs: [],
        isAllChecked: false,
    };

    check_all = React.createRef();

    handleCheckboxTableChange = (event) => {
        const value = event.target.value;
        let selectedUsers = this.state.selectedUsers.slice();

        selectedUsers.includes(value) ?
            selectedUsers.splice(selectedUsers.indexOf(value), 1) :
            selectedUsers.push(value);

        this.setState({ selectedUsers: selectedUsers }, () => {
            this.check_all.current.checked = _.difference(this.state.usersIDs, this.state.selectedUsers).length === 0;
        });
    }

    handleCheckboxTableAllChange = (event) => {
        this.setState({ selectedUsers: [...new Set(this.state.selectedUsers.concat(this.state.usersIDs))] }, () => {
            this.check_all.current.checked = _.difference(this.state.usersIDs, this.state.selectedUsers).length === 0;
        });
    }

    render() {
        let self = this;
        const url = 'http://localhost:8000/users';
        const columns = ['id', 'name', 'email', 'created_at', 'updated_at', 'actions']
        let checkAllInput = (<input type="checkbox" ref={this.check_all} onChange={this.handleCheckboxTableAllChange} />);
        const options = {
            perPage: 10,
            headings: { id: checkAllInput, created_at: 'Created At' },
            sortable: ['name', 'email', 'created_at'],
            columnsWidth: { name: 20, email: 20, id: 5 },
            columnsAlign: { id: 'center' },
            requestParametersNames: { query: 'search', direction: 'order' },
            responseAdapter: function (res) {
                let usersIDs = res.data.map(a => a.id.toString());
                self.setState({ usersIDs: usersIDs }, () => {
                    self.check_all.current.checked = _.difference(self.state.usersIDs, self.state.selectedUsers).length === 0;
                });

                return { data: res.data, total: res.total }
            },
            texts: {
                show: 'Users  '
            },
        };

        return (
            <ServerTable columns={columns} url={url} options={options} bordered hover updateUrl>
                {
                    function (row, column) {
                        switch (column) {
                            case 'id':
                                return (
                                    <input key={row.id.toString()} type="checkbox" value={row.id.toString()}
                                        onChange={self.handleCheckboxTableChange}
                                        checked={self.state.selectedUsers.includes(row.id.toString())} />
                                );
                            case 'avatar':
                                return (<img src={row.avatar} className="table-image" />);
                            case 'address':
                                return (
                                    <ul>
                                        <li>Street: {row.address.address1}</li>
                                        <li>City: {row.address.city}</li>
                                        <li>Country: {row.address.country}</li>
                                    </ul>
                                );
                            case 'actions':
                                return (
                                    <div style={{ display: "inline-block" }}>
                                        <a className="btn btn-primary btn-xs table-actions-btn"
                                            href={'users/' + row.id + '/edit'}>
                                            <AiFillEdit /></a>
                                        <a className="btn btn-danger btn-xs table-actions-btn">
                                            <AiFillDelete /></a>
                                    </div>
                                );
                            default:
                                return (row[column]);
                        }
                    }
                }
            </ServerTable>
        );
    }
}

export default Index;