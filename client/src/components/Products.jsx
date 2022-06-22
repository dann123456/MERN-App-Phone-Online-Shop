import React, { useEffect, useState } from 'react';
import { NextUIProvider, Text, Row, Grid, Card, Spacer, Loading } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

const Products = () => {

    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(false);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getPhones() {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/phones/products`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const phones = await response.json();
            setPhones(phones);
            setLoading(false);
        }

        getPhones();

        return;
    }, [phones.length]);

    return (

        loading ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :


            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">

                            <div className="px-4 pt-5 my-5 text-center">
                                <NextUIProvider><Text h1 weight="bold">All Mobile Phones</Text></NextUIProvider>
                                <Spacer></Spacer>
                                <Row justify="space-between" display="flex" align="center">
                                    <Grid.Container gap={2} justify="flex-start">
                                        {phones.map((phone, index) => (
                                            <Grid xs={6} sm={4} key={index}>
                                                <Card hoverable clickable href={`/products/${phone._id}`}>
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
                                </Row>

                            </div>
                        </div>
                    </div>
                </div>




            </div>
    );
}

export default Products;
