import React from 'react';
import { NextUIProvider, Text, Grid, Card, Spacer, Col } from '@nextui-org/react';

const Card1 = () => (
    <Card cover>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                    Xiaomi 12 Pro
                </Text>
                <Text h4 color="white">

                </Text>
            </Col>
        </Card.Header>
        <Card.Image
            src="/assets/about_1.jpeg"
            height={500}
            width="100%"
            alt="Card image background"
        />
    </Card>
);

const Card2 = () => (
    <Card width="100%" cover>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                    Oneplus 10 Pro
                </Text>
                <Text h4 color="white">

                </Text>
            </Col>
        </Card.Header>
        <Card.Image
            src="/assets/about_2.webp"
            height={500}
            width="100%"
            alt="Card image background"
        />
    </Card>
);

const Card3 = () => (
    <Card cover css={{ bg: "$black", w: "100%" }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                    Huawei P50
                </Text>
                <Text h4 color="white">

                </Text>
            </Col>
        </Card.Header>
        <Card.Image
            src="/assets/about_3.webp"
            height={500}
            width="100%"
            alt="Card image background"
        />
    </Card>
);

const About = () => {
    return (
        <div>
            <div className="hero">
                <div className="px-4 pt-5 my-5 text-center">
                    <NextUIProvider><Text h1 weight="bold">About SellPhone</Text></NextUIProvider>
                    <Spacer></Spacer>
                    <div className="col-lg-6 mx-auto">
                        <Text h4>SellPhone was founded in 2022 by a group of students at the University of Sydney. </Text>
                        <Spacer />
                        <Text h4>We are an Australian online marketplace for mobile phones.</Text>
                        <Spacer />
                        <Text h4>Here, you will find a variety of mobile phones from brands including Apple, Samsung, Huawei, LG and more. </Text>

                    </div>


                </div >

            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12"></div>
                    <Grid.Container gap={2} justify="center">
                        <Grid xs={12} sm={4}>
                            <Card1 />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Card2 />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Card3 />
                        </Grid>
                    </Grid.Container>
                </div>
            </div>

        </div>


    );
}

export default About;