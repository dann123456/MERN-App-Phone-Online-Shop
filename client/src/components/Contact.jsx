import React from 'react';
import { NextUIProvider, Text, Spacer } from '@nextui-org/react';

const Contact = () => {
    return (
        <div>
            <div className="hero">
                <div className="px-4 pt-5 my-5 text-center">
                    <NextUIProvider><Text h1 weight="bold">Contact</Text></NextUIProvider>
                    <Spacer></Spacer>
                    <div className="col-lg-6 mx-auto">
                        <Text h4>Feel free to reach us via the contact methods below. </Text>
                        <Spacer />
                        <Text h4>We will aim to respond to your enquiry within 24 business hours.</Text>

                        <Spacer />
                        <Text h5>Phone: 1300 005 347</Text>
                        <Text h5>Email: enquiry@cellphone.com</Text>
                    </div>

                </div>
            </div >


        </div>


    );
}

export default Contact;