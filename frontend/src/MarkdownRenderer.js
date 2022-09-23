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
            // code({node, inline, className, children, ...props}) {
            //   const match = /language-(\w+)/.exec(className || '')
            //   return !inline && match ? (
            //     <SyntaxHighlighter
            //       children={String(children).replace(/\n$/, '')}
            //       style={dark}
            //       language={match[1]}
            //       PreTag="div"
            //       {...props}
            //     />
            //   ) : (
            //     <code className={className} {...props}>
            //       {children}
            //     </code>
            //   )
            // }
          }}
        />
      </Container>
    );
}