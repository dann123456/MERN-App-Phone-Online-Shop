import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Text, Spacer, Loading, Table } from '@nextui-org/react';
import jwt_decode from "jwt-decode";

const CommentsTab = () => {

    const [reviews, setReview] = useState([]);
    const [reviewer, setReviewer] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showMoreR, setShowMoreR] = useState(false);
    const [showMoreT, setShowMoreT] = useState(false);

    const token = localStorage.getItem("token");
    var userId;

    try {
        const decoded = jwt_decode(token);
        userId = decoded;
    } catch (exception) {
        console.log(exception);
    }


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/phones/comments/${userId._id}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const comments = await response.json();
            setReview(comments)
            setLoading(false);
        }

        fetchData();

        return;
    }, [userId._id, navigate]);


    return (

        loading ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :
            <div>
                <div className="container">
                    <div className="row d-flex">
                        <Spacer y={2} />
                        <h2 className="text-center">My Comments</h2>
                        <Spacer y={1} />

                        <Table
                            shadow={false}
                            color="secondary"
                            aria-label="Reviews"
                            css={{
                                height: "auto",
                                width: "100%",
                                tableLayout: "fixed",
                            }}
                        >
                            <Table.Header>
                                <Table.Column width="85%" >Comment</Table.Column>
                                <Table.Column width="15%" >Rating</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {reviews.map((review, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>

                                            {showMoreR ? review.comment : `${review.comment.substring(0, 200)}`}

                                            {review.comment.length > 200 ? <Button bordered color="secondary" auto size="xs" light onClick={() => setShowMoreR(!showMoreR)}>
                                                {showMoreR ? "Show less" : "Show more"}</Button> : null}
                                        </Text></Table.Cell>
                                        <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>{review.rating} / 5</Text></Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>


                        </Table>
                        <Spacer />

                    </div>
                    <div className="row d-flex align-items-center">
                        <Spacer y={1.5} />


                    </div>
                </div >
            </div>
    );
};


export default CommentsTab;