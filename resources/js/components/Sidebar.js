import React from "react";
import '../../css/App.css';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaBattleNet } from "react-icons/fa";
import Index from "./User/Index"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Sidebar extends React.Component {
    state = {
        menuCollapse: false
    };

    menuIconClick = () => {
        const { menuCollapse } = this.state;
        menuCollapse ? this.setState({ menuCollapse: false }) : this.setState({ menuCollapse: true })
    };

    render() {
        const { menuCollapse } = this.state;
        return (
            <div >
                <Router>
                    <div id="sidebar" style={{ display: 'grid', gridTemplateColumns: '200px auto' }}>
                        <ProSidebar className='sideBar' collapsed={menuCollapse}>
                            <SidebarHeader className="sideBarHeader">
                                <p className="clickable" onClick={this.menuIconClick}>{menuCollapse ? "R.F." : "Roll Fast"}</p>
                            </SidebarHeader>
                            <SidebarContent>
                                <Menu iconShape="square">
                                    <MenuItem icon={<FaBattleNet />}>
                                        Users
                                        <Link to="/users" />
                                    </MenuItem>
                                </Menu>
                            </SidebarContent>

                        </ProSidebar>
                        <div className="centerVandH">
                            <Switch>
                                <Route path="/users">
                                    <Index />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Sidebar;
