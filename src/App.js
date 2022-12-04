import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import  { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import Comment from './components/Comment/Comment';
import { db } from './config/firebase';

function App() {
  const [comments, setComments] = useState()
  const [childComments, setChildComments] = useState()
  useEffect(() => {
    const commentsCollection = query(collection(db, 'comments'));
    onSnapshot(commentsCollection, (snapshot) => {
      let comments = snapshot.docs.map(comments=>{
          return{
            id: comments.id,
            ...comments.data()
          }
      })
      setComments(comments.filter(comment=>comment.child===false))
      setChildComments(comments.filter(comment=>comment.child===true))
    })
   
  },[])

  
  return (
    <Flex h={'100vh'} bgColor='blackAlpha.800' justifyContent='center' alignItems='center'>
    <Box padding='5rem 0' color='white' h='90%' w='90%' border='2px solid grey' display='flex' justifyContent='center'  borderRadius='10px' overflow='auto'>
      <Flex flexDir='column' h='max-content' w='90%'  alignItems='center' overflow='auto'>
        {comments?.map( comment => <Comment upvote={comment.upvote} children={childComments} id={comment.id} date={comment.date} comment={comment.comment} author={comment.author}></Comment>)}
     
      </Flex>
    </Box>
    </Flex>
  );
}

export default App;
