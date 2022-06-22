import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NextUIProvider, Text, Grid, Row, Card, Spacer, Loading } from '@nextui-org/react';

const Home = () => {

    const [sos, setSOS] = useState([]);
    const [loadingBS, setLoadingBS] = useState(false);
    const [loadingSOS, setLoadingSOS] = useState(false);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getSOS() {
            setLoadingSOS(true);
            const response = await fetch(`http://localhost:8080/api/phones/soldoutsoon`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const soldout = await response.json();
            setSOS(soldout);
            setLoadingSOS(false);
        }

        getSOS();

        return;
    }, [sos.length]);

    const [bs, setBS] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getBS() {
            setLoadingBS(true);
            const response = await fetch(`http://localhost:8080/api/phones/bestsellers`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const bestsellers = await response.json();
            setBS(bestsellers);
            setLoadingBS(false);
        }

        getBS();

        return;
    }, [bs.length]);


    return (
        <div>
            <div className="hero">
                <div className="px-4 pt-5 my-5 text-center border-bottom">
                    <NextUIProvider><Text h1 weight="bold">Welcome to SellPhone</Text></NextUIProvider>
                    <Spacer></Spacer>
                    <div className="col-lg-6 mx-auto">
                        <Text h4>Shop the latest mobile phones across top brands from a range of Aussie sellers</Text>
                    </div>
                    <div className="container px-5">
                        <img src="/assets/iPhone-13-PNG-HD-Isolated.png" className="d-block mx-lg-auto img-fluid" alt="Example image" width="700" height="100%" loading="lazy"></img>
                    </div>
                </div>
            </div >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Best Sellers</h1>
                        {loadingBS ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :
                            <Row justify="space-between" display="flex" align="center">
                                <Grid.Container gap={2} justify="flex-start">
                                    {bs.map((phone_bs, index) => (
                                        <Grid xs={6} sm={4} key={index}>
                                            <Card hoverable clickable cover={<a href={`/products/${phone_bs._id}`} />}>
                                                <Card.Body css={{ p: 0 }}>
                                                    <NavLink to={`/product/${phone_bs._id}`}>
                                                        <Card.Image
                                                            objectFit="cover"
                                                            src={'/assets/phone_default_images/' + phone_bs.brand + '.jpeg'}
                                                            width="100%"
                                                            height={400}
                                                            alt={phone_bs.title}
                                                        />
                                                    </NavLink>
                                                </Card.Body>
                                                <Card.Footer justify="flex-start">
                                                    <Row wrap="wrap" justify="space-between">
                                                        <Text b>{phone_bs.title}</Text>
                                                        <Text css={{ color: "$accents6", fontWeight: "$semibold" }}>
                                                            ${phone_bs.price}
                                                        </Text>
                                                    </Row>
                                                </Card.Footer>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid.Container>
                            </Row>}

                    </div>
                </div>
            </div>
            <Spacer y={3} />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Sold Out Soon</h1>
                        {loadingSOS ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :
                            <Row justify="space-between" display="flex" align="center">
                                <Grid.Container gap={2} justify="flex-start">
                                    {sos.map((phone, index) => (
                                        <Grid xs={6} sm={4} key={index}>
                                            <Card hoverable clickable cover={<a href={`/products/${phone._id}`} />}>
                                                <Card.Body css={{ p: 0 }}>
                                                    <NavLink to={`/product/${phone._id}`}>
                                                        <Card.Image
                                                            objectFit="cover"
                                                            src={'/assets/phone_default_images/' + phone.brand + '.jpeg'}
                                                            width="100%"
                                                            height={400}
                                                            alt={phone.title}
                                                        />
                                                    </NavLink>
                                                </Card.Body>
                                                <Card.Footer justify="flex-start">
                                                    <Row wrap="wrap" justify="space-between">
                                                        <Text b>{phone.title}</Text>
                                                        <Text css={{ color: "$accents6", fontWeight: "$semibold" }}>
                                                            ${phone.price}
                                                        </Text>
                                                    </Row>
                                                </Card.Footer>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid.Container>
                            </Row>}


                    </div>
                </div>
            </div>
        </div>


    );
}

export default Home;