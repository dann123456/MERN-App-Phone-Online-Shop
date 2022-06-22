import React, { useEffect, useState } from 'react';
import { NextUIProvider, Text, Row, Grid, Card, Spacer, Loading } from '@nextui-org/react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Dropdown, DropdownButton, Form, Col } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

const Search = () => {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = React.useState(25);
    const [filter, setFilter] = useState([]);
    const [brandp, setBrandP] = useState([]);
    const [pricep, setPriceP] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getQuery() {
            setLoading(true);
            var sp = searchParams.get("q").toString();
            setQuery(sp);
            const response = await fetch(`http://localhost:8080/api/phones/search?q=${sp}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const term = await response.json();
            setData(term);
            setFilter(term);
            setLoading(false);
            setBrandP("All");
            setPriceP(1000);
        }

        getQuery();
        return;
    }, [query.length]);

    // useEffect(() => {
    //     fetch("/products").then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         }
    //     }).then(jsonRes => setPhones(jsonRes));
    // })

    const filterPhone = (b, p) => {
        const updatedList = data.filter((x) => x.brand === b).filter((x) => Math.ceil(x.price) <= p);
        if (b === "All") {
            setFilter(data.filter((x) => Math.ceil(x.price) <= p));
        } else {
            setFilter(updatedList);
        }
        setBrandP(b);
        setPriceP(p);
    }

    return (

        loading ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="px-4 pt-5 my-5 text-center">
                                <NextUIProvider><Text h1 weight="bold">Search Results ({filter.length})</Text></NextUIProvider>
                                <Spacer y={3} />

                                <div className="d-flex justify-content-center" >
                                    <div>
                                        <Text h6>Brand</Text>
                                        <Spacer y={0.5} />
                                        <DropdownButton id="dropdown-basic-button" size="md" title={brandp}>
                                            <Dropdown.Item onClick={() => filterPhone("All", pricep)}>All</Dropdown.Item>
                                            <Dropdown.Item onClick={() => filterPhone("Apple", pricep)}>Apple</Dropdown.Item>
                                            <Dropdown.Item onClick={() => filterPhone("Huawei", pricep)}>Huawei</Dropdown.Item>
                                            <Dropdown.Item onClick={() => filterPhone("LG", pricep)}>LG</Dropdown.Item>
                                            <Dropdown.Item onClick={() => filterPhone("Nokia", pricep)}>Nokia</Dropdown.Item>
                                            <Dropdown.Item onClick={() => filterPhone("Samsung", pricep)}>Samsung</Dropdown.Item>
                                            <Dropdown.Item onClick={() => filterPhone("Sony", pricep)}>Sony</Dropdown.Item>
                                        </DropdownButton>
                                    </div>


                                    <Spacer />

                                    <div>
                                        <Text h6>Maximum Price</Text>
                                        <Spacer y={0.5} />
                                        <Form>
                                            <Form.Group as={Row}>
                                                <Col xs="9">
                                                    <RangeSlider
                                                        value={pricep}
                                                        onChange={e => filterPhone(brandp, e.target.value)}
                                                        min={1}
                                                        max={1000}
                                                    />
                                                </Col>
                                                <Col xs="3">
                                                    <Form.Control value={pricep} />
                                                </Col>
                                            </Form.Group>
                                        </Form>



                                    </div>
                                </div>

                                <Spacer y={3} />
                                <Row justify="space-between" display="flex" align="center">
                                    <Grid.Container gap={2} justify="flex-start">
                                        {filter.map((phone, index) => (
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
                                </Row>

                            </div>
                        </div>
                    </div>
                </div>




            </div>
    );
}

export default Search;
