import React, { useState } from "react";
import PasswordTab from './PasswordTab'
import ListingTab from './ListingTab'
import CommentsTab from './CommentsTab'
import TabContent from "./TabContents";
import ProfileTab from './ProfileTab';

import { Button, Spacer, Card, Text, Modal } from '@nextui-org/react';

const handleLogout = () => {
	localStorage.removeItem("token");
	window.location.href = "/";
};



const Profile = () => {
	const [activeTab, setActiveTab] = useState("tab1");

	const handleTab1 = () => {
		setActiveTab("tab1");
	}

	const handleTab2 = () => {
		setActiveTab("tab2");
	}

	const handleTab3 = () => {
		setActiveTab("tab3");
	}

	const handleTab4 = () => {
		setActiveTab("tab4");
	}

	const [visible, setVisible] = React.useState(false);
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
		console.log("closed");
	};


	return (

		<div className="container">
			<div className="row d-flex">

				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="px-4 pt-5 my-5 text-center">
								<Card>
									<Spacer y={2} />
									<Text className="text-center" h1>My Profile</Text>
									<Spacer />
									<div className="d-flex justify-content-between">
										<Button flat color="secondary" auto onClick={(e) => { window.location.href = "/"; }}>Back</Button>
										<Button flat color="error" onClick={handler}>Log Out</Button>
										<Modal
											closeButton
											blur
											aria-labelledby="modal-title"
											open={visible}
											onClose={closeHandler}
										>
											<Modal.Header>
												<Text id="modal-title" size={20}>
													Are you sure you want to log out?
												</Text>
											</Modal.Header>
											<Modal.Footer className="d-flex justify-content-center">
												<Button auto flat color="error" onClick={handleLogout}>
													Yes
												</Button>
												<Button auto flat onClick={closeHandler}>
													No
												</Button>
											</Modal.Footer>
										</Modal>
									</div>
									<Spacer />
									<div className="navbar-nav mb-lg-0 align-items-center">
										<Button.Group color="secondary" flat auto>
											<Button href="#edit" onClick={handleTab1}>Edit Profile</Button>
											<Button href="#password" onClick={handleTab2}>Change Password</Button>
											<Button href="#listing" onClick={handleTab3}>Manage Listing</Button>
											<Button href="#comments" onClick={handleTab4}>View Comments</Button>
										</Button.Group>
									</div>

									<div className="outlet">
										<TabContent id="tab1" activeTab={activeTab}>
											<ProfileTab />
										</TabContent>
										<TabContent id="tab2" activeTab={activeTab}>
											<PasswordTab />
										</TabContent>
										<TabContent id="tab3" activeTab={activeTab}>
											<ListingTab />
										</TabContent>
										<TabContent id="tab4" activeTab={activeTab}>
											<CommentsTab />
										</TabContent>
									</div>

								</Card>
							</div>
						</div>
					</div>
				</div>
			</div >
		</div >
	)
}


export default Profile;