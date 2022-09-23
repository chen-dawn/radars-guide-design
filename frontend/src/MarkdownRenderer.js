import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Container from "@mui/material/Container";
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';



export default function MarkdownRenderer(props) {
    const [post, setPost] = useState('');

    useEffect(() => {
        import(`../markdown/${props.filename}`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setPost(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });

    return (
      <Container maxWidth="md" id="app">
        <ReactMarkdown
          children={post}
          components={{
            img: ({node, ...props}) => <img style={{maxWidth: '100%'}} {...props} />
          }}
        />
      </Container>
    );
}