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
    <Box color='white' h='90%' w='50%' border='2px solid grey' display='flex' justifyContent='center' alignItems='center' borderRadius='10px' >
      <Flex flexDir='column' h='80%' w='80%'  alignItems='center' overflow='auto'>
        {comments?.map( comment => <Comment children={childComments} id={comment.id} date={comment.date} comment={comment.comment} author={comment.author}></Comment>)}
     
      </Flex>
    </Box>
    </Flex>
  );
}

export default App;
